import * as React from 'react';
import { Panel, Col, Button, Modal } from 'react-bootstrap';
import * as _ from 'lodash';
import * as Electron from 'electron';
import * as Formsy from 'formsy-react';
import { Input } from 'formsy-react-components';

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
    }

    onClick(e: React.SyntheticEvent<any>) {
        e.preventDefault();
        const form = this.refs['form'] as Formsy.IFormsyInstance;
        const currentValues = form.getCurrentValues();
        console.log('current val = ',currentValues);
        const ioUtils = remote.require('./local/IOUtils');
        ioUtils.getFileNamesFromDirectory(currentValues.path).then((fileNames: string[]) => {
            this.setState({
                showModal: true,
                modalContent: fileNames
            })
        });
    }

    onHide() {
        this.state.showModal = false;
        this.setState(this.state);
    }

    render() {
        return (
            <div className="container">
                <Col xs={12}>
                    <Panel header="Electron Reajct Starter Pack">
                        Greetings from pacjin79!!!!
                        <Formsy.Form ref="form">
                            <Input layout="vertical"
                                   disabled={false} name="path" 
                                   label="Enter Directory Path"
                                   type="text" />
                            <Button onClick={this.onClick}>Click Me!</Button>
                        </Formsy.Form>
                    </Panel>
                    <Modal onHide={this.onHide} show={this.state.showModal}>
                        <Modal.Header closeButton>
                            <Modal.Title id="modal-title">Files </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {this.renderModalBody(this.state.modalContent)}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.onHide}>Close</Button>
                        </Modal.Footer>
                    </Modal>
                </Col>
            </div>
        )
    }

    renderModalBody(content:string[]){
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