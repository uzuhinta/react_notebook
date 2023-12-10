export default function Item({ item, onDeleteItem, onPackItem }) {
  return (
    <li>
      <input
        type='checkbox'
        checked={item.packed}
        onChange={() => onPackItem(item.id)}
      ></input>
      <label style={item.packed ? { textDecoration: 'line-through' } : {}}>
        <span>{item.quantity}</span>
        <span>{item.description}</span>
      </label>
      <button className='status' onClick={() => onDeleteItem(item.id)}>
        &times;
      </button>
    </li>
  );
}
