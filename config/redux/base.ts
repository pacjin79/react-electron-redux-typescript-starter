import thunk from "redux-thunk";
import {Middleware, Reducer} from "redux";
import {routerMiddleware} from "react-router-redux";
import {History} from "react-router";
import {reducers} from "../../src/reducers";

export function commonMiddleware(history:History.History):Array<Middleware>{
    return [
        thunk,
        routerMiddleware(history)
    ];
}

export function getReducers(): Reducer <any>{
    return reducers;
}