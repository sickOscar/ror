import React from 'react';
import {Random} from 'boardgame.io/core'

export default class CombatBoard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            // transform array into (id, card) object
            toAttack: this.props.G.militaryPlan.attacks.reduce((obj, next) => ({...obj, [next.id]: next}), {}),
            attackedAllWars: false
        }
    }

    attackWar(war) {
        console.log('attacking war', war)

        war.assignedResources = {
            legions: war.landStrength,
            veterans: 0,
            navalSupport: war.navalSupport,
            naval: war.navalStrength
        };

        if (war.navalStrength && !war.navalVictory) {
            const roll = Random.Die(6, 3).reduce((sum, next) => sum + next, 0);
            war.navalBattleResult = roll + war.assignedResources.naval - war.navalStrength;
        }

        const toAttack = this.state.toAttack;
        toAttack[war.id] = war;

        this.setState({
            toAttack
        })


    }

    render() {
        return (
            <div>
                <h2>Combat Phase</h2>
                {Object.keys(this.state.toAttack).map(warId => {

                    const war = this.state.toAttack[warId];
                    const assignedResources = war.assignedResources && 
                        <p>Assigned resources: LEGIONS {war.assignedResources.legions} ({war.assignedResources.veterans}) | SUPPORT {war.assignedResources.navalSupport} | FLEETS {war.assignedResources.naval}</p>
                    
                    return (
                        <div key={war.id}>

                            <p>{war.name} | standoff {war.standoff} | war.disaster {war.disaster}</p>
                            {assignedResources}

                            <p>Naval Battle Result: {war.navalBattleResult}</p>

                            {war.navalStrength && !war.navalVictory && !war.navalBattleResult && 
                                <div>
                                    <button onClick={() => this.attackWar(war)}>Naval Attack {war.name}</button>
                                    
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