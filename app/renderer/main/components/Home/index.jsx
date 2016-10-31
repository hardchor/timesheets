import React, { PropTypes } from 'react';
import { Grid, Cell, Button } from 'react-mdl';
import pkg from '../../../../package.json';

function Home({ increment, incrementAsync, counter }) {
  return (
    <Grid>
      <Cell col={12}>
        <h2>Timesheets <small>v{pkg.version}</small></h2>
        <p>Count: <strong>{counter.count}</strong></p>
        <Button raised accent ripple onClick={() => increment()}>increment</Button>
        <Button raised accent ripple onClick={() => incrementAsync()}>incrementAsync</Button>
      </Cell>
    </Grid>
  );
}

Home.propTypes = {
  increment: PropTypes.func.isRequired,
  counter: PropTypes.object.isRequired,
};

export default Home;
