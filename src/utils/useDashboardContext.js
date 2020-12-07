import React, { useContext, useReducer } from "react";
import Actions from "./dashboardActions";

const DashboardContext = React.createContext({
  selectedUser: null,
});

const initialState = {
  selectedUser: null,
};

function reducer(state, { type, payload }) {
  switch (type) {
    case Actions.SELECT_USER:
      return {
        ...state,
        selectedUser: payload,
      };
    case Actions.CLEAR_USER:
      return {
        ...state,
        selectedUser: null,
      };
    default:
      return state;
  }
}

function DashboardProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <DashboardContext.Provider value={{state, dispatch}} {...props} />;
}

const useDashboardContext = () => {
  return useContext(DashboardContext);
};

export { useDashboardContext, DashboardProvider };
