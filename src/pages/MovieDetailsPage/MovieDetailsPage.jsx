import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import s from "./MovieDetailsPage.module.css";
import { Suspense, useEffect, useRef, useState } from "react";
import { fetchMoviesById } from "../../services/api";
import { InfinitySpin } from "react-loader-spinner";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [details, setDetails] = useState(null);
  const location = useLocation();
  const goBack = useRef(location.state ?? "/movies");

  useEffect(() => {
    const getDetails = async () => {
      const res = await fetchMoviesById(movieId);
      setDetails(res);
    };
    getDetails();
  }, [movieId]);

  if (!details) {
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

  return (
    <div className={s.wrapper}>
      <Link
        to={goBack.current}
        className={s.go_back}
      >
        Go back
      </Link>
      <div className={s.movie}>
        <div className={s.wrapper_img}>
          <img
            src={`https://image.tmdb.org/t/p/w500/${details.poster_path}`}
            alt={details.title}
          />
        </div>
        <div className={s.description}>
          <h2 className={s.title}>{details.title}</h2>
          <p className={s.ratting}>Movie rating: {details.vote_average}</p>
          <h3>Overview</h3>
          <p>{details.overview}</p>
          <h4>Genres</h4>
          <p className={s.genres_list}>
            {details.genres.map((genre) => {
              return <span key={genre.id}>{genre.name}</span>;
            })}
          </p>
        </div>
      </div>
      <div className={s.details}>
        <h3>Additional information</h3>
        <ul className={s.details_list}>
          <li>
            <Link
              className={s.details_link}
              to="cast"
            >
              Cast
            </Link>
          </li>
          <li>
            <Link
              className={s.details_link}
              to="reviews"
            >
              Reviews
            </Link>
          </li>
        </ul>
      </div>
      <Suspense
        fallback={<span className="loading loading-spinner text-error"></span>}
      >
        <Outlet />
      </Suspense>
    </div>
  );
};

export default MovieDetailsPage;
