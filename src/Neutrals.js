import React from 'react';
import { SmallCard } from './SmallCard';
import './stylesheets/common.css'

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
                    
                    
                    let tableCardsContainer = player.tableCards && player.tableCards.length > 0 ? 
                        <div className="tableCardsContainer" >
                            <h6 className="align-center">Table Cards</h6>
                            <table className="tableCards">
                                <tbody>
                                <tr>
                                    <th>ID</th>
                                    <th>Type</th>
                                    <th>Name</th>
                                    <th>Talents</th>
                                    <th>Popularity</th>
                                    <th>Influence</th>
                                    <th>Military</th>
                                    <th>Oratory</th>
                                    <th>Loyalty</th>
                                </tr>
                                {player.tableCards.map(card => {
                                    return (
                                        <SmallCard {...card} key={card.id} highlights={this.props.G.mortalityChits}></SmallCard>
                                    )
                                })}
                                </tbody>
                            </table>
                        </div> :
                        <div></div>;
                                            
                    let handCardsContainer = player.hand && player.hand.length > 0 ? 
                        <div className="handCardsContainer">
                            <h6 className="align-center">Hand Cards</h6>
                            {player.hand.map(card => {
                                return (
                                    <SmallCard {...card} key={card.id}></SmallCard>
                                )
                            })}
                        </div> :
                        <div></div>;
                    
                    return (
                        <div style={{border: "2px solid blue", margin: "0 10px 10px 10px"}} key={playerIndex} className="col-sm-5">
                            <p>Player: {player.name} <small>faction talents: {player.talents}</small></p>
                            {tableCardsContainer}
                            {handCardsContainer}
                        </div>
                    )
                })}
                
            </div>
        )
    }

}