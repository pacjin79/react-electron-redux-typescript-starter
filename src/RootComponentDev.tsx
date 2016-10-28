import * as React from "react";
import {hashHistory, History} from "react-router";
import BaseRoot from "./BaseRootComponent";

export class RootDevComponent extends BaseRoot {

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

export default RootDevComponent;