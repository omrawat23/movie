
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export interface Movie {
  title: string
  Year: string
  imdbID: number
  Type: string
  Poster: string
  onClick: () => void;
}

export default function MovieCard({ title, Year, imdbID, Type, Poster, onClick  }: Movie) {
  return (
    <Card onClick={onClick} className="w-64 h-96 overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl">
      <div className="relative h-3/4">
        <img 
          className="w-full h-full object-cover" 
          src={Poster} 
          alt={title}
          onError={(e) => {
            e.currentTarget.src = '/placeholder.svg?height=192&width=256'
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
          <h2 className="text-lg font-bold text-white line-clamp-2">{title}</h2>
          <p className="text-sm text-gray-300">{Year}</p>
        </div>
      </div>
      <div className="p-4 h-1/4 flex flex-col justify-between">
        <Badge variant="secondary" className="w-fit">{Type}</Badge>
        <span className="text-xs text-muted-foreground truncate">ID: {imdbID}</span>
      </div>
    </Card>
  )
}