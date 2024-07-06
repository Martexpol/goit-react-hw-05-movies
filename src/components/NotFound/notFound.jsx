import { useNavigate } from "react-router-dom";
import styles from "../app.module.scss";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div>
      <h1> Page Not Found</h1>
      <button onClick={() => navigate(-1)} className={styles.goBackBtn}>
        Go Back
      </button>
    </div>
  );
}
