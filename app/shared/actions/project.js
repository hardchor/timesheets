export const ADD_PROJECT = 'ADD_PROJECT';
export const REMOVE_PROJECT = 'REMOVE_PROJECT';


export function addProject(name) {
  return {
    type: ADD_PROJECT,
    payload: {
      name,
    },
  };
}

export function removeProject(name) {
  return {
    type: REMOVE_PROJECT,
    payload: name,
  };
}
