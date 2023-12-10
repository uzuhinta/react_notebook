import React, { useState } from 'react';

const messages = [
  'Learn React ⚛️',
  'Apply for jobs 💼',
  'Invest your new income 🤑',
];

function App() {
  const [step, setStep] = useState(1);
  const handleClick = (step) => () => {
    if (step > 1) setStep(step - 1);
    if (step < messages.length) setStep(step + 1);
  };
  return (
    <>
      <div className='close'>&times;</div>
      <div className='steps'>
        <div className='numbers'>
          <div className={step >= 1 ? 'active' : ''}>1</div>
          <div className={step >= 2 ? 'active' : ''}>2</div>
          <div className={step >= 3 ? 'active' : ''}>3</div>
        </div>
        <h2 className='message'>{messages[step - 1]}</h2>
        <div className='buttons'>
          <button className='active' onClick={handleClick(-1)}>
            <span>Prev</span>
          </button>
          <button className='active' onClick={handleClick(+1)}>
            <span>Next</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
