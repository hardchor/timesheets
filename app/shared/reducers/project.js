/* eslint-disable no-param-reassign */
import { ADD_PROJECT, REMOVE_PROJECT } from '../actions/project';
import { START_JOB } from '../actions/job';
import { IMPORT_GITHUB_PROJECTS, GET_GITHUB_ISSUES_ASSIGNED_TO_USER } from '../actions/github';
import getProjectIdentifiers from '../helpers/getProjectIdentifiers';

const initialState = {
  projects: [],
};

function addProject(name, state, data = {}) {
  const found = state.projects.reduce(
    (previous, current) => (name === current.name ? true : previous),
    false
  );

  // don't insert duplicates
  if (found) return state;

  return {
    ...state,
    projects: [
      ...state.projects,
      {
        name,
        ...data,
      },
    ],
  };
}

function updateProject(name, state, data = {}) {
  const projects = state.projects.map(project => {
    if (project.name === name) {
      // only update lastActivity when more recent
      if (data.lastActivityAt && data.lastActivityAt <= project.lastActivityAt) {
        delete data.lastActivityAt;
      }

      return {
        ...project,
        name,
        ...data,
      };
    }
    return project;
  });

  return {
    ...state,
    projects,
  };
}


export default function job(state = initialState, action) {
  switch (action.type) {
    case ADD_PROJECT: {
      const { name } = action.payload;

      return addProject(name, state);
    }

    case REMOVE_PROJECT: {
      const projects = state.projects.filter(({ name }) => name !== action.payload);

      return {
        ...state,
        projects,
      };
    }

    case IMPORT_GITHUB_PROJECTS: {
      if (action.error) {
        return {
          ...state,
          importError: true,
        };
      }

      const issues = action.payload || [];
      let newState = {
        ...state,
        importError: false,
      };
      // go through each body, finding "Tracks #..."
      issues.forEach(issue => {
        const identifiers = [
          // for issues
          ...getProjectIdentifiers(issue.body),
          // for milestones
          ...getProjectIdentifiers(issue.description),
        ];
        identifiers.forEach(identifier => {
          newState = addProject(identifier, newState);
        });
      });

      return newState;
    }

    case GET_GITHUB_ISSUES_ASSIGNED_TO_USER: {
      if (action.error) {
        return {
          ...state,
          importError: true,
        };
      }

      const issues = action.payload || [];
      let newState = { ...state };

      // extract projects, add updatedAt to project
      issues.forEach(issue => {
        const identifiers = [
          // for issues
          ...getProjectIdentifiers(issue.body),
          // for milestones
          ...getProjectIdentifiers(issue.milestone && issue.milestone.description),
        ];

        identifiers.forEach(identifier => {
          newState = updateProject(identifier, newState, { lastActivityAt: issue.updated_at });
        });
      });

      return newState;
    }

    case START_JOB:
      return updateProject(action.payload.projectName, state, { lastActivityAt: new Date() });

    default:
      return state;
  }
}
