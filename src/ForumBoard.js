import React from 'react';
import { Random } from 'boardgame.io/core';
import { EventCard, EventModel } from './Event'

export default class ForumBoard extends React.Component {

    constructor(props) {
        super(props);
        // console.log(props.G );

        this.state = {
            rolledInitiative: null,
            rolledEventTable: null
        }

        this.rollInitiative = this.rollInitiative.bind(this);
        this.rollForEventTable = this.rollForEventTable.bind(this);
    }

    rollInitiative() {
        const rolls = Random.Die(6, 2);
        const rolled = rolls.reduce((sum,n) => sum + n, 0)
        this.setState({
            rolledInitiative: rolled
        })
    };

    rollForEventTable() {
        const rolls = Random.Die(6, 3);
        const rolled = rolls.reduce((sum,n) => sum + n, 0)
        this.setState({
            rolledEventTable: rolled
        })
        this.props.moves.drawEvent(8);
    }

    render() {
        return (
            <div className="row">
                <div className="col-sm-6">
                    <h4>Forum Board</h4>
                    <RollInitiativeButtonContainer 
                        {...this.state} 
                        onButtonClick={this.rollInitiative}
                        >
                    </RollInitiativeButtonContainer>
                    <RollForEventTableButtonContainer 
                        {...this.state}
                        onButtonClick={this.rollForEventTable}
                        >
                    </RollForEventTableButtonContainer>
                </div>
                <div className="col-sm-6">
                    {this.props.G.forum.events.map(event => (
                        <EventCard {...event}></EventCard>
                    ))}
                </div>
            </div>
        )
    }
}

const RollInitiativeButtonContainer = (props) => {
    
    const rollInitiativeButton = !props.rolledInitiative
        ? <button onClick={props.onButtonClick}>Roll Initiative</button>    
        : '';

    return (
        <div>
            {rollInitiativeButton}
            <span>Rolled Initiative: {props.rolledInitiative}</span>
        </div>
    )

}

const RollForEventTableButtonContainer = (props) => {
    const rollForEventTableButton = props.rolledInitiative === 7 && !props.rolledEventTable 
        ? <button onClick={props.onButtonClick}>Roll for Event Table</button>    
        : '';
    const eventTablePickResult = props.rolledEventTable
        ? <span>Event Table Pick: {props.rolledEventTable}</span>
        : '';

    return (
        <div>
            {rollForEventTableButton}
            {eventTablePickResult}
        </div>
    )
}
    