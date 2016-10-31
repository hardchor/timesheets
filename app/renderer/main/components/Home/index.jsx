import React, { PropTypes } from 'react';
import { Grid, Cell, Button } from 'react-mdl';
import { createAliasedAction } from 'electron-redux';
import pkg from '../../../../package.json';

function Home({
  increment,
  incrementAsync,
  incrementBy,
  incrementMain,
  incrementAsyncMain,
  incrementByAsyncMain,
  counter,
}) {
  return (
    <Grid>
      <Cell col={12}>
        <h2>Timesheets <small>v{pkg.version}</small></h2>
        <p>Count: <strong>{counter.count}</strong></p>
        <Button raised accent ripple onClick={() => increment()}>incr</Button><br />
        <Button raised accent ripple onClick={() => incrementAsync()}>incr async</Button><br />
        <Button raised accent ripple onClick={() => incrementBy(2)}>incr by 2</Button><br />
        <Button raised accent ripple onClick={() => incrementMain()}>incr main process</Button><br />
        <Button raised accent ripple onClick={() => incrementAsyncMain()}>incr async main</Button><br />
        <Button raised accent ripple onClick={() => incrementByAsyncMain(2)}>incr by 2 async main</Button><br />
      </Cell>
    </Grid>
  );
}

Home.propTypes = {
  increment: PropTypes.func.isRequired,
  incrementAsync: PropTypes.func.isRequired,
  incrementBy: PropTypes.func.isRequired,
  incrementAsyncMain: PropTypes.func.isRequired,
  incrementByAsyncMain: PropTypes.func.isRequired,
  counter: PropTypes.object.isRequired,
};

export default Home;
