import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Grid, Cell } from 'react-mdl';
import AddProjectForm from './AddProjectForm';

function Projects({ addProject, removeProject, project, startJob }) {
  function renderProject(data) {
    return (
      <tr key={data.name}>
        <td>{data.name}</td>
        <td><button onClick={() => startJob(data.name)}>Start</button></td>
        <td><button onClick={() => removeProject(data.name)}>Remove</button></td>
      </tr>
    );
  }

  function onSubmit(data) {
    addProject(data.name);
  }

  return (
    <Grid>
      <Cell col={6} tablet={12}>
        <Link to="/">back</Link>
        <h1>Projects</h1>

        <AddProjectForm onSubmit={onSubmit} />

        <table>
          <thead>
            <tr>
              <th>name</th>
              <th>actions</th>
            </tr>
          </thead>
          <tbody>
            {project.projects.map(projectData => renderProject(projectData))}
          </tbody>
        </table>
      </Cell>
    </Grid>
  );
}

Projects.propTypes = {
  addProject: PropTypes.func.isRequired,
  removeProject: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired,
  startJob: PropTypes.func.isRequired,
};

export default Projects;
