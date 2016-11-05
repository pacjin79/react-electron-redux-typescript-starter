import * as React from 'react';
import {
    Panel, Col, Row, Button, Modal, ListGroup, ListGroupItem,
    Navbar, Nav, NavItem, Dropdown, MenuItem, Glyphicon
} from 'react-bootstrap';
import * as _ from 'lodash';
import * as Electron from 'electron';
import * as Formsy from 'formsy-react';
import { Link } from 'react-router';
import { Input } from 'formsy-react-components';
import { connect, ComponentDecorator, Dispatch } from 'react-redux';
import { push } from 'react-router-redux';
import '../../static/themes/default/less/app.less'; //TODO: THIS SHOULD BE DRIVEN BY CONFIG
const remote = Electron.remote;

interface IMainPageProps {
    navigate: (path: string) => void;
}

interface IMainPageState {
    showModal: boolean;
    modalContent: string[];
}

class MainPage extends React.Component<IMainPageProps, IMainPageState> {
    constructor(props: IMainPageProps) {
        super(props)
        this.state = {
            showModal: false,
            modalContent: []
        };
        this.onClick = this.onClick.bind(this);
        this.onHide = this.onHide.bind(this);
        this.onSideMenuClick = this.onSideMenuClick.bind(this);
        this.onNavItemSelect = this.onNavItemSelect.bind(this);
    }

    onNavItemSelect(path: any) {
        //this.props.navigate(key);
        if (typeof path === 'string') {
            console.log(`clicked and key = ${path}`);
            this.props.navigate(path);
        } else {
            // console.error("path must be a string");
            throw new Error("path must be string");
        }
    }

    onClick(e: React.SyntheticEvent<any>) {
        e.preventDefault();
        const form = this.refs['form'] as Formsy.IFormsyInstance;
        const currentValues = form.getCurrentValues();
        console.log('current val = ', currentValues);
        const ioUtils = remote.require('./local/IOUtils');
        ioUtils.getFileNamesFromDirectory(currentValues.path).then((fileNames: string[]) => {
            this.setState({
                showModal: true,
                modalContent: fileNames
            })
        });
    }

    onSideMenuClick(e: React.SyntheticEvent<any>) {
        e.preventDefault();
    }

    onHide() {
        this.state.showModal = false;
        this.setState(this.state);
    }

    render() {
        return (
            <div id="wrapper">
                <div>
                    {this.renderTopNavBar()}
                </div>
                <div className="pageWrapper">
                    <div className="container-fluid">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }

    renderTopNavBar() {

        const dropdownProps = {
            id: "settings-dropdown",
            componentClass: "li"
        };

        return (
            <Navbar fluid={true}
                fixedTop={true}
                bsStyle="inverse"
                className="navigation-clean">
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href='#'>Opsie Design Studio</a>
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav pullRight>
                    <NavItem eventKey={"/"} onSelect={this.onNavItemSelect}>Packages</NavItem>                
                    <NavItem eventKey={"/product"} onSelect={this.onNavItemSelect}>Product</NavItem>
                    <NavItem href="#">Flow</NavItem>
                    <NavItem href="#">Component</NavItem>
                    <Dropdown {...dropdownProps}>
                        <Dropdown.Toggle useAnchor>
                            <Glyphicon glyph="cog" style={{ marginRight: "5px" }} />
                            Settings
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <MenuItem>Action</MenuItem>
                        </Dropdown.Menu>
                    </Dropdown>
                </Nav>
            </Navbar>
        );
    }

    renderModalBody(content: string[]) {
        const contentUi: Array<React.ReactNode> = [];
        _.each(content, (fileName) => {
            contentUi.push(
                <li key={_.snakeCase(fileName)}>{fileName}</li>
            );
        });

        return (
            <ul>
                {contentUi}
            </ul>
        )
    }
}

const mapStateToProps = (state: any, ownProps: any) => {
    return {
    };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        navigate: (path: string) => {
            dispatch(push(path));
        }
    }
}

export default connect(
    null,
    mapDispatchToProps
)(MainPage);

