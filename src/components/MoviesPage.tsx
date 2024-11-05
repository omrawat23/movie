import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import MovieCard from './MovieCard';
import { Movie } from 'types';

const MoviesPage: React.FC = () => {
    const [movieData, setMovieData] = useState<Movie[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [page, setPage] = useState<number>(1); // Track the current page
    const navigate = useNavigate();
    const location = useLocation();

    // Fetch data based on the current page
    const fetchData = async (pageNum: number) => {
        const options = {
            method: 'GET',
            url: `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${pageNum}`,
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZDg2MjI4NzlhZmUxOGY5OTc2NDJmOWYzNzc3N2FjMiIsIm5iZiI6MTczMDY3MjA3MS4zNjUwMzcsInN1YiI6IjY3MjdmNDA0NTU1ZTNlZmM4OWMzMmY5NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7ST0b4zGR7UynUdSV5ANEKDjpzrxh9nitsPrz8cqx6w'
            }
        };

        try {
            setLoading(true);
            const response = await axios.request(options);
            const data = response.data;
            if (data.results) {
                setMovieData(data.results);
            } else {
                console.error("Error fetching movies:", data.status_message || "No data found");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    // Load page number from URL when component mounts
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const pageParam = parseInt(params.get('page') || '1', 10);
        setPage(pageParam);
        fetchData(pageParam);
    }, [location.search]);

    // Navigate to a specific page and update the URL
    const goToPage = (pageNum: number) => {
        setPage(pageNum);
        navigate(`?page=${pageNum}`);
    };

    const handleCardClick = (movieId: number) => {
        navigate(`/videopage/${movieId}`);
    };

    return (
        <div className="flex flex-wrap gap-4 p-4">
            {loading ? (
                <p>Loading...</p>
            ) : (
                movieData.map((movie) => (
                    <MovieCard
                        key={movie.id}
                        title={movie.title}
                        Year={movie.release_date?.split('-')[0]}
                        Poster={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : ""}
                        Type={movie.media_type || "movie"}
                        imdbID={movie.id}
                        onClick={() => handleCardClick(movie.id)}
                    />
                ))
            )}
            <div className="flex justify-center mt-4 w-full">
                <button
                    onClick={() => goToPage(page - 1)}
                    disabled={page === 1}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded mr-2"
                >
                    Previous
                </button>
                <button
                    onClick={() => goToPage(page + 1)}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default MoviesPage;
