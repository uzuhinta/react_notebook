export default function Pizza({ pizzaObj }) {
  return (
    <li className='pizza'>
      <img src={pizzaObj.photoName}></img>
      <div>
        <h3>{pizzaObj.name}</h3>
        <p>{pizzaObj.ingredients}</p>
        <span>{pizzaObj.price}</span>
      </div>
    </li>
  );
}
