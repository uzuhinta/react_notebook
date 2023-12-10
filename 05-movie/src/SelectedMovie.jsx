import { useEffect, useState } from 'react';
import StarRating from './StarRating';
import Loader from './Loader';
import { useKey } from './useKey';

export default function SelectedMovie({
  selectedId,
  onCloseMovie,
  onAddWatched,
  watched,
}) {
  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState({});
  const [userRating, setUserRating] = useState(0);

  const watchedMovie = watched.find((movie) => movie.imdbID === selectedId);
  const isWatched = !!watchedMovie;

  const watchedUserRate = watchedMovie?.userRating ?? 0;

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Release: release,
    Actors: actors,
    Direction: direction,
    Genre: genre,
  } = movie;

  useKey('Escape', onCloseMovie);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const data = await (
        await fetch(`https://www.omdbapi.com/?i=${selectedId}&apikey=2aae3782`)
      ).json();
      setMovie(data);
      setLoading(false);
    }
    fetchData();
  }, [selectedId]);

  useEffect(() => {
    if (!title) return;
    document.title = `Movie | ${title}`;
    return () => {
      document.title = 'Movie';
    };
  }, [title]);

  function handleWatchedMovie() {
    const newMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: runtime.split(' ').at(0),
      userRating,
    };
    onAddWatched(newMovie);
    onCloseMovie();
  }

  return (
    <div className='detail'>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className='detail_close' onClick={onCloseMovie}>
            &larr;
          </div>
          <div className='detail__head'>
            <img className='detail_img' src={poster}></img>
            <div className='detail_desc'>
              <h2>{title}</h2>
              <div className='detail__time'>
                <span>{movie.DVD}</span>+<span>{runtime}</span>
              </div>
              <div className='detail__genre'>{genre}</div>
              <div>{imdbRating} IMDb rating</div>
            </div>
          </div>
          <div className='detail__body'>
            <p>{movie.Plot}</p>

            {isWatched ? (
              <p
                style={{
                  color: 'red',
                  textAlign: 'center',
                  marginTop: '1.6rem',
                }}
              >
                You rated with movie
              </p>
            ) : (
              <>
                <StarRating
                  onSetRating={(newRating) => setUserRating(newRating)}
                  defaultRating={watchedUserRate}
                />

                {userRating > 0 ? (
                  <button onClick={handleWatchedMovie}>+Add to list</button>
                ) : null}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
