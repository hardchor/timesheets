import { createAliasedAction } from 'electron-redux';

export const INCREMENT_COUNTER = 'INCREMENT_COUNTER';

export function increment() {
  return {
    type: INCREMENT_COUNTER,
  };
}

export function incrementBy(step) {
  return {
    type: INCREMENT_COUNTER,
    payload: step,
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

export function incrementByAsync(step) {
  return dispatch => {
    setTimeout(() => {
      dispatch(incrementBy(step));
    }, 1000);
  };
}

export const incrementMain = createAliasedAction(
  INCREMENT_COUNTER,
  increment
);

export const incrementAsyncMain = createAliasedAction(
  `${INCREMENT_COUNTER}_MAIN`,
  incrementAsync
);

export const incrementByAsyncMain = createAliasedAction(
  `${INCREMENT_COUNTER}_BY_ASYNC_MAIN`,
  incrementByAsync
);
