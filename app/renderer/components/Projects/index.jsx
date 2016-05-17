import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Grid, Cell, DataTable, TableHeader, Button, Icon, IconButton, Tooltip } from 'react-mdl';
import AddProjectForm from './AddProjectForm';

function Projects({ addProject, removeProject, project, startJob }) {
  function onSubmit(data) {
    addProject(data.name);
  }

  function actionFormatter(status, projectData) {
    return (
      <div>
        <Tooltip label="Start recording">
          <IconButton name="fiber_smart_record" raised ripple onClick={() => startJob(projectData.name)} />
        </Tooltip>
        <Tooltip label="Remove project">
          <IconButton name="delete" raised ripple onClick={() => removeProject(projectData.name)} />
        </Tooltip>
      </div>
    );
  }

  return (
    <Grid>
      <Cell col={6} tablet={12}>
        <h1>Projects</h1>

        <AddProjectForm onSubmit={onSubmit} />

        <DataTable
          shadow={0}
          rows={project.projects}
          rowKeyColumn="name"
        >
          <TableHeader name="name">Name</TableHeader>
          <TableHeader name="action" cellFormatter={actionFormatter} />
        </DataTable>

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
