import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import AddProjectForm from './AddProjectForm';

function Projects({ addProject, project }) {
  function renderProject(data) {
    return (
      <tr key={data.id}>
        <td>{data.id}</td>
        <td>{data.name}</td>
      </tr>
    );
  }

  function onSubmit(data) {
    addProject(data.name);
  }

  return (
    <div>
      <Link to="/">back</Link>
      <h1>Projects</h1>

      <AddProjectForm onSubmit={onSubmit} />

      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          {project.projects.map(projectData => renderProject(projectData))}
        </tbody>
      </table>
    </div>
  );
}

Projects.propTypes = {
  addProject: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired,
};

export default Projects;
