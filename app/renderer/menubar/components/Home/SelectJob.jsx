import React, { PropTypes } from 'react';
import {
  Cell,
  Button,
  List,
  ListItem,
  ListItemContent,
  ListItemAction,
  Card,
  CardTitle,
  CardActions,
} from 'react-mdl';
import style from './selectJob.css';

function SelectJob({ project, startJob, settings, setRemindersEnabled }) {
  function renderItem(projectData) {
    const [projectCode = '', projectName] = (projectData.name && projectData.name.split('#')) || [];

    return (
      <ListItem key={projectData.name} twoLine={!!(projectCode && projectName)}>
        <ListItemContent avatar="work" subtitle={projectCode && projectName}>
          {projectCode || projectName}
        </ListItemContent>
        <ListItemAction>
          <Button onClick={() => startJob(projectData.name)} raised accent ripple>Start</Button>
        </ListItemAction>
      </ListItem>
    );
  }

  return (
    <Cell col={12}>
      <Card className={style.card}>
        <CardTitle expand className={style.cardTitle}>
          <h5>What are you working on?</h5>
        </CardTitle>
        <CardActions border>
          <Button onClick={() => setRemindersEnabled(!settings.remindersEnabled)}>
            Turn reminders {settings.remindersEnabled ? 'off' : 'on'}
          </Button>
        </CardActions>
      </Card>
      <List className={style.list}>
        {project.projects.map(renderItem)}
        {renderItem({ name: 'Unassigned' })}
      </List>
    </Cell>
  );
}

SelectJob.propTypes = {
  project: PropTypes.object.isRequired,
  startJob: PropTypes.func.isRequired,
  settings: PropTypes.object.isRequired,
  setRemindersEnabled: PropTypes.func.isRequired,
};

export default SelectJob;
