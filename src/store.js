// store.js
import { configureStore } from '@reduxjs/toolkit';

let defaultInitialState = { isAuth: false, userInfo: {}, myGroups: [], allGroups: [] };
let serializedState = localStorage.getItem('reduxState');
console.log('serializedState:', serializedState)

let initialState = serializedState || defaultInitialState;
console.log('initialState:', JSON.stringify(initialState))

if (serializedState) {
  initialState = JSON.parse(serializedState);
} else {
  initialState = {
    isAuth: false,
    userInfo: {}
  };
}


function rootReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_AUTH':
      return {
        ...state,
        isAuth: action.payload,
      };

    case 'SET_USER':
    return {
        ...state,
        userInfo: action.payload
    };

    case 'SET_MYGROUPS':
      return {
          ...state,
          myGroups: action.payload
      };

      case 'SET_ALLGROUPS':
        return {
            ...state,
            allGroups: action.payload
        };
    default:
      return state;
  }
}

const store = configureStore({
  reducer: rootReducer,
});

// Load state from local storage


// Subscribe to store changes and save state to local storage
store.subscribe(() => {
  const state = store.getState();
  console.log('store in subscribe:', JSON.stringify(state))
  localStorage.setItem('reduxState', JSON.stringify(state));
});


export default store;
