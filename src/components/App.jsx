import MainRouter from "./MainRouter";
import { NavLink } from "react-router-dom";
import styles from "./app.module.scss";

function App() {
  return (
    <div>
      <nav className={styles.navBox}>
        {" "}
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? styles.activeLink : undefined
          }>
          <button type="button" className={styles.navBtn}>
            Home
          </button>
        </NavLink>
        <NavLink
          to="/search"
          className={({ isActive }) =>
            isActive ? styles.activeLink : undefined
          }>
          <button type="button" className={styles.navBtn}>
            Movies
          </button>
        </NavLink>
      </nav>
      <MainRouter />
    </div>
  );
}

export default App;
