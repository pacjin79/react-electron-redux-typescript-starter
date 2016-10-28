import {Action, handleActions} from 'redux-actions';
import immutable from 'immutable';
import {PAGE_ACTIONS_CONST}from '../actions/PageActions';

export const currentPage = handleActions({
    [PAGE_ACTIONS_CONST.ADD_NOTIFICATION]: (state: any, action: Action<any>):any => {
        return state;
    }
});