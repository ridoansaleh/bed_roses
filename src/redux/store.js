import { applyMiddleware, createStore, combineReducers, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import { fetchCountries } from "../../api";

export const initializeSession = () => ({
    type: "INITIALIZE_SESSION",
});

const storeData = (data) => ({
    type: "STORE_DATA",
    data,
});

export const fetchData = () => (dispatch) =>
  fetchCountries().then(res => dispatch(storeData(res)));

const sessionReducer = (state = false, action) => {
  switch (action.type) {
    case "INITIALIZE_SESSION":
        return true;
    default:
      return state;
  }
};

const dataReducer = (state = [], action) => {
  switch(action.type) {
    case "STORE_DATA":
      return action.data;
    default:
      return state;
  }
};

const reducer = combineReducers({
  loggedIn: sessionReducer,
  data: dataReducer,
});

export const configureStore = (initialState ) => {
  const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  return createStore(
    reducer,
    initialState,
    composeEnhancers(
      applyMiddleware(thunkMiddleware)
    )
  );
}
