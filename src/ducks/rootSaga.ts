import { all } from "@redux-saga/core/effects";
import streamsSagaWatcher from './streams/sagas';

function* rootSaga() {
  yield all([
    streamsSagaWatcher(),
  ]);
}

export default rootSaga;