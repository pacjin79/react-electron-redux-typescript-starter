import * as React from 'react';
import * as _ from 'lodash';
import {
    NavItem, Nav,
    ListGroup, ListGroupItem
} from 'react-bootstrap';
import GeneralHelper from '../../helpers/GeneralHelper';

interface ISideNavBarMenuItemProps {
    label: string;
    routePath: string;
    active?: boolean;
    callback: (routPath: string) => void;
}

interface ISideNavBarHeaderProps {
    label: string;
    active?: boolean;
    menuItems: Array<ISideNavBarMenuItemProps>;
}

interface ISideNavBarProps {
    headerStyle?: "tabs";
    headerItems: Array<ISideNavBarHeaderProps>;
}

interface ISideNavBarState {
    activeHeaderKey: number;
}

class SideNavBar extends React.Component<ISideNavBarProps, ISideNavBarState>{

    constructor(props: ISideNavBarProps) {
        super(props);
        this.state = {
            activeHeaderKey: 0
        };
        this.onHeaderSelect = this.onHeaderSelect.bind(this);
    }

    onHeaderSelect(eventKey: any) {
        const ek = eventKey as number;
        this.state.activeHeaderKey = ek;
        this.setState(this.state);
    }

    render() {
        const sideNavBarHeaderUi: Array<React.ReactNode> = [];
        let sideNavBarItemsUi: Array<React.ReactNode> = [];
        const bsStyle = GeneralHelper.defaultTo<string>(this.props.headerStyle, "tabs");
        _.each(this.props.headerItems, (headerItem: ISideNavBarHeaderProps, index: number) => {
            const active = GeneralHelper.defaultTo<boolean>(headerItem.active, false);
            sideNavBarHeaderUi.push(
                <NavItem key={"navItem-" + index} eventKey={index}>
                    {headerItem.label}
                </NavItem>
            )
            if (this.state.activeHeaderKey === index) {
                sideNavBarItemsUi = this.renderSideBarItemsUiForHeader(headerItem);
            }
        });
        return (
            <div>
                <Nav bsStyle={bsStyle} activeKey={this.state.activeHeaderKey} onSelect={this.onHeaderSelect}>
                    {sideNavBarHeaderUi}
                </Nav>
                <div className="sideContainer">
                    <ListGroup>
                        {sideNavBarItemsUi}
                    </ListGroup>
                </div>
            </div>
        );
    }

    /*
     * Render list items under the the specified headerItem
     */
    renderSideBarItemsUiForHeader(headerItem: ISideNavBarHeaderProps): Array<React.ReactNode> {
        const sideNavBarItemsUi: Array<React.ReactNode> = [];
        const menuItems = headerItem.menuItems;
        _.each(menuItems, (item: ISideNavBarMenuItemProps, index: number) => {
            sideNavBarItemsUi.push(
                <ListGroupItem key={"listGroupItem-" + index} onClick={(e: React.SyntheticEvent<any>) => {
                    e.preventDefault();
                    item.callback(item.routePath);
                } }>
                    {item.label}
                </ListGroupItem>
            )
        });
        return sideNavBarItemsUi;
    }
}

export default SideNavBar;