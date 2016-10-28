import * as React from 'react';
import {Panel, Col} from 'react-bootstrap';
import * as _ from 'lodash';

interface IMainPageProps {

}

class MainPage extends React.Component<IMainPageProps, {}> {
    constructor(props: IMainPageProps) {
        super(props)
    }

    render() {
        return (
            <div className="container">
                <Col xs={12}>
                    <Panel header="Electron Reajct Starter Pack">
                        Greetings from pacjin79
                    </Panel>
                </Col>
            </div>
        )
    }
}

export default MainPage;