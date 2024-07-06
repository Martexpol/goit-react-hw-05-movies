import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Loader from "../Loader/Loader";
import styles from "./cast.module.scss";

export default function Cast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(false);
  const noResults = "We don't have any cast details for this movie.";

  useEffect(() => {
    async function fetchCast() {
      const url = `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US&api_key=d45c591dd3ef2fb9c22b9964b5ee2547`;
      setLoading(true);
      try {
        const response = await axios.get(url);
        const castDetails = response.data.cast.map((member) => ({
          profilePath: member.profile_path,
          castId: member.cast_id,
          name: member.name,
          character: member.character,
        }));
        setCast(castDetails);
      } catch (error) {
        console.error(
          "Wystąpił błąd podczas pobierania listy gatunków:",
          error,
        );
      } finally {
        setLoading(false);
      }
    }

    fetchCast();
  }, [movieId]);

  return (
    <div>
      <div className={styles.loaderContainer}>{loading && <Loader />}</div>

      {cast.length === 0 && !loading ? (
        <div>{noResults}</div>
      ) : (
        <ul className={styles.castList}>
          {cast.map((member) => (
            <li key={member.castId} className={styles.castMember}>
              <img
                src={`https://image.tmdb.org/t/p/w154${member.profilePath}`}
                alt={member.name}
              />
              <div className={styles.castMemberDetails}>
                <span className={styles.memberName}>{member.name}</span>
                <span>Character: {member.character}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
