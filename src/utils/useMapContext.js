import React, { useContext, useReducer } from "react";

const MapContext = React.createContext({
  userPosition: null,
  viewport: {
    latitude: null,
    longitude: null,
    zoom: 13,
  },
});

function reducer(state, { type, payload }) {
  switch (type) {
    case "UPDATE_USER_POSITION":
      return {
        ...state,
        userPosition: payload,
      };
    case "UPDATE_VIEWPORT":
      return {
        ...state,
        viewport: payload,
      };
    default:
      return state;
  }
}
