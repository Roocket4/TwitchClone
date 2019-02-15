import produce from 'immer';
import authActions, { AuthActions } from './actions';
import { getType } from 'typesafe-actions';

interface AuthState {
  isSignedIn: boolean | null,
  userId: string | null,
}

const initalState: AuthState = {
  isSignedIn: null,
  userId: null,
};

const authReducer = produce((state: AuthState, action: AuthActions) => {
  switch (action.type) {
    case getType(authActions.signIn):
      state.isSignedIn = true;
      state.userId = action.payload;
      return;
    case getType(authActions.signOut):
      state.isSignedIn = false;
      state.userId = null;
      return;
  }
}, initalState,);

export default authReducer;