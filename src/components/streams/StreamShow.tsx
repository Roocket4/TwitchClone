import * as React from 'react';
import { connect } from 'react-redux';
import streamsActions from 'src/ducks/streams/actions';
import { RouteComponentProps } from 'react-router-dom';
import { RootState } from 'src/ducks/store';

type Props = OwnProps & typeof mapDispatchToProps & ReturnType<typeof mapStateToProps>;

interface OwnProps extends RouteComponentProps<{
  id: string,
}> {
}

class StreamShow extends React.Component<Props> {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  public render() {
    if (!this.props.stream) {
      return <div>Loading...</div>
    }

    const { title, description } = this.props.stream;

    return (
      <div>
        <h1>{title}</h1>
        <h5>{description}</h5>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState, props: OwnProps) => {
  return { stream: state.streams[props.match.params.id]};
}

const mapDispatchToProps = {
  fetchStream: streamsActions.get,
} 

export default connect(mapStateToProps, mapDispatchToProps)(StreamShow);