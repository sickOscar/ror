import React from 'react';
import { SmallCard } from './SmallCard';

export class Neutrals extends React.Component {

    render() {
        return (
            <div className="row">
                <div className="col-sm-12">
                    <h4>Neutrals</h4>
                </div>
                {Object.keys(this.props.G.players).map((playerIndex, i) => {
                    const player = this.props.G.players[playerIndex];

                    if (playerIndex === '0') {
                        return '';
                    }

                    return (
                        <div key={playerIndex} className="col-sm-6">
                            <p>Player: {player.name} <small>faction talents: {player.talents}</small></p>
                            <p>Table Cards</p>
                            <ul>
                                {player.tableCards.map(card => {
                                    return (
                                        <SmallCard {...card} key={card.id}></SmallCard>
                                    )
                                })}
                            </ul>
                            <p>Hand Cards</p>
                            <ul>
                                {player.hand.map(card => {
                                    return (
                                        <SmallCard {...card} key={card.id}></SmallCard>
                                    )
                                })}
                            </ul>
                        </div>
                    )
                })}
                
            </div>
        )
    }

}