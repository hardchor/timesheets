import React, { PropTypes } from 'react';
import { Button } from 'react-mdl';

function GithubAuth({
  requestAuthenticateGithub,
  title,
  permissionsRequired,
}) {
  return (
    <div>
      <p>{title}</p>
      {permissionsRequired &&
        <pre>{permissionsRequired}</pre>
      }
      <Button onClick={requestAuthenticateGithub} raised accent ripple>Connect</Button>
    </div>
  );
}

GithubAuth.propTypes = {
  requestAuthenticateGithub: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  permissionsRequired: PropTypes.object,
};

export default GithubAuth;
