import { createStore, combineReducers, applyMiddleware } from "redux";
import * as reducers from "./reducers";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";

const sagaMiddleware = createSagaMiddleware();

export default createStore(
  combineReducers(reducers),
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);
