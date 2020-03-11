import { takeLatest, put, call } from 'redux-saga/effects';
import axios from '../../services/axiosInterceptors';

import { films } from '../../constants/urls';
import { filmsSuccess, filmsFailure } from '../ducks/films';

import { FILMS_REQUEST } from '../types';

const getFilms = () => {
  return axios({
    method: 'GET',
    url: films,
  });
};

function* worker() {
  try {
    const response = yield call(getFilms);
    yield put(filmsSuccess(response.data.results));
  } catch (errors) {
    yield put(filmsFailure());
  }
}

export default function* watcher() {
  yield takeLatest(FILMS_REQUEST, worker);
}
