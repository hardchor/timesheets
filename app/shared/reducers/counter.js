/* eslint-disable no-param-reassign */
import { INCREMENT_COUNTER } from '../actions/counter';

const initialState = {
  count: 0,
  loading: false,
};

export default function counter(state = initialState, action) {
  switch (action.type) {
    case `${INCREMENT_COUNTER}_PENDING`: {
      return {
        ...state,
        loading: true,
      };
    }
    case `${INCREMENT_COUNTER}_FULFILLED`:
    case INCREMENT_COUNTER: {
      const step = action.payload || 1;
      return {
        ...state,
        loading: false,
        count: parseInt(state.count + step, 10) || initialState.count,
      };
    }

    default:
      return state;
  }
}
