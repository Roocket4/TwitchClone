import * as React from 'react';
import { RootState } from 'src/ducks/store';
import streamsActions from 'src/ducks/streams/actions';
import { connect } from 'react-redux';
import { Stream } from 'src/types/Stream';
import { RouteComponentProps } from 'react-router-dom';
import StreamForm from './StreamForm';
import { FormData } from './StreamForm'

interface OwnProps extends RouteComponentProps<{
  id: string,
}> {
  stream: Stream,
}

type Props = OwnProps & typeof mapDispatchToProps & ReturnType<typeof mapStateToProps>

class StreamEdit extends React.Component<Props> {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  onSubmit = (formValues: FormData) => {
    this.props.editStream(this.props.match.params.id, formValues);
  };

    public render() {
      if (!this.props.stream) {
        return <div>Loading</div>;
      }
    return (
      <div>
        <h3>Edit a Stream</h3>
        <StreamForm 
          initialValues={{ title: this.props.stream.title, description: this.props.stream.description }}
          onSubmit={this.onSubmit} />
      </div>
    );
  }
}


const mapStateToProps = (state: RootState, ownProps: OwnProps ) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

const mapDispatchToProps = {
  editStream: streamsActions.edit,
  fetchStream: streamsActions.get,
}

export default connect(mapStateToProps, mapDispatchToProps)(StreamEdit);