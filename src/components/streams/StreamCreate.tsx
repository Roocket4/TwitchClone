import * as React from 'react';
import { connect } from 'react-redux';
import StreamForm, { FormData } from './StreamForm';
import streamsActions from 'src/ducks/streams/actions';


type Props = typeof mapDispatchToPorps;

class StreamCreate extends React.Component<Props> {
  public onSubmit = (event: FormData) => { 
    this.props.createStream(event);
  }

  public render() {
    return (
     <div>
       <h3>Create a Stream</h3>
       <StreamForm onSubmit={this.onSubmit} />
     </div>
    );
  }
}

const mapDispatchToPorps = {
  createStream: streamsActions.createStream,
}

export default connect(null, mapDispatchToPorps)(StreamCreate)