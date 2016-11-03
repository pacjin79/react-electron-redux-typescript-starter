import * as React from 'react';
import {
    Panel, Col, Row, Button, Modal, ListGroup, ListGroupItem,
    Navbar, Nav, NavItem, Dropdown, MenuItem, Glyphicon
} from 'react-bootstrap';
import * as _ from 'lodash';
import * as Electron from 'electron';
import * as Formsy from 'formsy-react';
import { Input } from 'formsy-react-components';
import '../../static/themes/default/app.less'; //TODO: THIS SHOULD BE DRIVEN BY CONFIG

const remote = Electron.remote;

interface IMainPageProps {
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
                    <NavItem href="#">Product</NavItem>
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

export default MainPage;