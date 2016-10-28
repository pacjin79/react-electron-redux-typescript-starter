import {createStore, applyMiddleware, compose} from "redux";
import {commonMiddleware, getReducers} from "./base";
import {hashHistory} from 'react-router';
import {IAppState} from "../../src/types";

export namespace ReduxConfigProd {
    export function configureStore(initialState: IAppState) {
        const middleWares = commonMiddleware(hashHistory);
        const store = createStore(
            getReducers(),
            initialState,
            compose(
                applyMiddleware(...middleWares)
            )
        );
        return store;
    }
}