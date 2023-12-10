const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: '',
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case 'account/deposit':
      return {
        ...state,
        balance: state.balance + payload,
      };
    case 'account/withdraw':
      return {
        ...state,
        balance: state.balance - payload,
      };
    case 'account/requestLoan':
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: payload.amount,
        loanPurpose: payload.purpose,
        balance: state.balance + payload.amount,
      };
    case 'account/payLoan':
      return {
        ...state,
        loan: 0,
        loanPurpose: '',
        balance: state.balance - state.loan,
      };
    default:
      return state;
  }
}

export function deposit(amount, currency) {
  if (currency === 'USD')
    return {
      type: 'account/deposit',
      payload: amount,
    };

  return function (dispatch, getState) {
    const host = 'api.frankfurter.app';
    fetch(`https://${host}/latest?amount=${amount}&from=${currency}&to=USD`)
      .then((resp) => resp.json())
      .then((data) => {
        console.log('data.rates.USD', data.rates.USD);
        dispatch({
          type: 'account/deposit',
          payload: data.rates.USD,
        });
      });
  };
}
export function withdraw(amount) {
  return {
    type: 'account/withdraw',
    payload: amount,
  };
}
export function requestLoan(amount, purpose) {
  return {
    type: 'account/requestLoan',
    payload: { amount, purpose },
  };
}
export function payLoan() {
  return {
    type: 'account/payLoan',
  };
}
