import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Suspense, lazy } from "react";

const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const MoviesPage = lazy(() => import("./pages/MoviesPage/MoviesPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage/NotFoundPage"));
const Navigation = lazy(() => import("./components/Navigation/Navigation"));
const MovieDetailsPage = lazy(() =>
  import("./pages/MovieDetailsPage/MovieDetailsPage")
);
const MovieCast = lazy(() => import("./components/MovieCast/MovieCast"));
const MovieReviews = lazy(() =>
  import("./components/MovieReviews/MovieReviews")
);

function App() {
  return (
    <div className="wrapper">
      <Suspense
        fallback={<span className="loading loading-spinner text-error"></span>}
      >
        <Navigation />
        <Routes>
          <Route
            path="/"
            element={<HomePage />}
          />
          <Route
            path="/movies"
            element={<MoviesPage />}
          />
          <Route
            path="/movies/:movieId"
            element={<MovieDetailsPage />}
          >
            <Route
              path="cast"
              element={<MovieCast />}
            />
            <Route
              path="reviews"
              element={<MovieReviews />}
            />
          </Route>

          <Route
            path="*"
            element={<NotFoundPage />}
          />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
