export const INCREMENT_COUNTER = 'INCREMENT_COUNTER';

export function increment() {
  return {
    type: INCREMENT_COUNTER,
  };
}

export function incrementAsync() {
  return dispatch => {
    setTimeout(() => {
      // Yay! Can invoke sync or async actions with `dispatch`
      dispatch(increment());
    }, 1000);
  };
}

// TODO: aliased increment
// TODO: aliased increment async
// TODO: aliased increment async with args
