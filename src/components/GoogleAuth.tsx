import * as React from 'react';
import authActions from 'src/ducks/auth/actions';
import { connect } from 'react-redux';
import { RootState } from 'src/ducks/store';

interface State {
  isSignedIn: any,
}

type Props = typeof mapDispatchToProps & ReturnType<typeof mapStateToProps>;

class GoogleAuth extends React.Component<Props, State> {
  private auth: any;
  
 public componentDidMount() {
    // @ts-ignore
    window.gapi.load("client:auth2", () => {
      // @ts-ignore
      window.gapi.client.init({
        clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        scope: 'email',
      }).then(() => {
        // @ts-ignore
        this.auth = window.gapi.auth2.getAuthInstance();
        this.onAuthChange(this.auth.isSignedIn.get());
        this.auth.isSignedIn.listen(this.onAuthChange);
      });
    });
  }

  private onAuthChange = (isSignedIn: boolean) => {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };

  private onSignInClick = () => {
    this.auth.signIn();
  };

  private onSignOutClick = () => {
    this.auth.signOut();
  };

  public render() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button onClick={this.onSignOutClick} className="ui red google button">
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button onClick={this.onSignInClick} className="ui red google button">
          <i className="google icon" />
          Sign In with Google
        </button>
      );
    }  
  }
}

const mapDispatchToProps = {
  signIn: authActions.signIn,
  signOut: authActions.signOut,
};

const mapStateToProps = (state: RootState) => ({
  isSignedIn: state.auth.isSignedIn 
});

export default connect(mapStateToProps, mapDispatchToProps)(GoogleAuth);