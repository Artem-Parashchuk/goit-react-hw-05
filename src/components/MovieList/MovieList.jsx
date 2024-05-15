import { Link, useLocation } from "react-router-dom";
import s from "./MovieList.module.css";

const MovieList = ({ films }) => {
  const location = useLocation();
  return (
    <ul className={s.list}>
      {films.map((film) => {
        return (
          <li
            key={film.id}
            className={s.item}
          >
            <Link
              to={`/movies/${film.id}`}
              state={location}
            >
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
  );
};

export default MovieList;
