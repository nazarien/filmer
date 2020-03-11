import { combineReducers } from 'redux';
import films from './films';
import focus from './focus';

export default () => combineReducers({ films, focus });
