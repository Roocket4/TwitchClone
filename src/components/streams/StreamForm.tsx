import * as React from 'react';
import { reduxForm, Field, InjectedFormProps } from 'redux-form';
import RenderInput from '../RenderInput';

export interface FormData {
  title: string,
  description: string,
}

interface OwnProps {
  onSubmit: (event: FormData) => void,
}

type Props = InjectedFormProps<FormData> & OwnProps;

class StreamForm extends React.Component<Props> {
  public render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.props.onSubmit)} className="ui form error">
        <Field name="title" component={RenderInput} label="Enter Title"/>
        <Field name="description" component={RenderInput} label="Enter Description"/>
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

const validate = (formValues: FormData) => {
  const errors: Partial<FormData> = {};

  if (!formValues.title) {
    errors.title = 'You must enter a title';
  }

  if (!formValues.description) {
    errors.description = 'You must enter a description';
  }
  return errors;
};

export default reduxForm({
  form: 'streamForm', validate
})(StreamForm);

