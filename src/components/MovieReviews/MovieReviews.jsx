import {
  Link,
  useLocation,
  useParams,
  useOutletContext,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchMovieReviews } from "../../apiServise/apiServise";
import css from "./MovieReviews.module.css";

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviewsList, setReviewsList] = useState([]);
  const location = useLocation();
  const { selectedMovie } = useOutletContext(); // Отримуємо дані через context

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const response = await fetchMovieReviews(movieId);
        setReviewsList(response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchReview();
  }, [movieId]);

  return (
    <div className={css.container_list_reviews}>
      <div>
        <Link to={location.state?.from ?? `/movies/${movieId}`}>Go back</Link>
      </div>
      <h2>{selectedMovie?.title} - Reviews</h2>
      <ul className={css.list}>
        {reviewsList.length > 0
          ? reviewsList.map(({ author, content, id }) => (
              <li key={id}>
                <h3>{author}</h3>
                <p>{content}</p>
              </li>
            ))
          : "Sorry, we don't have any review for this movie"}
      </ul>
    </div>
  );
}
