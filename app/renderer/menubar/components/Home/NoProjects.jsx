import React from 'react';
import { List, ListItem, ListItemContent } from 'react-mdl';
import style from './activeJob.css';

function NoProjects() {
  return (
    <div>
      <List className={style.list}>
        <ListItem>
          <ListItemContent>
            <strong>No projects yet</strong><br />
            Create a new project to get started<br />
          </ListItemContent>
        </ListItem>
      </List>
    </div>
  );
}

export default NoProjects;
