export default function Stats({ items }) {
  const numItems = items.length;
  const numPackedItems = items.filter((item) => item.packed).length;
  return (
    <footer>
      {numItems > 0 ? (
        <>
          You have <span>{numItems}</span> on your list, and you already packed{' '}
          <span>
            {' '}
            numItems ({Math.round((numPackedItems / numItems) * 100)}%)
          </span>
        </>
      ) : (
        <>No items</>
      )}
    </footer>
  );
}
