/* eslint-disable no-param-reassign */
import { ADD_PROJECT, REMOVE_PROJECT } from '../actions/project';
import { IMPORT_GITHUB_PROJECTS } from '../actions/github';
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
      let newState = { ...state };
      // go through each body, finding "Tracks #..."
      action.payload.forEach(issue => {
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

    default:
      return state;
  }
}
