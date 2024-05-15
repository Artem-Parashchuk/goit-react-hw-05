import { Link, useLocation } from "react-router-dom";
import s from "./MovieList.module.css";

const MovieList = ({ movie }) => {
  const location = useLocation();
  return (
    <li className={s.item}>
      <div className={s.film_card}>
        <Link
          to={`${movie.id.toString()}`}
          state={location}
        >
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={`${movie.title}`}
          />
        </Link>
        <h3>{movie.title}</h3>
      </div>
    </li>
  );
};

export default MovieList;
