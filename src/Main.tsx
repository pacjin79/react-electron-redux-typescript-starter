import * as React from 'react';


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