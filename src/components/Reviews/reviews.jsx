import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Loader from "../Loader/Loader";
import styles from "./reviews.module.scss";

export default function Reviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const noResults = "We don't have any reviews for this movie.";
  useEffect(() => {
    async function fetchReview() {
      const url = `https://api.themoviedb.org/3/movie/${movieId}/reviews?language=en-US&api_key=d45c591dd3ef2fb9c22b9964b5ee2547`;
      setLoading(true);
      try {
        const response = await axios.get(url);
        const reviewData = response.data.results.map((review) => ({
          author: review.author,
          content: review.content,
          reviewId: review.id,
        }));
        setReviews(reviewData);
      } catch (error) {
        console.error(
          "Wystąpił błąd podczas pobierania listy gatunków:",
          error,
        );
      } finally {
        setLoading(false);
      }
    }

    fetchReview();
  }, [movieId]);

  return (
    <div>
      <div className={styles.loaderContainer}>{loading && <Loader />}</div>
      {reviews.length === 0 && !loading ? (
        <div>{noResults}</div>
      ) : (
        <ul className={styles.reviewList}>
          {reviews.map((review) => (
            <li key={review.reviewId} className={styles.singleReview}>
              <span className={styles.reviewAuthor}>
                Author: {review.author}
              </span>
              <span>{review.content}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
