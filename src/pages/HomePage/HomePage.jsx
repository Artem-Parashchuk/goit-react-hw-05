import { useEffect, useState } from "react";
import { fetchTrendingTodayMovies } from "../../services/api";

import s from "./HomePage.module.css";
import { InfinitySpin } from "react-loader-spinner";
import MovieList from "../../components/MovieList/MovieList";

const HomePage = () => {
  const [films, setFilms] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getFilms = async () => {
      try {
        setError(false);
        setLoading(true)
        const res = await fetchTrendingTodayMovies();
        setFilms(res);
      } catch (error) {
        console.log(error.message);
        setError(true);
      }finally{
        setLoading(false);
      }
    };
    getFilms();
  }, []);

  if (loading) {
    return (
      <div className={s.loader}>
        <InfinitySpin
          visible={true}
          width="200"
          color="rgb(0, 0, 118)"
          ariaLabel="infinity-spin-loading"
        />
      </div>
    );
  }

  if (error) {
    return <h2 className={s.error}>Щось пішло не так, ми працюємо над цим</h2>;
  }

  return (
    <div className={s.home}>
      <h1 className={s.title}>Trending today</h1>
      <MovieList films={films}/>
    </div>
  );
};

export default HomePage;
