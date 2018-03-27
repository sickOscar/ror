import React from 'react';

export default class RevolutionBoard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {...props}
    }

    render() {
        return (
            <div>
                <h2>Revolution Board</h2>
                <button onClick={() => this.props.events.endPhase()}>End revolution Phase</button>
            </div>
        )
    }

}