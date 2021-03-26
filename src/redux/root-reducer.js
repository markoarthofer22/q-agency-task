import { combineReducers } from 'redux';
import globalsReducer from './globals/globals.reducer';

export default combineReducers({
    globals: globalsReducer,
});
