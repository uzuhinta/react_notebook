import { useEffect, useState } from 'react';
import Box from './Box';
import ErrorMessage from './ErrorMessage';
import Header from './Header';
import Loader from './Loader';
import MovieList from './MovieList';
import NumResult from './NumResult';
import Search from './Search';
import SelectedMovie from './SelectedMovie';
import WatchedList from './WatchedList';
import WatchedSummary from './WatchedSummary';
import { useMovies } from './useMovies';
import { useLocalStorage } from './useLocalStorage';

function Main({ children }) {
  return <main className='main'>{children}</main>;
}

function App() {
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [watched, setWatched] = useLocalStorage('watched', []);
  const { movies, isLoading, error } = useMovies(query, handleCloseMovie);

  async function handleItemClick(id) {
    setSelectedId(id);
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  return (
    <>
      <Header>
        <Search query={query} setQuery={setQuery} />
        <NumResult movies={movies} />
      </Header>
      <Main>
        <Box>
          {isLoading ? (
            <Loader />
          ) : error ? (
            <ErrorMessage message={error} />
          ) : (
            <MovieList onItemClick={handleItemClick} movies={movies} />
          )}
        </Box>
        <Box>
          {selectedId ? (
            <SelectedMovie
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedList
                watched={watched}
                onDeleteWatched={(id) => handleDeleteWatched(id)}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

export default App;
