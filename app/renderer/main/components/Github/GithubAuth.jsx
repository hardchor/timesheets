/* eslint-disable no-param-reassign */
import React, { PropTypes } from 'react';
import { Button } from 'react-mdl';
import { reduxForm, Field } from 'redux-form';
import adapter, { TEXT, PASSWORD } from '../../../shared/forms/adapter';

function GithubAuth({ handleSubmit, github }) {
  function onSubmit(...args) {
    handleSubmit(...args);
  }

  const errors = {};
  if (github.error) {
    if (github.twofaFailed) {
      errors.twofa = 'Incorrect two factor auth code';
    } else if (github.tokenExists) {
      errors.username = 'Token already exists';
    } else {
      errors.username = 'There has been a problem logging you in';
    }
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <Field name="username" label="Username" error={errors.username} component={TEXT} />
        <Field name="password" label="Password" error={errors.password} component={PASSWORD} />
        {github.twofa &&
          <Field name="twofa" label="Two factor auth code" error={errors.twofa} component={TEXT} />
        }
        <Button type="submit" raised accent ripple>Login</Button>
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
};

export default reduxForm({
  form: 'githubAuth',
  adapter,
})(GithubAuth);
