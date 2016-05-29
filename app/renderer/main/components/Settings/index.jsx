import React, { PropTypes } from 'react';
import { Grid, Cell } from 'react-mdl';
import SettingsForm from './SettingsForm';

function Settings({ settings, setPomodoroEnabled, setGithubEnabled }) {
  /* eslint-disable react/prop-types */
  function handleSubmit({
    pomodoroEnabled,
    githubEnabled,
   }) {
    setPomodoroEnabled(pomodoroEnabled);
    setGithubEnabled(githubEnabled);
  }

  return (
    <Grid>
      <Cell col={12}>
        <h1>Settings</h1>
        <SettingsForm settings={settings} onSubmit={handleSubmit} />
      </Cell>
    </Grid>
  );
}

Settings.propTypes = {
  settings: PropTypes.object.isRequired,
  setPomodoroEnabled: PropTypes.func.isRequired,
};

export default Settings;
