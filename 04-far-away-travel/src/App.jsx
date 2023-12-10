import { useState } from 'react';
import Logo from './Logo';
import Form from './Form';
import PackingList from './PackingList';
import Stats from './Stats';

function App() {
  const [items, setItems] = useState([]);

  function handleAddItem(item) {
    setItems((prev) => [...prev, item]);
  }

  function handDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handlePackItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handleClearItem() {
    const confirmed = window.confirm('Are you sure?');

    if (confirmed) setItems([]);
  }

  return (
    <div className='container'>
      <Logo />
      <Form onAddItem={handleAddItem} />
      <PackingList
        items={items}
        onDeleteItem={handDeleteItem}
        onPackItem={handlePackItem}
        onClearITem={handleClearItem}
      />

      <Stats items={items} />
    </div>
  );
}

export default App;
