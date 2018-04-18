import React from 'react';
import { SmallCard } from './SmallCard';
import './stylesheets/common.css'

export class Neutrals extends React.Component {
    
    render() {
        
        const SELECETD_ACTIVE = this.props.G.interface.selectedCard.active.length > 0
            ? this.props.G.interface.selectedCard.active
            : null;
        
        const SELECETD_PASSIVE = this.props.G.interface.selectedCard.passive.length > 0
            ? this.props.G.interface.selectedCard.passive
            : null;
        
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
                        <div>
                            <h6 className="align-center">Table Cards</h6>
                            <table className="table-small-cards">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        {/* <th>Type</th> */}
                                        <th>Name</th>
                                        <th>Military</th>
                                        <th>Oratory</th>
                                        <th>Loyalty</th>
                                        {/**/}
                                        <th>Popularity</th>
                                        <th>Influence</th>
                                        <th>Knights</th>
                                        <th>Talents</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {player.tableCards.map(card => {
                                    return (
                                        <SmallCard {...card}
                                                   key={card.id}
                                                   active={SELECETD_ACTIVE && SELECETD_ACTIVE.indexOf(card.id) > -1}
                                                   passive={SELECETD_PASSIVE && SELECETD_PASSIVE.indexOf(card.id) > -1}
                                        >
                                        </SmallCard>
                                    )
                                })}
                                </tbody>
                            </table>
                        </div> :
                        <div></div>;
                                            
                    let handCardsContainer = player.hand && player.hand.length > 0 ? 
                        <div className="hand-cards-container">
                            <h6 className="align-center">Hand Cards</h6>
                            <table className="table-small-cards">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        {/* <th>Type</th> */}
                                        <th>Name</th>
                                        <th>Military</th>
                                        <th>Oratory</th>
                                        <th>Loyalty</th>
                                        {/**/}
                                        <th>Popularity</th>
                                        <th>Influence</th>
                                        <th>Knights</th>
                                        <th>Talents</th>
                                    </tr>
                                </thead>
                                <tbody>
                                
                                {player.hand.map(card => {
                                    return (
                                        <SmallCard {...card} key={card.id}></SmallCard>
                                    )
                                })}
                                </tbody>
                                </table>
                            </div> :
                            <div></div>;
                    
                    return (
                        <div key={playerIndex} className="col-sm-12 col-md-12 col-lg-6 neutral">
                            <p className="align-center">Player: {player.name} | faction {player.faction} | <small>faction talents: {player.talents}</small></p>
                            {tableCardsContainer}
                            {handCardsContainer}
                        </div>
                    )
                })}
                
            </div>
        )
    }

}