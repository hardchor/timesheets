import React, { PropTypes } from 'react';
import { Link } from 'react-router';

function Github({ requestAuthenticateGithub, github }) {
  return (
    <div>
      <Link to="/">back</Link>
      <h1>Github</h1>
      <button onClick={requestAuthenticateGithub}>Connect</button>
    </div>
  );
}

Github.propTypes = {
  requestAuthenticateGithub: PropTypes.func.isRequired,
  github: PropTypes.object.isRequired,
};

export default Github;
