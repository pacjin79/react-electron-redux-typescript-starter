import * as React from 'react';
import * as _ from 'lodash';
import {
    Col, Button
} from 'react-bootstrap';

interface IPackageMaingPageProps {

}

class PackageMainPage extends React.Component<IPackageMaingPageProps, void> {
    constructor(props:IPackageMaingPageProps){
        super(props);
    }

    render(){
        return (
            <h1>I'm package main page </h1>
        )
    }
}

export default PackageMainPage;