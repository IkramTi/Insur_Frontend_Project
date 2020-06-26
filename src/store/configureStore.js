/**
 * Configuration Redux Store
 */

import { applyMiddleware, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducers from './reducers';

const initialState = {};
const middlewares = [thunkMiddleware];
const middlewareEnhancer = applyMiddleware(...middlewares);
const composeEhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  initialState,
  composeEhancers(
    middlewareEnhancer
  )
);

export default store;