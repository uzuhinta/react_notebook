const initialState = {
  fullName: '',
  nationalId: '',
  createdAt: '',
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case 'customer/create':
      return {
        ...state,
        fullName: payload.fullName,
        nationalId: payload.nationalId,
        createdAt: payload.createdAt,
      };
    case 'customer/updateName':
      return { ...state, fullName: payload };
    default:
      return state;
  }
}

export function createCustomer(fullName, nationalID) {
  return {
    type: 'customer/create',
    payload: {
      fullName,
      nationalID,
      createdAt: new Date().toISOString(),
    },
  };
}

export function updateName(fullName) {
  return {
    type: 'customer/updateName',
    payload: fullName,
  };
}
