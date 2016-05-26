import React from 'react';
import { Grid, Cell } from 'react-mdl';
import pkg from '../../../../package.json';

export default function Home() {
  return (
    <Grid>
      <Cell col={12}>
        <h2>Timesheets <small>v{pkg.version}</small></h2>
      </Cell>
    </Grid>
  );
}
