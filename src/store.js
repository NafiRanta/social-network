// store.js
import { configureStore } from "@reduxjs/toolkit";

let defaultInitialState = {
  isAuth: false,
  userInfo: [],
  myGroups: [],
  allGroups: [],
  allUsers: [],
  chatMateUsername: "",
  loggedinUsers: [],
};
let serializedState = localStorage.getItem("reduxState");

let initialState = serializedState || defaultInitialState;

if (serializedState) {
  initialState = JSON.parse(serializedState);
} else {
  initialState = {
    isAuth: false,
    userInfo: {},
  };
}

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_AUTH":
      return {
        ...state,
        isAuth: action.payload,
      };

    case "SET_USER":
      return {
        ...state,
        userInfo: action.payload,
      };

    case "SET_MYGROUPS":
      return {
        ...state,
        myGroups: action.payload,
      };

    case "SET_ALLGROUPS":
      return {
        ...state,
        allGroups: action.payload,
      };
    
    case "SET_INVITESBYADMIN":
      return {
        ...state,
        invitesByAdmin: action.payload,
      };
    
    case "FETCH_ALLUSERS":
      return {
        ...state,
        allUsers: action.payload,
      };
    case "SET_CHATMATEUSERNAME":
      return {
        ...state,
        chatMateUsername: action.payload,
      };
    case "SET_LOGGEDINUSERS":
      return {
        ...state,
        loggedinUsers: action.payload,
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
  localStorage.setItem("reduxState", JSON.stringify(state));
  console.log("State before serialization:", state); // Add this line
});

export default store;
