import { createContext, useReducer } from "react";

export const WebsocketContext = createContext();

const initialState = {
  renderEnter: null,
  renderExit: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "renderEnter":
      return {
        ...state,
        renderEnter: action.payload,
      };
    case "renderExit":
      return {
        ...state,
        renderExit: action.payload,
      };
    default:
      return state;
  }
};

export const WebsocketContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <WebsocketContext.Provider value={{ state, dispatch }}>
      {children}
    </WebsocketContext.Provider>
  );
};
