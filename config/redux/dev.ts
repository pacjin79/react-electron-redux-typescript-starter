import {createStore, applyMiddleware, compose} from "redux";
import * as createLogger from "redux-logger";
import DevTools from "./DevTools";
import {commonMiddleware, getReducers} from "./base";
import {hashHistory} from "react-router";
import {IAppState} from "../../src/types";


export namespace ReduxConfigDev {
    export function configureStore(initialState: IAppState) {
        const middleWare = commonMiddleware(hashHistory);
        middleWare.push(createLogger());
        const store = createStore(
            getReducers(),
            initialState,
            compose(
                applyMiddleware(...middleWare),
                DevTools.instrument()
            )
        );
        return store;
    }
}