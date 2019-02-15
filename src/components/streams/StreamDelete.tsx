import * as React from 'react';
import Modal from '../Modal';
import streamsActions from 'src/ducks/streams/actions';
import { connect } from 'react-redux';
import { RootState } from 'src/ducks/store';
import { RouteComponentProps, Link } from 'react-router-dom';

type Props = OwnProps & typeof mapDispatchToProps & ReturnType<typeof mapStateToProps>;

interface OwnProps extends RouteComponentProps<{
  id: string,
}> {
}

class StreamDelete extends React.Component<Props> {
componentDidMount() {
  this.props.fetchStream(this.props.match.params.id);
}

renderContent() {
  if (!this.props.stream) {
    return 'Are you sure you want to delete this stream?'
  }
    return `Are you sure you want to delete the stream with title: ${this.props.stream.title}`
}

public render() {
  return (
   <div>
     <Modal title="Delete Stream" content={this.renderContent()}>
        <button onClick={() => this.props.deleteStream(this.props.match.params.id)} className="ui primary button">Delete</button>
        <Link to="/" className="ui button">Cancel</Link>
     </Modal>
   </div>
  );
 }
}

const mapStateToProps = (state: RootState, props: OwnProps) => {
  return { stream: state.streams[props.match.params.id]}
}

const mapDispatchToProps = {
  fetchStream: streamsActions.get,
  deleteStream: streamsActions.delete,
}

export default connect(mapStateToProps, mapDispatchToProps)(StreamDelete);