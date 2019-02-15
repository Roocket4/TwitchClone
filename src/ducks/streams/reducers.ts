import produce from "immer";
import streamsActions, { StreamActions } from './actions';
import { Stream } from 'src/types/Stream';
import { getType } from 'typesafe-actions';

interface StreamsState {
  [id: number]: Stream,
}

const initalState: StreamsState = {}

const streamsReducer = produce((state: StreamsState, action: StreamActions) => {
  switch (action.type) {
    case getType(streamsActions.updateStreams):
      state[action.payload.id] = action.payload;
      return;
    case getType(streamsActions.removeStream):
      delete state[action.payload];
      return;
    case getType(streamsActions.setStreams):
      action.payload.forEach((stream) => {
        state[stream.id] = stream;
      });
      return;
  }
}, initalState);

export default streamsReducer;