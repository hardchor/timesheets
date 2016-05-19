import React, { PropTypes } from 'react';
import { Button, List, ListItem, ListItemContent, ListItemAction } from 'react-mdl';
import style from './selectJob.css';

function SelectJob({ project, startJob }) {
  function renderItem(projectData) {
    return (
      <ListItem key={projectData.name}>
        <ListItemContent avatar="group_work">
          {projectData.name}
        </ListItemContent>
        <ListItemAction>
          <Button onClick={() => startJob(projectData.name)} raised accent ripple>Start</Button>
        </ListItemAction>
      </ListItem>
    );
  }

  return (
    <div>
      <List className={style.list}>
        {project.projects.map(renderItem)}
      </List>
    </div>
  );
}

SelectJob.propTypes = {
  project: PropTypes.object,
  startJob: PropTypes.func.isRequired,
};

export default SelectJob;
