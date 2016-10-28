import * as React from 'react';
import '../static/themes/default/app.less';

class Main extends React.Component<{}, void> {

    constructor(props:{}){
        super(props);
    }

    render(){
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}

export default Main;