import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { searchMovie } from "../../services/api";

import { InfinitySpin } from "react-loader-spinner";
import s from "./MoviesPage.module.css";
import MovieList from "../../components/MovieList/MovieList";
import { useSearchParams } from "react-router-dom";

const MoviesPage = () => {
  const [movies, setMovie] = useState(null);
  const [valueFilm, setValueFilm] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);

  const query = searchParams.get("query") || "";

  useEffect(() => {
    const getSearchMovie = async () => {
      try {
        setLoading(true);
        const res = await searchMovie(query);
        setMovie(res);
      } catch (error) {
        console.error(error.message);
        toast.error("Помилка під час отримання даних");
      } finally {
        setLoading(false);
      }
    };
    getSearchMovie();
  }, [query]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (valueFilm.trim() === "") {
      toast.error("Поле для пошуку має бути заповненим");
      return;
    }
    setSearchParams({ query: valueFilm });
  };

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

  return (
    <>
      <form
        className={s.form}
        onSubmit={handleSubmit}
      >
        <input
          value={valueFilm}
          onChange={(e) => setValueFilm(e.target.value)}
          className={s.input}
          type="text"
          name="search"
          placeholder="Search movie"
        />
        <button
          type="submit"
          className={s.btn}
        >
          Search
        </button>
      </form>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <MovieList films={movies} />
    </>
  );
};

export default MoviesPage;
