import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import counter from './counter';
import list from './image';

const rootReducer = combineReducers({
  counter,
  list,
  router
});

export default rootReducer;
