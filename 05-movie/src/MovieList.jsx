import Movie from "./Movie";

export default function MovieList({ movies, onItemClick }) {
  return (
    <ul className='movies'>
      {movies.map((movie) => (
        <Movie onItemClick={onItemClick} key={movie.imdbID} movie={movie} />
      ))}
    </ul>
  );
}
