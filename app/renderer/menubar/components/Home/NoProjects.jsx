import React from 'react';
import { List, ListItem, ListItemContent } from 'react-mdl';
import style from './activeJob.css';

function NoProjects() {
  return (
    <div>
      <List className={style.list}>
        <ListItem twoLine>
          <ListItemContent subtitle="Create a new project to get started">
            No projects yet
          </ListItemContent>
        </ListItem>
      </List>
    </div>
  );
}

export default NoProjects;
