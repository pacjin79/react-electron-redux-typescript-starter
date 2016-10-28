import * as React from 'react';
import * as _ from 'lodash';

interface IMainPageProps {

}

class MainPage extends React.Component<IMainPageProps, {}> {
    constructor(props:IMainPageProps){
        super(props)
    }

    render(){
        return (
            <h1>Main Page</h1>
        )
    }
}

export default MainPage;