import React, { PropTypes } from 'react';
import { Grid, Cell, DataTable, TableHeader, IconButton, Tooltip } from 'react-mdl';
import AddProjectForm from './AddProjectForm';
import styles from './projects.css';

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
            onClick={() => handleStartJob()}
            name="fiber_manual_record"
            className={styles.actionButton}
            raised accent ripple
          />
        </Tooltip>
        <Tooltip label="Remove project">
          <IconButton
            onClick={() => removeProject(projectData.name)}
            name="delete"
            className={styles.actionButton}
            raised ripple
          />
        </Tooltip>
      </div>
    );
  }

  return (
    <Grid>
      <Cell col={12}>
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
