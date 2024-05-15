import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieReviews } from "../../services/api";
import { InfinitySpin } from "react-loader-spinner";
import s from "./MovieReviews.module.css";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const getReviews = async () => {
      try {
        setError(false);
        setLoading(true);
        const res = await fetchMovieReviews(movieId);
        setReviews(res);
      } catch (error) {
        console.log(error.message);
        setError(true);
      }finally {
        setLoading(false);
      }
    };
    getReviews();
  }, [movieId]);

  if (loading) {
    return (
      <InfinitySpin
        visible={true}
        width="200"
        color="rgb(0, 0, 118)"
        ariaLabel="infinity-spin-loading"
      />
    );
  }

  if (error) {
    return <h2 className={s.error}>Щось пішло не так, ми працюємо над цим</h2>;
  }

  return (
    <div>
      {!reviews.length && <h2>Коментарів ще немає</h2>}
      {reviews.map((review) => {
        return (
          <div
            key={review.id}
            className={s.review}
          >
            <p className={s.text}>{review.content}</p>
            <p className={s.author}>{review.author}</p>
          </div>
        );
      })}
    </div>
  );
};

export default MovieReviews;
