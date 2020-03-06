import { all } from 'redux-saga/effects';

import films from './films';

export default function* rootSaga() {
  yield all([films()]);
}
