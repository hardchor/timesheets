import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { Textfield } from 'react-mdl';

const fields = ['name'];

function AddProjectForm({ fields: { name }, handleSubmit, resetForm }) {
  function onSubmit(...args) {
    handleSubmit(...args);
    resetForm();
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <Textfield
          {...name}
          floatingLabel
          label="New Project"
        />
      </form>
    </div>
  );
}

AddProjectForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'addProject',
  fields,
})(AddProjectForm);
