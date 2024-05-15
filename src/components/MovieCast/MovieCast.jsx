import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieActors } from "../../services/api";
import { InfinitySpin } from "react-loader-spinner";
import s from './MovieCast.module.css'

const MovieCast = () => {
  const { movieId } = useParams();
  const [actors, setActors] = useState([]);
  useEffect(() => {
    const getActors = async () => {
      const res = await fetchMovieActors(movieId);
      setActors(res);
    };
    getActors();
  }, [movieId]);

  if (!actors) {
    return (
      <InfinitySpin
        visible={true}
        width="200"
        color="rgb(0, 0, 118)"
        ariaLabel="infinity-spin-loading"
      />
    );
  }

  return (
    <div className={s.container}>
      <ul className={s.actors_list}>
        {actors.map(actor => {
          return (
            <li key={actor.id} className={s.actor_item}>
              <div className={s.container_img}>
                <img
                  src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
                  alt={`${actor.name}`}
                />
              </div>
              <p className={s.actor_name}>{actor.name}</p>
              <p className={s.popularity}>Popularity actor: {Math.round(actor.popularity)}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MovieCast;
