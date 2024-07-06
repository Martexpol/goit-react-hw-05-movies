import { useState, useEffect } from "react";
import axios from "axios";
import styles from "../components/app.module.scss";
import Loader from "../components/Loader/Loader";
import Movies from "../components/Movies/movies";
import { useFormContext } from "../components/FormContextProvider/FormContextProvider";

export default function Home() {
  const { movies, setMovies } = useFormContext();
  const [loading, setLoading] = useState(false);

  const fetchMovies = async () => {
    const url = `https://api.themoviedb.org/3/trending/movie/day?language=en-US&api_key=d45c591dd3ef2fb9c22b9964b5ee2547`;
    setLoading(true);
    try {
      const response = await axios.get(url);
      const newMovies = response.data.results.map((movie) => ({
        id: movie.id,
        title: movie.title,
        overview: movie.overview,
        score: movie.vote_average,
        releaseDate: movie.release_date,
        posterPath: movie.poster_path,
        genres: movie.genre_ids,
      }));
      setMovies(newMovies);
    } catch (error) {
      console.error("Wystąpił błąd:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div>
      <h1 className={styles.header}>Trending today</h1>
      <div className={styles.loaderContainer}>{loading && <Loader />}</div>
      <Movies movies={movies} />
    </div>
  );
}
