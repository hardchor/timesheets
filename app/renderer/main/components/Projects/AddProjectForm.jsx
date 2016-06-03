import React, { PropTypes } from 'react';
import { reduxForm, Field } from 'redux-form';
import adapter, { TEXT } from '../../../shared/forms/adapter';

function AddProjectForm({ handleSubmit, reset }) {
  function onSubmit(...args) {
    handleSubmit(...args);
    // TODO: reset() broken until https://github.com/erikras/redux-form/commit/f5eeca13930a786d69fc5f535573c0d6d83f55b9 gets released
    // reset();
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <Field name="name" label="New Project" component={TEXT} />
      </form>
    </div>
  );
}

AddProjectForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'addProject',
  adapter,
})(AddProjectForm);
