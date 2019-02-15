import { createStandardAction, ActionType } from "typesafe-actions";
import { FormData } from 'src/components/streams/StreamForm';
import { Stream } from 'src/types/Stream';

const streamsActions = {
  createStream: createStandardAction('CREATE_STREAM_REQUEST')<FormData>(),
  get: createStandardAction('FETCH_STREAM')<string>(),
  updateStreams: createStandardAction('UPDATE_STREAMS')<Stream>(),
  getAll: createStandardAction('FETCH_STREAMS')(),
  setStreams: createStandardAction('SET_STREAMS')<Stream[]>(),
  delete: createStandardAction('DELETE_STREAM')<string>(),
  removeStream: createStandardAction('REMOVE_STREAM')<string>(),
  edit: createStandardAction('EDIT_STREAM')<string, FormData>(),
}

export type StreamActions = ActionType<typeof streamsActions>;

export default streamsActions;