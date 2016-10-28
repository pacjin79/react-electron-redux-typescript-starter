declare module "redux-undo" {
    import {Reducer} from 'redux';

    interface IReduxUndoConfigProps {
        limit?: number;
        undoType?: any;
        redoType?: any;
        filter?: any;
        jumpToPastType?: any;
        jumpToFutureType?: any;
    }

    function undoable(reducer:Reducer<any>, config?:IReduxUndoConfigProps):Reducer<any>;

    interface IReduxUndoActionCreators {
        undo:()=>void;
        redo:()=>void;
        jumpToFuture: (index:number) => void;
        jumpToPast: (index:number) => void;
    }
    export type ActionCreators = IReduxUndoActionCreators;
    export var ActionCreators:ActionCreators;
    export function includeAction(action:string):any;
    export function excludeAction(action:string):any;
    export default undoable;
}