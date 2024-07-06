import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useFormContext } from "../components/FormContextProvider/FormContextProvider";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchForm from "../components/SearchForm/searchForm";
import Movies from "../components/Movies/movies";
import Loader from "../components/Loader/Loader";
import styles from "../components/app.module.scss";

export default function Search() {
  const { movies, setMovies } = useFormContext();
  const [searchTerm, setSearchTerm] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("query");
    if (query) {
      setSearchTerm(query);
      fetchMovies(query);
    }
  }, [location.search]);

  useEffect(() => {
    // Resetowanie listy filmów po wejściu na stronę search
    if (!searchTerm) {
      setMovies([]);
    } else {
      fetchMovies(searchTerm);
    }
  }, [searchTerm]);

  const fetchMovies = async (searchTerm) => {
    const encodedSearchTerm = encodeURIComponent(searchTerm);
    const url = `https://api.themoviedb.org/3/search/movie?query=${encodedSearchTerm}&api_key=d45c591dd3ef2fb9c22b9964b5ee2547`;
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

      if (newMovies.length === 0) {
        toast("Nie znaleziono żadnych wyników.");
      }
      setMovies(newMovies);
    } catch (error) {
      console.error("Wystąpił błąd podczas wyszukiwania:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (searchTerm) => {
    setSearchTerm(searchTerm);
    navigate(`?query=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <div>
      {" "}
      <SearchForm onSubmit={handleSubmit} />
      <ToastContainer />
      <div className={styles.loaderContainer}>{loading && <Loader />}</div>
      <Movies movies={movies} />
    </div>
  );
}
