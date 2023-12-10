export default function Movie({ movie, onItemClick }) {
  return (
    <li className='movie' onClick={() => onItemClick(movie.imdbID)}>
      <img src={movie.Poster}></img>
      <h3 className='title'>{movie.Title}</h3>
      <p>
        <span>🗓</span>
        <span>{movie.Year}</span>
      </p>
    </li>
  );
}
