import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';

const fields = ['name'];

function AddProjectForm({ fields: { name }, handleSubmit }) {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <div>
            <input type="text" placeholder="Name" {...name} />
          </div>
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

AddProjectForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
};

export default reduxForm({
  form: 'addProject',
  fields,
})(AddProjectForm);
