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

function Main({ children }) {
  return <main className='main'>{children}</main>;
}

const API_KEY = '2aae3782';

const wait = (second) => {
  return new Promise((res) => {
    setTimeout(() => {
      res();
    }, second * 1000);
  });
};

function App() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    async function fetchMovies() {
      try {
        setIsLoading(true);
        setError('');
        const res = await fetch(
          `http://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`,
          { signal: controller.signal }
        );

        if (!res.ok) {
          throw new Error('Something went wrong');
        }

        const data = await res.json();
        if (data.Response === 'False') {
          throw new Error('Movie not found');
        }
        setMovies(data.Search);
        setError('');
      } catch (error) {
        console.log('error', error);
        if (error.name !== 'AbortError') {
          setError(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    }
    if (!query.length) {
      setMovies([]);
      setIsLoading(false);
      setError('');
      return;
    }
    fetchMovies();

    return function () {
      controller.abort();
    };
  }, [query]);

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
