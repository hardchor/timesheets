import React, { PropTypes } from 'react';
import { Grid, Cell, DataTable, TableHeader, IconButton, Tooltip } from 'react-mdl';
import AddProjectForm from './AddProjectForm';

function Projects({ addProject, removeProject, project, startJob, navigate }) {
  function onSubmit(data) {
    addProject(data.name);
  }

  function actionFormatter(status, projectData) {
    function handleStartJob() {
      startJob(projectData.name);
      navigate('/jobs');
    }

    return (
      <div>
        <Tooltip label="Start recording">
          <IconButton
            name="fiber_smart_record"
            onClick={() => handleStartJob()}
            raised accent ripple
          />
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
  navigate: PropTypes.func.isRequired,
};

export default Projects;
