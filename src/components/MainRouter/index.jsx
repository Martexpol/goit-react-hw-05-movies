import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loader from "../Loader/Loader";
import Home from "../../pages/home";

const Search = lazy(() => import("../../pages/search"));
const Movies = lazy(() => import("../Movies/movies"));
const MovieDetails = lazy(() => import("../MovieDetails/movieDetails"));
const Cast = lazy(() => import("../Cast/cast"));
const Reviews = lazy(() => import("../Reviews/reviews"));

export default function MainRouter() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route index element={<Home />}></Route>
        <Route path="/search" element={<Search />}></Route>
        <Route path="/movies" element={<Movies />}></Route>
        <Route path="/movies/:movieId" element={<MovieDetails />}>
          <Route path="cast" element={<Cast />}></Route>
          <Route path="reviews" element={<Reviews />}></Route>
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Suspense>
  );
}
