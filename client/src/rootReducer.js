import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import credential from './reducer/credential';
import schedule from './reducer/schedule';

export default combineReducers({
  router: routerReducer,
  credential,
  schedule
});
