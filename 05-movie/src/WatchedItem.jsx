export default function WatchedItem({ movie, onDeleteWatched }) {
  return (
    <li className='watch__item'>
      <img src={movie.poster} alt={`${movie.Title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
      </div>
      <button className='btn-delete' onClick={() => onDeleteWatched(movie.imdbID)}>x</button>
    </li>
  );
}
