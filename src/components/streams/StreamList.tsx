import * as React from 'react';
import streamsActions from 'src/ducks/streams/actions';
import { connect } from 'react-redux';
import { RootState } from 'src/ducks/store';
import { Link } from 'react-router-dom';
import { Stream } from 'src/types/Stream';

type Props = typeof mapDispatchToProps & ReturnType<typeof mapStateToProps>;

class StreamList extends React.Component<Props> {
  public componentDidMount() {
    this.props.fetchStreams();
  }

renderAdmin = (stream: Stream) => {
  if (stream.userId === this.props.currentUserId) {
    return (
      <div className="right floated content">
        <Link to={`/streams/edit/${stream.id}`} className="ui button primary">Edit</Link>
        <Link to={`/streams/delete/${stream.id}`}className="ui button negative">Delete</Link>
      </div>
    );
  }
  return null;
}

renderList() {
  return this.props.streams.map(stream => {
    return (
      <div className="item" key={stream.id}>
       {this.renderAdmin(stream)}
        <i className="large middle aligned icon camera"/> 
        <div className="content">
            <Link to={`/streams/${stream.id}`} className="header">
            {stream.title}
            </Link>
            <div className="description">{stream.description}</div>
        </div>
      </div>
     );
  });
}

renderCreate = () => {
  if (this.props.isSignedIn) {
    return (
      <div style={{ textAlign: 'right'}}>
        <Link to="/streams/new" className="ui button primary">
          Create Stream
        </Link>
      </div>
    );
  }
  return null;
}

public render() {
    return (
    <div>
      <h2>Streams</h2>
      <div className="ui celled list">{this.renderList()}</div>
      {this.renderCreate()}
    </div>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return { 
    streams: Object.values(state.streams),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn,
  };
};

const mapDispatchToProps = {
  fetchStreams: streamsActions.getAll,
}


export default connect(mapStateToProps, mapDispatchToProps)(StreamList);