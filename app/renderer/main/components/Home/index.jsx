import React, { PropTypes } from 'react';
import { Grid, Cell, Button } from 'react-mdl';
import pkg from '../../../../package.json';

function Home({
  increment,
  incrementAsync,
  incrementBy,
  incrementMain,
  incrementAsyncMain,
  incrementByAsyncMain,
  incrementPromise,
  incrementPromiseMain,
  incrementPromiseLocal,
  counter,
}) {
  return (
    <Grid>
      <Cell col={12}>
        <h2>Timesheets <small>v{pkg.version}</small></h2>
        <p>Count: <strong>{counter.loading ? 'Loading...' : counter.count}</strong></p>
        <h3>redux-thunk</h3>
        <Button raised accent ripple onClick={() => increment()}>incr</Button><br />
        <Button raised accent ripple onClick={() => incrementAsync()}>incr async</Button><br />
        <Button raised accent ripple onClick={() => incrementBy(2)}>incr by 2</Button><br />
        <Button raised accent ripple onClick={() => incrementMain()}>incr main process</Button><br />
        <Button raised accent ripple onClick={() => incrementAsyncMain()}>incr async main</Button><br />
        <Button raised accent ripple onClick={() => incrementByAsyncMain(2)}>incr by 2 async main</Button><br />
        <h3>redux-promise-middleware</h3>
        <Button raised accent ripple onClick={() => incrementPromise()}>incr promise</Button><br />
        <Button raised accent ripple onClick={() => incrementPromiseMain()}>incr promise main</Button><br />
        <Button raised accent ripple onClick={() => incrementPromiseLocal()}>incr promise local</Button><br />
      </Cell>
    </Grid>
  );
}

Home.propTypes = {
  increment: PropTypes.func.isRequired,
  incrementAsync: PropTypes.func.isRequired,
  incrementBy: PropTypes.func.isRequired,
  incrementMain: PropTypes.func.isRequired,
  incrementAsyncMain: PropTypes.func.isRequired,
  incrementByAsyncMain: PropTypes.func.isRequired,
  incrementPromise: PropTypes.func.isRequired,
  incrementPromiseMain: PropTypes.func.isRequired,
  incrementPromiseLocal: PropTypes.func.isRequired,
  counter: PropTypes.object.isRequired,
};

export default Home;
