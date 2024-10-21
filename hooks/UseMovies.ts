import axios from "axios";
import { useQuery } from "@tanstack/react-query";
export interface MovieDataType{
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    backdrop_path: string;
    release_date: string;
}

const getMovies = async():Promise<MovieDataType[]> => {   
    const api_key=process.env.EXPO_PUBLIC_API_KEY;
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${api_key}`
        }
      };
      
      try{
        const response =await axios.get(`https://api.themoviedb.org/3/trending/movie/day?language=en-US`, options);
        console.log(response.data.results);
        return response.data.results;
      } catch (error) {
        console.error('Error fetching movies:', error);
        throw error;
      }
 
};

export const useMovies = () => {
    
return useQuery<MovieDataType[],Error>({
      queryKey: ['movies'],
      queryFn: getMovies,
      staleTime: 5 * 60 * 1000,  
      refetchOnWindowFocus: false,
      retry: 3,
    });
}

