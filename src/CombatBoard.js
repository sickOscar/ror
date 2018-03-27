import React from 'react';

export default class CombatBoard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {...props}
    }

    render() {
        return (
            <div>
                <h2>Combat Phase</h2>
                <span>{this.props.G.militaryPlan ? JSON.stringify(this.props.G.militaryPlan) : ' No military plan done'}</span>
                <button onClick={() => this.props.events.endPhase()}>End Combat Phase</button>
            </div>
        )
    }

}