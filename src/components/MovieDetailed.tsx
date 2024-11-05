// import React from 'react'
// import { Card } from '@/components/ui/card'
// import { Badge } from '@/components/ui/badge'
// import { Star } from 'lucide-react'

// interface Movie {
//   Title: string
//   Year: string
//   Runtime: string
//   Genre: string
//   Plot: string
//   Poster: string
//   imdbRating: string
//   imdbID: string
// }

// const MovieDetailed: React.FC<Movie> = ({ Title, Year, Runtime, Genre, Plot, Poster, imdbRating, imdbID }) => {
//   return (
//     <Card className="max-w-sm overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl">
//       <div className="relative">
//         <img className="h-64 w-full object-cover" src={Poster} alt={Title} />
//         <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
//           <h2 className="text-xl font-bold text-white">{Title}</h2>
//           <p className="text-sm text-gray-300">{Year}</p>
//         </div>
//       </div>
//       <div className="p-4">
//         <p className="mb-4 text-sm text-gray-600 line-clamp-3">{Plot}</p>
//         <div className="mb-4 flex flex-wrap gap-2">
//           {Genre.split(', ').map((genre) => (
//             <Badge key={genre} variant="secondary">
//               {genre}
//             </Badge>
//           ))}
//         </div>
//         <div className="flex items-center justify-between text-sm text-gray-600">
//           <span>{Runtime}</span>
//           <div className="flex items-center gap-1">
//             <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
//             <span>{imdbRating}</span>
//           </div>
//         </div>
//       </div>
//     </Card>
//   )
// }

// export default MovieDetailed