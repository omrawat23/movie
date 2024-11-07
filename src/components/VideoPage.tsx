import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Play, User2, Image as ImageIcon } from 'lucide-react';

interface Movie {
  id: number;
  title: string;
  release_date: string;
  runtime: number;
  overview: string;
  backdrop_path: string;
}

interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

interface SimilarMovie {
  id: number;
  title: string;
  poster_path: string | null;
}

interface ImageData {
  backdrops: { file_path: string }[];
  posters: { file_path: string }[];
}

const VideoPage = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [cast, setCast] = useState<CastMember[]>([]);
  const [similar, setSimilar] = useState<SimilarMovie[]>([]);
  const [images, setImages] = useState<ImageData>({ backdrops: [], posters: [] });
  const [loading, setLoading] = useState(true);
  const [error, ] = useState<string | null>(null);
  const [showVideo, setShowVideo] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZDg2MjI4NzlhZmUxOGY5OTc2NDJmOWYzNzc3N2FjMiIsIm5iZiI6MTczMDY3MjA3MS4zNjUwMzcsInN1YiI6IjY3MjdmNDA0NTU1ZTNlZmM4OWMzMmY5NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7ST0b4zGR7UynUdSV5ANEKDjpzrxh9nitsPrz8cqx6w'
          }
        };

        const [movieRes, castRes, similarRes, imagesRes] = await Promise.all([
          axios.get(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, options),
          axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`, options),
          axios.get(`https://api.themoviedb.org/3/movie/${movieId}/similar?language=en-US`, options),
          axios.get(`https://api.themoviedb.org/3/movie/${movieId}/images`, options)
        ]);

        setMovie(movieRes.data);
        setCast(castRes.data.cast.slice(0, 7));
        setSimilar(similarRes.data.results.slice(0, 6));
        setImages({
          backdrops: imagesRes.data.backdrops.slice(0, 8),
          posters: imagesRes.data.posters.slice(0, 4)
        });
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    fetchMovieData();
    // Reset states when movieId changes
    setShowVideo(false);
    setSelectedImage(null);
  }, [movieId]);


  const handleSimilarMovieClick = (similarMovieId: number) => {
    navigate(`/videopage/${similarMovieId}`);
window.scrollTo(0, 0);
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-[#13141A] to-[#1a1c25]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#3d59ad]"></div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#13141A] to-[#1a1c25]">
      <div className="bg-red-900/20 text-red-100 p-4 rounded-lg">
        Error: {error}
      </div>
    </div>
  );

  if (!movie) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#13141A] to-[#1a1c25]">
      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={`https://image.tmdb.org/t/p/original${selectedImage}`}
            alt="Gallery"
            className="max-w-full max-h-[90vh] object-contain"
          />
        </div>
      )}

      {/* Hero Section */}
      <div className="relative h-screen">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#13141A] via-[#13141A]/70 to-transparent">
            <div className="absolute inset-0 bg-gradient-to-t from-[#13141A] via-[#13141A]/30 to-transparent" />
          </div>
        </div>

        {/* Content */}
        <div className="relative h-full max-w-7xl mx-auto px-6 py-12 flex flex-col justify-center">
          {showVideo ? (
            <div  onClick={(e) => e.stopPropagation()} className="aspect-video w-full max-w-4xl mx-auto bg-black rounded-xl overflow-hidden shadow-2xl">
             <iframe
  src={`https://vidsrc.cc/v2/embed/movie/${movieId}`}
  className="aspect-video w-full h-auto rounded-lg relative"
  width="1280"
  height="720"
  title="Video player"
  frameBorder="0"
  allowFullScreen
  sandbox="allow-same-origin allow-scripts" // Limits the iframe's capabilities
></iframe>
{/* <iframe
   src={showVideo ? `https://embed.su/embed/movie/${movieId}` : "about:blank"}
  className="aspect-video w-full h-auto rounded-lg relative"
  width="1280"
  height="720"
  title="Video player"
  frameBorder="0"
  allowFullScreen
  allowTransparency
  allow="autoplay"
></iframe> */}


            </div>
          ) : (
            <>
              <h1 className="text-6xl font-bold text-white mb-4">{movie.title}</h1>
              <div className="flex items-center gap-4 mb-8">
                <span className="text-[#3d59ad] font-medium">{movie.release_date.split('-')[0]}</span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-400">{movie.runtime} min</span>
                <span className="text-gray-400">•</span>
                <div className="flex items-center gap-2">
                  <span className="bg-gradient-to-r from-[#3d59ad] to-[#4c6ac2] text-white px-2 py-0.5 rounded text-sm">HD</span>
                </div>
              </div>

              <p className="text-gray-300 max-w-2xl mb-8">{movie.overview}</p>

              <button
                onClick={() => setShowVideo(true)}
                className="flex items-center gap-2 bg-gradient-to-r from-[#3d59ad] to-[#4c6ac2] hover:from-[#4c6ac2] hover:to-[#5a78d0] text-white px-8 py-3 rounded-full w-fit transition-all duration-300"
              >
                <Play className="h-5 w-5" />
                <span>Watch Now</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Cast Section */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-white mb-6">Cast</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {cast.map((actor) => (
            <div key={actor.id} className="space-y-2">
              {actor.profile_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                  alt={actor.name}
                  className="w-full h-40 object-cover rounded-lg"
                />
              ) : (
                <div className="w-full h-40 bg-[#13141A] rounded-lg flex items-center justify-center">
                  <User2 className="h-8 w-8 text-gray-600" />
                </div>
              )}
              <p className="text-white text-sm font-medium">{actor.name}</p>
              <p className="text-gray-400 text-sm">{actor.character}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Gallery Section */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-white mb-6">Gallery</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.backdrops.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(image.file_path)}
              className="relative group aspect-video bg-[#13141A] rounded-lg overflow-hidden"
            >
              <img
                src={`https://image.tmdb.org/t/p/w780${image.file_path}`}
                alt={`Scene ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                <ImageIcon className="text-white/0 group-hover:text-white/100 transition-colors h-8 w-8" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Similar Movies */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-white mb-6">Similar movies</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {similar.map((movie) => (
            <button
              key={movie.id}
              onClick={() => handleSimilarMovieClick(movie.id)}
              className="space-y-2 text-left group"
            >
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                  <Play className="text-white/0 group-hover:text-white/100 transition-colors h-8 w-8" />
                </div>
              </div>
              <p className="text-white text-sm font-medium truncate">{movie.title}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoPage;