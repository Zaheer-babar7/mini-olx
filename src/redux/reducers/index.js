import { combineReducers } from 'redux';
import { getDataReducer, getDataForAdminReducer } from '../reducers/productDataReducer'

const rootReducers = combineReducers({
    getDataReducer,
    getDataForAdminReducer,
});

export default rootReducers;
