import { useEffect, useRef } from 'react';
import { useKey } from './useKey';

export default function Search({ query, setQuery }) {
  const inputEl = useRef(null);
  useEffect(() => {
    inputEl.current.focus();
  }, []);

  useKey('Enter', function () {
    if (document.activeElement === inputEl.current) return;
    inputEl.current.focus();
    setQuery('');
  });

  return (
    <input
      ref={inputEl}
      className='search'
      placeholder='Search movies'
      type='text'
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    ></input>
  );
}
