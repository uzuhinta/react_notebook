export default function NumResult({ movies }) {
  return (
    <p className='result'>
      Found <strong>{movies.length}</strong> results
    </p>
  );
}
