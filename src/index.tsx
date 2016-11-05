import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Store} from "redux";
import {IAppState} from "./types";
import {PlainRoute} from 'react-router';
import MainPage from "./pages/MainPage";
import ProductMaingPage from './pages/product/ProductMaingPage';
import PackageMainPage from './pages/package/PackageMainPage';
import {ReduxConfigDev} from '../config/redux/dev';
import {ReduxConfigProd} from '../config/redux/prod';
import RootComponentDev from 'RootComponentDev';

const rootRoute:PlainRoute = {
    path: '/',
    indexRoute: {
        component: PackageMainPage
    },
    childRoutes:[
        {
            path: 'product',
            indexRoute: {
                component:ProductMaingPage
            },
            component: ProductMaingPage
        }
    ],
    component: MainPage
};

const initialState:IAppState = {
    currentPage: {
        notifications: []
    }
};


let store:Store<IAppState> = ReduxConfigDev.configureStore(initialState);
const Root = <RootComponentDev store={store} routes={rootRoute} />;
ReactDOM.render(
    Root,
    document.getElementById("bootstrapContainer")
);