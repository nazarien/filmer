import { createAction, handleActions } from 'redux-actions';

import { SET_FOCUS, SET_CURRENT_ITEM } from '../types';

// Action creators
export const setFocus = createAction(SET_FOCUS);
export const setCurrentItem = createAction(SET_CURRENT_ITEM);

// Reducer
const defaultState = {
  globalFocus: null,
  initialItem: null,
};

export default handleActions(
  {
    [setFocus]: (state, { payload }) => ({
      ...state,
      globalFocus: payload,
    }),
    [setCurrentItem]: (state, { payload }) => ({
      ...state,
      initialItem: payload,
    }),
  },
  defaultState
);
