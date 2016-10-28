import {combineReducers, Reducer } from 'redux';
import {currentPage} from './PageReducer';
import {routerReducer} from 'react-router-redux';
import undo from 'redux-undo';

const undoConfig = {
    limit: 100
}; //undo/redo limit

const r:Reducer<any> = combineReducers({
    currentPage: undo(currentPage, undoConfig),
    routing: routerReducer
});

export {r as reducers};
