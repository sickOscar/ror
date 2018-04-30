import React from 'react';
import Util from './Util';
import { PlayerModel } from './Player';
import { Spoils } from './Spoil';

export default class SenateBoard extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            rulingCoalitionDone: false,

            militaryPlanDone: false,


            spoilsDistributionStarted: false,

            spoilsDistributionDone: false,

        }

        this.buildRulingCoalition = this.buildRulingCoalition.bind(this)
        this.doMilitaryPlan = this.doMilitaryPlan.bind(this);
        this.startSpoilsDistribution = this.startSpoilsDistribution.bind(this);
    }

    buildRulingCoalition() {
        this.props.moves.buildRulingCoalition();
        this.setState({
            rulingCoalitionDone: true
        })
    }

    doMilitaryPlan() {
        this.props.moves.doMilitaryPlan()
        this.setState({
            militaryPlanDone: true
        })
    }

    startSpoilsDistribution() {
        // this.props.moves.doSpoilsDistribution();

        this.setState({
            spoilsDistributionStarted: true
        })

        // this.setState({
        //     spoilsDistributionDone: true
        // })
    }

    getAvailableSpoils(game) {
        return Object.values(Spoils).concat(
            game.forum.concessions
        ).map((spoil, i) => {

            switch (spoil.type) {
                case 'role':
                    return <div key={i}>ROLE: {spoil.label}</div>;
                case 'concession':
                    return <div key={i}>CONCESSION {spoil.name}</div>
                default:
                    return ''
            }

            
        })
    }

    render() {
        return (
            <div>
                <h2>Senate Phase</h2>
                
                {!this.state.rulingCoalitionDone && 
                    <button onClick={this.buildRulingCoalition}>Count votes and build ruling coalition</button>
                }

                {this.state.rulingCoalitionDone && 
                    <RulingCoalitionBoard {...this.props}></RulingCoalitionBoard>    
                }

                {this.state.rulingCoalitionDone && !this.state.militaryPlanDone && 
                    <button onClick={this.doMilitaryPlan}>Do military plan</button>
                }

                {this.state.militaryPlanDone && 
                    <MilitaryPlanBoard {...this.props}></MilitaryPlanBoard>
                }

                {this.state.militaryPlanDone && !this.state.spoilsDistributionDone &&
                    <div>
                        <p>Available spoils </p>   
                        <div>
                            {this.getAvailableSpoils(this.props.G)}
                        </div>

                        {this.state.spoilsDistributionStarted &&
                            <div>
                                
                            </div>
                        }

                        {!this.state.spoilsDistributionStarted &&
                            <button onClick={this.startSpoilsDistribution}>Spoils distribution</button>
                        }


                    </div> 
                    
                }

                {this.state.spoilsDistributionDone &&
                    <button onClick={() => this.props.events.endPhase()}>End Phase</button>
                }

            </div>
        )
    }

}


const RulingCoalitionBoard = (props) => (
    <div className="row">
        <div className="col-sm-6">
            <p>Dominance Order</p>
            <ol>
                {Util.getPlayersOrderedByDominance(props.G).map((pair,i) => {
                    return <li key={i}>{pair[1].name} - {new PlayerModel(pair[1]).countVotes()} votes</li>
                })}
            </ol>
        </div>
        <div className="col-sm-6">
            <p>Ruling Coalition</p>
            <p><b>Majority: {PlayerModel.getMajority(props.G)}</b></p>
            <span>{
                props.G.republic.rulingCoalition
                    .map(index => {
                        return props.G.players[index].name + ' ('+ props.G.players[index].votes +')'
                    })
                    .join(' + ')
            }</span>
        </div>
    </div>
)

const MilitaryPlanBoard = (props) => (
    <div className="row">
        <div className="col-sm-6">
            <p>Military plan</p>
            <p><b>{props.G.militaryPlan.description}</b></p>
            <p>Attack: {props.G.militaryPlan.attacks.map(war => (
                <span key={war.id}>
                    {war.name}
                </span>   
            ))}</p>   
        </div>
    </div>
)