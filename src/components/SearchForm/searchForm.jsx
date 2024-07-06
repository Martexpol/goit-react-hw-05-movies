import propTypes from "prop-types";
import styles from "./searchForm.module.scss";

export default function SearchForm({ onSubmit }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const searchTerm = event.target.elements.searchTerm.value;
    onSubmit(searchTerm);
  };

  return (
    <form className={styles.SearchForm} onSubmit={handleSubmit}>
      <button type="submit" className={styles.submitBtn}>
        <span className={styles.buttonLabel}>Search</span>
      </button>

      <input
        className={styles.input}
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search movies"
        name="searchTerm"
      />
    </form>
  );
}

SearchForm.propTypes = {
  onSubmit: propTypes.func.isRequired,
};
