import React, { PropTypes } from 'react';
import { Grid, Cell } from 'react-mdl';

function Settings({ settings }) {
  return (
    <Grid>
      <Cell col={12}>
        <h1>Settings</h1>
      </Cell>
    </Grid>
  );
}

Settings.propTypes = {
  settings: PropTypes.object.isRequired,
};

export default Settings;
