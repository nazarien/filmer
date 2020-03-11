import { createAction, handleActions } from 'redux-actions';

import { FILMS_REQUEST, FILMS_SUCCESS, FILMS_FAILURE } from '../types';

// Action creators
export const filmsRequest = createAction(FILMS_REQUEST);
export const filmsSuccess = createAction(FILMS_SUCCESS);
export const filmsFailure = createAction(FILMS_FAILURE);

// Reducer
const defaultState = {
  data: [],
  isLoading: false,
  isSuccess: false,
  isFailure: false,
};

export default handleActions(
  {
    [filmsRequest]: state => ({
      ...state,
      isLoading: true,
      isSuccess: false,
      isFailure: false,
    }),
    [filmsSuccess]: (state, { payload }) => ({
      ...state,
      data: payload,
      isLoading: false,
      isSuccess: true,
      isFailure: false,
    }),
    [filmsFailure]: state => ({
      ...state,
      isLoading: false,
      isSuccess: false,
      isFailure: true,
    }),
  },
  defaultState
);
