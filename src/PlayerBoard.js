import React from 'react';
import { Card } from './Card';

export default class PlayerBoard extends React.Component {

    // constructor(props) {
    //     super(props);
    // }

    renderPlayerCards() {
        
        // const SELECETD_ACTIVE = this.props.moves.getCardSelected('ACTIVE');
        
        const SELECETD_ACTIVE = this.props.G.interface
            ? this.props.G.interface.selectedCard.active
            : null;
        
        const SELECETD_PASSIVE = this.props.G.interface
            ? this.props.G.interface.selectedCard.passive
            : null;
        
        
        // const CHANGED = quando cambiano i suoi valori / attributi
        
        return (
            <div className="row">
                {this.props.G.players['0'].tableCards.map(card => (
                    <div className="col-sm-4" key={card.id} >
                        <Card {...card}
                            active={SELECETD_ACTIVE && SELECETD_ACTIVE.indexOf(card.id) > -1}
                            passive={SELECETD_PASSIVE && SELECETD_PASSIVE.indexOf(card.id) > -1}
                        ></Card>
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