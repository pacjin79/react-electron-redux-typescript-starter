import * as React from "react";
import DevTools from "../config/redux/DevTools";
import {Router, History, PlainRoute} from "react-router";
import {Provider} from "react-redux";
import Store = Redux.Store;
import {IAppState} from "./types";
import {syncHistoryWithStore} from 'react-router-redux';
interface IBaseRootProps{
    store:Store<IAppState>;
    routes: PlainRoute
}

abstract class BaseRootComponent extends React.Component<IBaseRootProps, void> {

    constructor(){
        super();
    }

    //life cycle actions
    componentWillMount(){}
    componentDidMount(){}
    componentDidUpdate(){}

    protected baseRender():React.ReactElement<IBaseRootProps>{
        const history = syncHistoryWithStore(this.getHistory(), this.props.store);
        return(
            <Provider store={this.props.store}>
                <div>
                    <Router history={history} routes={this.props.routes}/>
                    <DevTools />
                </div>
            </Provider>
        );
    }

    abstract render(): React.ReactElement<IBaseRootProps>;
    abstract getHistory():History.History;
}

export default BaseRootComponent;