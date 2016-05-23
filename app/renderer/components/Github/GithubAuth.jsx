import React, { PropTypes } from 'react';
import { Textfield, Button } from 'react-mdl';
import { reduxForm } from 'redux-form';
import { shell } from 'electron';

const fields = ['username', 'password', 'twofa'];

function GithubAuth({
  fields: { username, password, twofa },
  handleSubmit,
  resetForm,
  github,
}) {
  function onSubmit(...args) {
    handleSubmit(...args);
    // resetForm();
  }

  if (github.error) {
    if (github.twofaFailed) {
      twofa.error = 'Incorrect two factor auth code';
    } else if (github.tokenExists) {
      username.error = 'Token already exists';
    } else {
      username.error = 'There has been a problem logging you in';
    }
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <Textfield
          {...username}
          floatingLabel
          label="Username"
        />
        <Textfield
          {...password}
          floatingLabel
          type="password"
          label="Password"
        />
        {github.twofa &&
          <Textfield
            {...twofa}
            floatingLabel
            label="Two factor auth code"
          />
        }
        <Button raised accent ripple>Login</Button>
      </form>
      {github.tokenExists &&
        <div>
          <a href="https://github.com/settings/tokens">
            Please make sure you don't already have an existing Personal access token
          </a>
        </div>
      }
    </div>
  );
}

GithubAuth.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  github: PropTypes.object.isRequired,
  resetForm: PropTypes.func.isRequired,
  fields: PropTypes.object.isRequired,
};

export default reduxForm({
  form: 'githubAuth',
  fields,
})(GithubAuth);
