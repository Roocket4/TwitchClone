import { all, takeLatest, call, put, select } from "@redux-saga/core/effects";
import { getType, ActionType } from 'typesafe-actions';
import streamsActions from './actions';
import api from 'src/apis/streams';
import { StreamResponse, StreamsResponse } from 'src/types/Stream';
import { RootState } from '../store';
import { ownHistory } from 'src/components/App';

function* createStream(action: ActionType<typeof streamsActions.createStream>) {
  try {
    const state: RootState = yield select();
    const { userId } = state.auth;
    const result: StreamResponse = yield call(api.post, '/streams', { ...action.payload, userId });
    yield put(streamsActions.updateStreams(result.data));
    ownHistory.push('/');
  } catch (error) {
    console.error(error);
  }
}

function* fetchStreams() {
  try {
    const result: StreamsResponse = yield call(api.get, '/streams');
    yield put(streamsActions.setStreams(result.data));
  } catch (error) {
    console.error(error);
  }
}

function* fetchStream(action: ActionType<typeof streamsActions.get>) {
  try {
    const result: StreamResponse = yield call(api.get, `/streams/${action.payload}`);
    yield put(streamsActions.updateStreams(result.data));
  } catch (error) {
    console.error(error);
  }
}

function* editStream(action: ActionType<typeof streamsActions.edit>) {
  try {
    const result: StreamResponse = yield call(api.patch, `/streams/${action.payload}`, action.meta);
    yield put(streamsActions.updateStreams(result.data));
    ownHistory.push('/');
  } catch (error) {
    console.error(error);
  }
}

function* deleteStream(action: ActionType<typeof streamsActions.delete>) {
  try {
    yield call(api.delete, `/streams/${action.payload}`);
    yield put(streamsActions.removeStream(action.payload));
    ownHistory.push('/');
  } catch (error) {
    console.error(error);
  }
}

function* streamsSagaWatcher() {
  yield all([
    takeLatest(getType(streamsActions.createStream), createStream),
    takeLatest(getType(streamsActions.getAll), fetchStreams),
    takeLatest(getType(streamsActions.get), fetchStream),
    takeLatest(getType(streamsActions.edit), editStream),
    takeLatest(getType(streamsActions.delete), deleteStream),
  ]);
}


export default streamsSagaWatcher;