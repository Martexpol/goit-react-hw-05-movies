import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation, Outlet } from "react-router-dom";
import { useFormContext } from "../FormContextProvider/FormContextProvider";
import styles from "./movieDetails.module.scss";
import axios from "axios";
import { Link } from "react-router-dom";

export default function MovieDetails() {
  const { movieId } = useParams();
  const { movies } = useFormContext();
  const [movie, setMovie] = useState(null);
  const [genresList, setGenresList] = useState([]);
  const [genreNames, setGenreNames] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const selectedMovie = movies.find((m) => m.id === parseInt(movieId));
    if (selectedMovie) {
      setMovie(selectedMovie);
    }
  }, [movieId, movies]);

  // GENRES
  useEffect(() => {
    async function fetchGenresList() {
      const url = `https://api.themoviedb.org/3/genre/movie/list?language=en&api_key=d45c591dd3ef2fb9c22b9964b5ee2547`;
      try {
        const response = await axios.get(url);
        setGenresList(response.data.genres);
      } catch (error) {
        console.error(
          "Wystąpił błąd podczas pobierania listy gatunków:",
          error,
        );
      }
    }

    fetchGenresList();
  }, []);

  useEffect(() => {
    if (genresList.length > 0 && movie.genres) {
      const genreNames = movie.genres.map((id) => {
        const genre = genresList.find((genre) => genre.id === id);
        return genre ? genre.name : "Unknown";
      });
      setGenreNames(genreNames);
    }
  }, [genresList, movie]);

  if (!movie) {
    return <div>Loading...</div>; // Show loading message when movie data is not yet available
  }
  // PHOTO
  const photoUrl = `https://image.tmdb.org/t/p/w185${movie.posterPath}`;
  // SCORE
  const userScore = parseFloat((movie.score * 10).toFixed(1));

  // YEAR
  const releaseDate = movie.releaseDate;
  const d = new Date(releaseDate);
  let year;
  if (releaseDate === 0 || releaseDate === ``) {
    year = `tbc`;
  } else {
    year = d.getFullYear();
  }

  return (
    <div className={styles.movieContainer}>
      <div>
        {" "}
        <button onClick={() => navigate(-1)} className={styles.goBackBtn}>
          Go Back
        </button>
      </div>

      <div className={styles.movieDetailsSection}>
        <div className={styles.imgContainer}>
          <img src={photoUrl} alt="photo" width="185px" />
        </div>
        <div className={styles.movieDescription}>
          <h2 className={styles.movieHeader}>
            {movie.title} ({year})
          </h2>
          <span>User score: {userScore}%</span>
          <h4 className={styles.movieSubHeader}>Overview</h4>
          <span>{movie.overview}</span>
          <h4 className={styles.movieSubHeader}>Genres</h4>
          <span>{genreNames.join(", ")}</span>
        </div>
      </div>
      <div className={styles.movieDetailsSection}>
        Additional information:
        <ul>
          <li>
            <Link to="cast" className={styles.link}>
              Cast
            </Link>
          </li>
          <li>
            <Link
              to={`/movies/${movieId}/reviews`}
              state={{ from: location }}
              className={styles.link}>
              Reviews
            </Link>
          </li>
        </ul>
      </div>
      <div className={styles.movieDetailsSection}>
        <Outlet />
      </div>
    </div>
  );
}
