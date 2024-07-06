import propTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./movies.module.scss";

export default function Movies({ movies }) {
  if (!movies) {
    return null;
  }
  return (
    <ul className={styles.moviesList}>
      {movies.map((movie) => (
        <li key={movie.id}>
          <Link to={`/movies/${movie.id}`} className={styles.titleLink}>
            {movie.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}

Movies.propTypes = {
  movies: propTypes.array,
};
