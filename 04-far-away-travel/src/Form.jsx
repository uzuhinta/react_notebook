import { useState } from "react";

export default function Form({ onAddItem }) {
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(1);
  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;
    const newItem = { description, quantity, packed: false, id: Date.now() };
    setDescription('');
    setQuantity(1);
    onAddItem(newItem);
  }
  return (
    <form className='add-form' onSubmit={handleSubmit}>
      <label>What do you need for your trip?</label>
      <select
        type='number'
        value={quantity}
        onChange={(e) => setQuantity(+e.target.value)}
      >
        {Array.from({ length: 12 }, (_, i) => i + 1).map((num) => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type='text'
        placeholder='Item...'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></input>
      <button type='submit'>Add</button>{' '}
    </form>
  );
}
