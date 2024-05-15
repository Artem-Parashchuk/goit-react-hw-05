import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieActors } from "../../services/api";
import { InfinitySpin } from "react-loader-spinner";
import s from "./MovieCast.module.css";

const MovieCast = () => {
  const { movieId } = useParams();
  const [actors, setActors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getActors = async () => {
      try {
        setError(false);
        setLoading(true);
        const res = await fetchMovieActors(movieId);
        setActors(res);
      } catch (error) {
        console.log(error.message);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    getActors();
  }, [movieId]);

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
    <div className={s.container}>
      <ul className={s.actors_list}>
        {actors.map((actor) => (
          <li key={actor.id} className={s.actor_item}>
            <div className={s.container_img}>
              <img
                src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
                alt={`${actor.name}`}
              />
            </div>
            <p className={s.actor_name}>{actor.name}</p>
            <p className={s.popularity}>
              Popularity actor: {Math.round(actor.popularity)}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;