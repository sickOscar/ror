import React from 'react';
import { Card } from './Card';

export default class PlayerBoard extends React.Component {

    // constructor(props) {
    //     super(props);
    // }

    renderPlayerCards() {
        return (
            <div className="row">
                {this.props.G.players['0'].tableCards.map(card => (
                    <div className="col-sm-4" key={card.id}>
                        <Card {...card}></Card>
                    </div>
                ))}
            </div>
        )
    }

    render() {
        return (
            <div>
                <h2>Player Board</h2>
                <div className="row">
                    <div className="col-sm-6">
                        <p>Family treasure: {this.props.G.players['0'].talents}</p>
                    </div>
                </div>
                {this.renderPlayerCards()}
            </div>
        )
    }
}