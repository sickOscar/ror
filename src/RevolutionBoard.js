import React from 'react';
import { Card } from './Card';

export default class RevolutionBoard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {...props}
    }

    render() {
        return (
            <div>
                <h2>Revolution Board</h2>

                <h3>Hand Cards</h3>
                {this.props.G.players[this.props.ctx.currentPlayer].hand.map(card => (
                    <Card key={card.id} {...card}></Card>
                ))}

                <button onClick={() => this.props.events.endPhase()}>End revolution Phase</button>
            </div>
        )
    }

}