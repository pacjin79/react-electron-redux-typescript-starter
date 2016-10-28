import * as React from "react";
import {hashHistory, History} from "react-router";
import BaseRoot from "./BaseRootComponent";
import Store = Redux.Store;

export class RootProdComponent extends BaseRoot {

    constructor() {
        super();
    }

    getHistory():History.History {
        return hashHistory;
    }

    render() {
        return super.baseRender();
    }
}

export default RootProdComponent;