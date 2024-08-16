import {
  Link,
  useLocation,
  useParams,
  useOutletContext,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchMovieCast } from "../../apiServise/apiServise";
import css from "./MovieCast.module.css";

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const location = useLocation();
  const { selectedMovie } = useOutletContext(); // Отримуємо дані через context
  const defaultImg =
    "https://dummyimage.com/400x600/cdcdcd/000.jpg&text=No+poster";

  useEffect(() => {
    async function fetchCast() {
      try {
        const data = await fetchMovieCast(movieId);
        setCast(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchCast();
  }, [movieId]);

  return (
    <div className={css.container_list_cast}>
      <Link to={location.state?.from ?? `/movies/${movieId}`}>Go back</Link>
      <h2>{selectedMovie?.title} - Cast</h2>
      {cast.length === 0 ? (
        <p>No information</p>
      ) : (
        <ul className={css.list}>
          {cast.map((actor) => (
            <li key={actor.id}>
              <img
                className={css.img}
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                    : defaultImg
                }
                alt={actor.name}
              />
              <div className={css.container}>
                <h3>{actor.name}</h3>
                <p>Character: {actor.character}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
