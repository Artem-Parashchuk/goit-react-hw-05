import axios from "axios";

const options = {
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4M2M3NWI3NzA5NGE5NDgwNjZhZmYyNzAyYjI1Y2VhYiIsInN1YiI6IjY2NDIyMmVhMmE1NzRiMzMyMDNhMTJiOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oqK7Q6nfNnibSCuPz572etWCCtVxiuz_Km9HuYe3Qy0'
    }
};
export const URL = 'https://api.themoviedb.org/3'

export const fetchTrendingTodayMovies = async () => {
    try {
        const { data } = await axios.get(`${URL}/trending/movie/day`, options)
        return data.results
    } catch (error) {
        console.log(error.message)
    }
}

export const fetchMoviesById = async (id) => {
    try {
        const { data } = await axios.get(`${URL}/movie/${id}`, options)
        return data
    } catch (error) {
        console.log(error.message)
    }
}

export const fetchMovieActors = async (id) => {
    try {
        const { data } = await axios.get(`${URL}/movie/${id}/credits`, options)
        return data.cast
    } catch (error) {
        console.log(error.message)
    }
}

export const fetchMovieReviews = async (id) => {
    try{
        const {data} = await axios.get(`${URL}/movie/${id}/reviews`, options)
        return data.results
    }catch(error) {
        console.log(error.message)
    }
}

export const searchMovie = async (query) => {
    try {
        const response = await axios.get(`${URL}/search/movie?query=${query}`, options);
        return response.data.results;
    } catch (error) {
        console.log(error.message);
        throw new Error("Помилка при отриманні результатів пошуку");
    }
};