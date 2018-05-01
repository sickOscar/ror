import React from 'react';
import Util from './Util';
import { PlayerModel } from './Player';
import { Spoils } from './Spoil';
import _ from 'lodash';

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
        this.onEndSpoilsDistribution = this.onEndSpoilsDistribution.bind(this);
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

    static getAvailableSpoils(game) {
        return Object.values(Spoils).concat(
            game.forum.concessions
        )
    }

    onEndSpoilsDistribution() {
        console.log("end distribution")
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
                    <div className="row">
                        <p>Available spoils </p>   
                        <div className="col-sm-6">
                            {SenateBoard.getAvailableSpoils(this.props.G).map((spoil, i) => {

                                switch (spoil.type) {
                                    case 'role':
                                        return <div key={i}>ROLE: {spoil.name}</div>;
                                    case 'concession':
                                        return <div key={i}>CONCESSION {spoil.name}</div>
                                    default:
                                        return ''
                                }

                            })}
                        </div>

                        <div className="col-sm-6">
                            {!this.state.spoilsDistributionStarted &&
                                <button onClick={this.startSpoilsDistribution}>Start Spoils distribution</button>
                            }
                        </div>

                        <div className="col-sm-6">
                            {this.state.spoilsDistributionStarted &&
                            <SpoilsDistributionBoard {...this.props} onEnd={this.onEndSpoilsDistribution}></SpoilsDistributionBoard>
                            }
                        </div>


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

class SpoilsDistributionBoard extends React.Component {

    constructor(props) {
        super(props)

        const gameClone = _.cloneDeep(this.props.G);

        this.state = {
            game: gameClone,
            rulingPlayers: PlayerModel.getRulingPlayers(gameClone),
            currentBidder: 0,
            distributionDone: false,
            choosenSpoil: null,
            spoilTarget: null
        }

        this.selectSpoil = this.selectSpoil.bind(this);
        this.bidForRole = this.bidForRole.bind(this);
        this.selectSpoilTarget = this.selectSpoilTarget.bind(this);
    }

    componentWillMount() {
        this.sortRulingPlayers();
    }

    sortRulingPlayers() {
        this.setState({
            rulingPlayers: _.sortBy(this.state.rulingPlayers, player => player.countVotes()).reverse(),
            choosenSpoil: SenateBoard.getAvailableSpoils(this.state.game)[0]
        })
    }

    selectSpoil(event) {
        this.setState({
            choosenSpoil : event.target.value
        });
    }

    bidForRole() {

        const nextPlayer = this.state.rulingPlayers[1];

        const nextPlayerHasTribune = nextPlayer.tableCards.reduce((hasIt, next) => {
            return hasIt || next.subtype === 'tribune'
        }, false);

        if (nextPlayer.isHuman && nextPlayerHasTribune) {
            // Human Choice: leave or play tribune

        } else {

            if (nextPlayerHasTribune) {
                //


            } else {
                // bid success
                let p = this.state.game.players[this.state.rulingPlayers[0].originalIndex];

                console.log('spoilTarget', this.state.spoilTarget)

                let target = p.tableCards.find(senator => senator.id === this.state.spoilTarget)
                target.spoils.push(this.state.choosenSpoil);

                console.log(this.state.game)
            }


        }

    }

    selectSpoilTarget(event) {
        this.setState({
            spoilTarget: event.target.value
        })
    }

    render() {

        console.log('rulingPlayers', this.state.rulingPlayers)

        return (
            <div>
                {this.state.rulingPlayers[0].isHuman &&
                    <div>
                        <p>Choose Available Spoil</p>
                        <select onChange={this.selectSpoil}>
                            {SenateBoard.getAvailableSpoils(this.state.game).map(spoil => {
                                return <option key={spoil.id} value={spoil.id}>{spoil.name}</option>
                            })}
                        </select>
                         to
                        <select onChange={this.selectSpoilTarget}>
                            {this.state.rulingPlayers[0].tableCards.map(senator => {
                                return <option key={senator.id} value={senator.id}>{senator.name}</option>
                            })}
                        </select>
                        <button onClick={this.bidForRole}>Bid</button>
                    </div>
                }

                {!this.state.rulingPlayers[0].isHuman &&
                    <button>Bid Neutral {this.state.rulingPlayers[0].name}</button>
                }

                {this.state.distributionDone &&
                    <button onClick={this.props.onEnd}>END</button>
                }
            </div>
        )
    }

}