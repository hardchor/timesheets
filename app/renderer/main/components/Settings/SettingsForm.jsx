import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { Grid, Cell, Switch } from 'react-mdl';

// TODO: pre-populate, handle settings as one big object rather than individual settings
function SettingsForm({
  fields: { remindersEnabled, pomodoroEnabled, githubEnabled },
  handleSubmit,
}) {
  function handleChange() {
    setTimeout(handleSubmit, 0);
  }

  function isChecked(field) {
    return field.checked === undefined ? field.initialValue : field.checked;
  }

  return (
    <form onSubmit={handleSubmit} onChange={handleChange}>
      <Grid>
        <Cell col={12}>
          <Switch {...remindersEnabled} checked={isChecked(remindersEnabled)}>
            Reminders
          </Switch>

          <Switch {...pomodoroEnabled} checked={isChecked(pomodoroEnabled)}>
            Pomodoro timer
          </Switch>

          <Switch {...githubEnabled} checked={isChecked(githubEnabled)}>
            Github integration
          </Switch>
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
  fields: ['remindersEnabled', 'pomodoroEnabled', 'githubEnabled'],
})(SettingsForm);
