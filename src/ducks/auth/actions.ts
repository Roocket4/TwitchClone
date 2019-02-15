import { createStandardAction, ActionType } from 'typesafe-actions';

const authActions = {
  signIn: createStandardAction('SIGN_IN')<string>(),
  signOut: createStandardAction('SIGN_OUT')(),
};

export type AuthActions = ActionType<typeof authActions>;

export default authActions;