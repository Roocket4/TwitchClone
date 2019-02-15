import { combineReducers, createStore, compose, applyMiddleware } from "redux";
import authReducer from './auth/reducers';
import { StateType } from 'typesafe-actions';
import { reducer as formReducer } from 'redux-form';
import reduxSaga from 'redux-saga';
import rootSaga from './rootSaga';
import streamsReducer from './streams/reducers';

const sagaMiddleware = reduxSaga();

const rootState = combineReducers({
  auth: authReducer,
  form: formReducer,
  streams: streamsReducer,
});
export type RootState = StateType<typeof rootState>;

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootState,
  composeEnhancers(applyMiddleware(sagaMiddleware)),
);

sagaMiddleware.run(rootSaga);

export default store;