import { combineReducers } from 'redux';
import auth from './authReducer';
import location from './locationReducer';

const rootReducer = combineReducers({
    auth,
    location
});

export default rootReducer;