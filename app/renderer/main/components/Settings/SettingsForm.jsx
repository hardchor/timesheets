import React, { PropTypes } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Grid, Cell } from 'react-mdl';
import adapter, { TOGGLE, TIME, CHECKBOXES } from '../../../shared/forms/adapter';

// TODO: pre-populate, handle settings as one big object rather than individual settings
function SettingsForm({ handleSubmit, settings }) {
  function handleChange() {
    setTimeout(handleSubmit, 0);
  }

  const weekdayOptions = [
    { value: 1, label: 'Monday' },
    { value: 2, label: 'Tuesday' },
    { value: 3, label: 'Wednesday' },
    { value: 4, label: 'Thursday' },
    { value: 5, label: 'Friday' },
    { value: 6, label: 'Saturday' },
    { value: 7, label: 'Sunday' },
  ];

  return (
    <form onSubmit={handleSubmit} onChange={handleChange}>
      <Grid>
        <Cell col={12}>
          <Field
            name="remindersEnabled"
            type="checkbox"
            label="Reminders"
            component={TOGGLE}
          />
          {settings.remindersEnabled &&
            <Grid>
              <Cell col={12}>
                <span>When would you like to be reminded?</span>
              </Cell>
              <Cell col={3}>
                <Field
                  name="remindersFromTime"
                  label="From"
                  component={TIME}
                />
              </Cell>
              <Cell col={3}>
                <Field
                  name="remindersToTime"
                  label="To"
                  component={TIME}
                />
              </Cell>
              <Cell col={6}>
                <Field
                  name="remindersWeekdays"
                  label="Weekdays"
                  component={CHECKBOXES}
                  options={weekdayOptions}
                />
              </Cell>
            </Grid>
          }
          {/*
          <Field
            name="pomodoroEnabled"
            type="checkbox"
            label="Pomodoro timer"
            component={TOGGLE}
          />
          */}
          <Field
            name="githubEnabled"
            type="checkbox"
            label="Github integration"
            component={TOGGLE}
          />
        </Cell>
      </Grid>
    </form>
  );
}

SettingsForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  settings: PropTypes.object.isRequired,
};

export default reduxForm({
  form: 'settingsForm',
  adapter,
})(SettingsForm);
