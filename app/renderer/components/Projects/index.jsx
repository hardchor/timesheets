import React, { PropTypes } from 'react';
import { Link } from 'react-router';

function Projects({ addProject, project }) {
  function renderProject(data) {
    return (
      <tr key={data.id}>
        <td>{data.id}</td>
        <td>{data.name}</td>
      </tr>
    );
  }

  return (
    <div>
      <Link to="/">back</Link>
      <h1>Projects</h1>

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
  project: PropTypes.object.isRequired
};

export default Projects;
