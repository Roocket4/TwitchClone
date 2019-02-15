import * as React from 'react';
import { WrappedFieldProps } from 'redux-form';

interface OwnProps {
  label: string,
}

type Props = WrappedFieldProps & OwnProps;

const RenderInput: React.FC<Props> = ({ input, label, meta }) => (
  <div className={`field ${meta.error && meta.touched ? 'error' : null}`}>
    <label>{label}</label>
    <input {...input}/>
    {meta.error && meta.touched ?
      <div className="ui error message">
        <div className="header">{meta.error}</div>
      </div>: null}
  </div>
);

export default RenderInput;