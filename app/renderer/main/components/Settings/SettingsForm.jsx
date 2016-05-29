import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { Grid, Cell, Switch } from 'react-mdl';

function SettingsForm({ fields: { pomodoroEnabled }, handleSubmit }) {
  function handleChange() {
    setTimeout(handleSubmit, 0);
  }

  return (
    <form onSubmit={handleSubmit} onChange={handleChange}>
      <Grid>
        <Cell col={12}>
          <Switch {...pomodoroEnabled} ripple={false}>Pomodoro timer</Switch>
        </Cell>
      </Grid>
    </form>
  );
}

SettingsForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'settingsForm',
  fields: ['pomodoroEnabled'],
})(SettingsForm);
