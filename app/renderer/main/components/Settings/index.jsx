import React, { PropTypes } from 'react';
import { Grid, Cell } from 'react-mdl';
import SettingsForm from './SettingsForm';

function Settings({ settings, setRemindersEnabled, setPomodoroEnabled, setGithubEnabled }) {
  /* eslint-disable react/prop-types */
  function handleSubmit({
    remindersEnabled,
    pomodoroEnabled,
    githubEnabled,
  }) {
    setRemindersEnabled(remindersEnabled);
    setPomodoroEnabled(pomodoroEnabled);
    setGithubEnabled(githubEnabled);
  }

  return (
    <Grid>
      <Cell col={12}>
        <h1>Settings</h1>
        <SettingsForm settings={settings} onSubmit={handleSubmit} initialValues={settings} />
      </Cell>
    </Grid>
  );
}

Settings.propTypes = {
  settings: PropTypes.object.isRequired,
  setRemindersEnabled: PropTypes.func.isRequired,
  setPomodoroEnabled: PropTypes.func.isRequired,
  setGithubEnabled: PropTypes.func.isRequired,
};

export default Settings;
