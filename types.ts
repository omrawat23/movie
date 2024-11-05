export interface Movie {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    media_type:string;
    release_date: string;
    vote_average: number;
  }
  
  export interface SearchResponse {
    results: Movie[];
    total_pages: number;
    total_results: number;
  }