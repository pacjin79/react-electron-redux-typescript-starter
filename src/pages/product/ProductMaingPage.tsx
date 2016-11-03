import * as React from 'react';
import * as _ from 'lodash';
import {
    Nav, NavItem,
    ListGroup, ListGroupItem,
    Row, Col
} from 'react-bootstrap';
import SideNavBar from '../../sharedComponents/SideNavBar/SideNavBar';

interface IProductMainPageProps {

}

class ProductMainPage extends React.Component<IProductMainPageProps, void> {

    constructor(props: IProductMainPageProps) {
        super(props);
        this.onSideMenuClick = this.onSideMenuClick.bind(this);
    }

    render() {
        return (
            <Row>
                <Col sm={3}>
                    {this.renderSideNavBar()}
                </Col>
                <Col sm={9}>
                    <h1>Product</h1>
                </Col>
            </Row>
        );
    }

    onSideMenuClick(routePath:string) {
        console.log("clicked from "+routePath);
    }

    renderSideNavBar() {
        const sideNavBarProps = {
            headerItems: [
                {
                    label: "Onboarding",
                    menuItems: [
                        {
                            label: "Submit Design",
                            routePath: "/sd",
                            callback: this.onSideMenuClick
                        }
                    ]
                }, 
                {
                    label: "States",
                    menuItems: [
                        {
                            label: "Issue",
                            routePath: "/issue",
                            callback: this.onSideMenuClick
                        },
                         {
                            label: "Endorse",
                            routePath: "/endorse",
                            callback: this.onSideMenuClick
                        }
                    ]
                }
            ]
        };
        return <SideNavBar {...sideNavBarProps} />
    }
}

export default ProductMainPage;