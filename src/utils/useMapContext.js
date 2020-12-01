import React, { useContext, useReducer } from "react";

const MapContext = React.createContext({
  userPosition: null,
  viewport: {
    latitude: null,
    longitude: null,
    zoom: 13,
  },
});

const initialState = {
  userPosition: null,
  viewport: {
    latitude: 12.5165,
    longitude: 13.5465,
    zoom: 13,
  },
}

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

function MapProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <MapContext.Provider value={{ state, dispatch }} {...props} />;
}

const useMapContext = () => {
  return useContext(MapContext);
}

export { useMapContext, MapProvider }
