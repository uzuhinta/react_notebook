import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';
const BASE_URL = 'http://localhost:9000';

const CitiesContext = createContext();

const initializeState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: '',
};

function reducer(state, action) {
  switch (action.type) {
    case 'loading': {
      return { ...state, isLoading: true };
    }
    case 'cities/loaded':
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };

    case 'city/loaded': {
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
      };
    }

    case 'city/created':
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };

    case 'city/deleted':
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };
    case 'rejected':
      return { ...state, isLoading: false, error: action.payload };

    default:
      throw new Error('Unknown action type');
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initializeState
  );

  useEffect(() => {
    const controller = new AbortController();
    async function fetchCities() {
      try {
        dispatch({ type: 'loading' });
        const res = await fetch(`${BASE_URL}/cities`, {
          signal: controller.signal,
        });
        const data = await res.json();
        dispatch({ type: 'cities/loaded', payload: data });
      } catch (error) {
        dispatch({ type: 'rejected', payload: error.message });
      }
    }

    fetchCities();

    return () => {
      controller.abort();
    };
  }, []);

  async function getCity(id) {
    try {
      dispatch({ type: 'loading' });
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      dispatch({ type: 'city/loaded', payload: data });
    } catch (error) {
      dispatch({ type: 'rejected', payload: error.message });
    }
  }

  async function createCity(newCity) {
    try {
      dispatch({ type: 'loading' });
      await fetch(`${BASE_URL}/cities`, {
        method: 'POST',
        body: JSON.stringify(newCity),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      dispatch({
        type: 'city/created',
        payload: newCity,
      });
    } catch (error) {
      dispatch({ type: 'rejected', payload: error.message });
    }
  }

  async function deleteCity(id) {
    try {
      dispatch({ type: 'loading' });

      await fetch(`${BASE_URL}/cities/${id}`, {
        method: 'DELETE',
      });
      dispatch({
        type: 'city/deleted',
        payload: id,
      });
    } catch (error) {
      dispatch({ type: 'rejected', payload: error.message });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

const useCities = function () {
  const context = useContext(CitiesContext);
  if (!context) throw new Error('Must be use in CitiesContext.Provider');
  return context;
};

export { useCities, CitiesProvider };
