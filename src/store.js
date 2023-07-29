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
  invitesByAdmin: [],
  invitesByMember: [],
  chatNotification : false,
  notification : false,
  clickedProfileInfo: [],
  followNotification: [],
  clickedProfileInfo: [],
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
    case "SET_INVITESBYMEMBER":
      return {
        ...state,
        invitesByMember: action.payload,
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
    case "SET_CHATNOTIFICATION":
      return {
        ...state,
        chatNotification: action.payload,
      };
    case "SET_NOTIFICATION":
      return {
        ...state,
        notification: action.payload,
      };
    case "SET_FOLLOWNOTIFICATION":
      return {
        ...state,
        followNotification: action.payload,
      };
    case "SET_CLICKEDPROFILEINFO":
      return {
        ...state,
        clickedProfileInfo: action.payload,
      };
    case "SET_CHATMESSAGES":
      return {
        ...state,
        allChatMessagesSorted: action.payload,
      };
    case "SHOW_NOTIFICATION_TEST":
      return {
        ...state,
        message: action.payload.message,
        type: action.payload.type,
        show: true,
      };
    default:
      return state; 
  }
}

const store = configureStore({
  reducer: rootReducer,
});

// Subscribe to store changes and save state to local storage
store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem("reduxState", JSON.stringify(state));
  // console.log("state", state);
});

export default store;
