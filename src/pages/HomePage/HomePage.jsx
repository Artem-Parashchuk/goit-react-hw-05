import { useEffect, useState } from "react";
import { fetchTrendingTodayMovies } from "../../services/api";
import { Link } from "react-router-dom";

import s from "./HomePage.module.css";
import { InfinitySpin } from "react-loader-spinner";

const HomePage = () => {
  const [films, setFilms] = useState([]);
  useEffect(() => {
    const getFilms = async () => {
      const res = await fetchTrendingTodayMovies();
      setFilms(res);
    };
    getFilms();
  }, []);

  if (!films) {
    return (<div className={s.loader}>
      <InfinitySpin
        visible={true}
        width="200"
        color="rgb(0, 0, 118)"
        ariaLabel="infinity-spin-loading"
      />
    </div>
    );
  }

  return (
  
    <div className={s.home}>
      <h1 className={s.title}>Trending today</h1>
      <ul className={s.list}>
        {films.map((film) => {
          return (
            <li
              key={film.id}
              className={s.item}
            >
              <Link to={`movies/${film.id.toString()}`}>
                <div className={s.film_card}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${film.poster_path}`}
                    alt={`${film.title}`}
                  />
                  <h3>{film.title}</h3>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default HomePage;
