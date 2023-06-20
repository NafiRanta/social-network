// store.js
import { configureStore } from '@reduxjs/toolkit';

const initialState = {
  isAuth: false,
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_AUTH':
      return {
        ...state,
        isAuth: action.payload,
      };
    default:
      return state;
  }
}

const store = configureStore({
  reducer: rootReducer,
});

export default store;
