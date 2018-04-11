import React from 'react';
import {Random} from 'boardgame.io/core'

export default class CombatBoard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div>
                <h2>Combat Phase</h2>
                {this.props.G.militaryPlan.attacks.map(war => {

                    const assignedResources = war.assignedResources && 
                        <p>Assigned resources: LEGIONS {war.assignedResources.legions} ({war.assignedResources.veterans}) | SUPPORT {war.assignedResources.navalSupport} | FLEETS {war.assignedResources.naval}</p>
                    
                    return (
                        <div key={war.id}>

                            <p>{war.name} | standoff {war.standoff} | war.disaster {war.disaster}</p>
                            {assignedResources}

                            <p>Naval Battle Result: {war.navalBattleResult}</p>

                            {war.navalStrength && !war.navalVictory && !war.navalBattleResult && 
                                <div>
                                    <button onClick={() => this.props.moves.attackWar(war)}>Naval Attack {war.name}</button>
                                </div>
                            }

                            {!war.landVictory && war.navalVictory && 
                                <div>
                                    <button onClick={() => this.props.moves.attackWar(war)}>Land Battle on {war.name}</button>
                                </div>
                            }
                            
                            
                        </div>
                    )

                })}

                {this.state.attackedAllWars && 
                    <button onClick={() => this.props.events.endPhase()}>End Combat Phase</button>
                }
            </div>
        )
    }

}