import React, { PropTypes } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Grid, Cell, Switch } from 'react-mdl';

// TODO: pre-populate, handle settings as one big object rather than individual settings
function renderToggle(name) {
  return props => (
    <Switch {...props}>
      {name}
    </Switch>
  );
}

function SettingsForm({ handleSubmit }) {
  function handleChange() {
    setTimeout(handleSubmit, 0);
  }

  return (
    <form onSubmit={handleSubmit} onChange={handleChange}>
      <Grid>
        <Cell col={12}>
          {/*
          <Field
            name="remindersEnabled"
            type="checkbox"
            component={renderToggle('Reminders')}
          />
          <Field
            name="pomodoroEnabled"
            type="checkbox"
            component={renderToggle('Pomodoro timer')}
          />
          */}
          <Field
            name="githubEnabled"
            type="checkbox"
            component={renderToggle('Github integration')}
          />
        </Cell>
      </Grid>
    </form>
  );
}

SettingsForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'settingsForm',
})(SettingsForm);
