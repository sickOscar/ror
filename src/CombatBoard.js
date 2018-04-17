import React from 'react';
import { War } from './War';

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
                {this.props.G.militaryPlan.attacks.map(war => (
                    <Battle key={war.id} war={war} {...this.props}></Battle>
                ))}
                {War.areFought(this.props.G.militaryPlan.attacks) &&
                    <button onClick={() => {this.props.events.endPhase()}}>End phase</button>    
                }
            </div>
        )
    }

}

class Battle extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            navalBattleDone: false,
            landBattleDone: false
        }
    }


    render() {

        const war = new War(this.props.war);

        const assignedResources = war.assignedResources &&
            <p>Assigned resources: LEGIONS {war.assignedResources.legions} ({war.assignedResources.veterans}) | SUPPORT {war.assignedResources.navalSupport} | FLEETS {war.assignedResources.naval}</p>
                    

        return (
            <div>

                <p>{war.name} | standoff {war.standoff} | war.disaster {war.disaster}</p>
                {assignedResources}

                <p>Naval Battle Result: {war.navalResult}</p>

                
                <p>Losses: 
                    {war.battleResult && 
                        <span>naval {war.battleResult.losses.fleets}</span>
                    }
                    {war.battleResult && 
                        <span>land {war.battleResult.losses.legions}</span>
                    }
                </p>

                {war.shouldDoNavalBattle() && 
                    <div>
                        <button onClick={() => this.props.moves.attackWar(war)}>Naval Attack {war.name}</button>
                    </div>
                }

                {war.shouldDoLandBattle() &&
                    <div>
                        <button onClick={() => this.props.moves.attackWar(war)}>Land Battle on {war.name}</button>
                    </div>
                }

            </div>      
        )
    }

}