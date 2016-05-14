/* eslint-disable no-param-reassign */
import { ADD_PROJECT } from '../actions/project';

const initialState = {
  autoIncrementId: 0,
  projects: []
};

export default function job(state = initialState, action) {
  switch (action.type) {
    case ADD_PROJECT:
      return {
        ...state,
        projects: [
          ...state.projects,
          {
            id: state.autoIncrementId,
            name: action.payload.name,
          },
        ],
        autoIncrementId: state.autoIncrementId + 1,
      };

    default:
      return state;
  }
}
