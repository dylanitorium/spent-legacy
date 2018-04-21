import { applyMiddleware, createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import localforage from 'localforage'
import reducer from './modules';

const isDev = process.env.NODE_ENV === 'development';
const loggerIfDev = isDev ? logger : null;

const middleware = [
  thunk,
  loggerIfDev,
].filter(m => !!m);

const persistedReducer = persistReducer({
  key: 'app',
  storage: localforage,
}, reducer);

export const store = createStore(persistedReducer, applyMiddleware(...middleware));
export const persistor = persistStore(store);
