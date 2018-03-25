import React from 'react';
import Util from './Util';
import { PlayerModel } from './Player';

export default class SenateBoard extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            rulingCoalitionDone: false,

            militaryPlanDone: false,

            spoilsDistributionDone: false,

        }

        this.buildRulingCoalition = this.buildRulingCoalition.bind(this)
        this.doMilitaryPlan = this.doMilitaryPlan.bind(this);
        this.doSpoilsDistribution = this.doSpoilsDistribution.bind(this);
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

    doSpoilsDistribution() {
        this.props.moves.doSpoilsDistribution();
        this.setState({
            spoilsDistributionDone: true
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

                {this.state.militaryPlanDone && !this.state.spoilsDistributionDone && 
                    <button onClick={this.doSpoilsDistribution}>Spoils distribution</button>
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