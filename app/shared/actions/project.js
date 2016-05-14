export const ADD_PROJECT = 'ADD_PROJECT';


export function addProject(name) {
  return {
    type: ADD_PROJECT,
    payload: {
      name,
    },
    meta: {
      scope: 'main',
    },
  };
}
