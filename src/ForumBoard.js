import React from 'react';
import { Random } from 'boardgame.io/core';
import { EventCard} from './Event'
import { SmallCard} from './SmallCard';
import Util from './Util';
import GamesTable from './GamesTable';

export default class ForumBoard extends React.Component {

    constructor(props) {
        super(props);
        // console.log(props.G)

        this.state = {
            rolledInitiative: null,
            rolledEventTable: null,
            drawnForumCard: false,

            startedPersuasionAttempt: false,
            persuasionAttemptDone: false,

            startedAttractKnight: false,
            attractKnightDone: false,

            startedSponsorGame: false,
            sponsorGamesDone: false,
        }

        this.rollInitiative = this.rollInitiative.bind(this);
        this.rollForEventTable = this.rollForEventTable.bind(this);
        this.drawForumCard = this.drawForumCard.bind(this);
        this.doPersuasionAttempt = this.doPersuasionAttempt.bind(this);
        this.doAttractKnight = this.doAttractKnight.bind(this);
        this.doSponsorGames = this.doSponsorGames.bind(this);
        this.endTurn = this.endTurn.bind(this);
    }

    rollInitiative() {
        const rolls = [4, 4]//Random.Die(6, 2);
        const rolled = rolls.reduce((sum,n) => sum + n, 0)
        this.setState({
            rolledInitiative: rolled
        })
    };

    rollForEventTable() {
        const rolls = Random.Die(6, 3);
        const rolled = rolls.reduce((sum,n) => sum + n, 0)
        this.setState({
            rolledEventTable: rolled
        })
        this.props.moves.drawEvent(8);
    }

    drawForumCard() {
        this.props.moves.drawForumCard();
        this.setState({
            drawnForumCard: true
        })
    }

    startPersuasionAttempt() {
        this.setState({
            startedPersuasionAttempt: true
        })
    }

    doPersuasionAttempt(persuasor, senatorObject, offer) {
        this.setState({
            persuasionAttemptDone: true
        })
        this.props.moves.doPersuasionAttempt(persuasor, senatorObject, offer)
    }

    startAttractKnight() {
        this.setState({
            startedAttractKnight: true
        })
    }

    doAttractKnight(attractor, offer) {
        this.setState({
            attractKnightDone: true
        })
        this.props.moves.doAttractKnight(attractor, offer);
    }

    startSponsorGames() {
        this.setState({
            startedSponsorGames: true
        })
    }

    doSponsorGames(gameType, sponsor) {
        this.setState({
            sponsorGamesDone: true
        })
        this.props.moves.doSponsorGames(gameType, sponsor);
    }

    endTurn() {
        this.props.events.endTurn();
    }

    endPhase() {
        this.props.events.endPhase();
    }

    render() {

        return (
            <div className="row">
                <div className="col-sm-6">
                    <h4>Forum Board</h4>

                    <RollInitiativeButtonContainer 
                        {...this.state} 
                        onButtonClick={this.rollInitiative}
                        >
                    </RollInitiativeButtonContainer>
                    
                    <RollForEventTableButtonContainer 
                        {...this.state}
                        onButtonClick={this.rollForEventTable}
                        >
                    </RollForEventTableButtonContainer>

                    <DrawForumCardButtonContainer 
                        {...this.state}
                        onButtonClick={this.drawForumCard}
                        >
                    </DrawForumCardButtonContainer>

                    {(this.state.rolledEventTable || this.state.drawnForumCard) && !this.state.persuasionAttemptDone
                        && <button onClick={() => this.startPersuasionAttempt()}>Persuasion Attempt</button>
                    }

                    {(this.state.startedPersuasionAttempt && !this.state.persuasionAttemptDone) && 
                        <PersuasionAttemptBoard {...this.props} doPersuasionAttempt={this.doPersuasionAttempt}></PersuasionAttemptBoard>
                    }

                    {(this.state.rolledEventTable || this.state.drawnForumCard) && !this.state.attractKnightDone
                        && <button onClick={() => this.startAttractKnight()}>Attract Knight</button>
                    }

                    {(this.state.startedAttractKnight && !this.state.attractKnightDone) && 
                        <AttractKnightBoard {...this.props} doAttractKnight={this.doAttractKnight}></AttractKnightBoard>
                    }

                    {(this.state.rolledEventTable || this.state.drawnForumCard) && !this.state.startedSponsorGames
                        && <button onClick={() => this.startSponsorGames()}>Sponsor games</button>
                    }

                    {(this.state.startedSponsorGames && !this.state.sponsorGamesDone) && 
                        <SponsorGamesBoard {...this.props} doSponsorGames={this.doSponsorGames}></SponsorGamesBoard>
                    }

                    {this.state.rolledInitiative && (this.state.rolledEventTable || this.state.drawnForumCard) &&
                        <button onClick={() => this.endTurn()}>End Turn</button>
                    }
                    

                </div>
                <div className="col-sm-6">
                    {this.props.G.forum.events.map(event => (
                        <EventCard key={event.id} {...event}></EventCard>
                    ))}
                    {this.props.G.forum.senators.map(senator => (
                        <SmallCard key={senator.id} {...senator}></SmallCard>
                    ))}
                </div>
            </div>
        )
    }
}

const RollInitiativeButtonContainer = (props) => {
    
    const rollInitiativeButton = !props.rolledInitiative
        ? <button onClick={props.onButtonClick}>Roll Initiative</button>    
        : '';

    return (
        <div>
            {rollInitiativeButton}
            <span>Rolled Initiative: {props.rolledInitiative}</span>
        </div>
    )

}

const RollForEventTableButtonContainer = (props) => {
    const rollForEventTableButton = props.rolledInitiative === 7 && !props.rolledEventTable 
        ? <button onClick={props.onButtonClick}>Roll for Event Table</button>    
        : '';
    const eventTablePickResult = props.rolledEventTable
        ? <span>Event Table Pick: {props.rolledEventTable}</span>
        : '';

    return (
        <div>
            {rollForEventTableButton}
            {eventTablePickResult}
        </div>
    )
}

const DrawForumCardButtonContainer = (props) => {
    const drawForumCardButton = props.rolledInitiative && props.rolledInitiative !== 7 && !props.drawnForumCard
        ? <button onClick={props.onButtonClick}>Draw forum card</button>
        : ''

    return (
        <div>
            {drawForumCardButton}
        </div>
    )
}
    
class PersuasionAttemptBoard extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            mySenators: props.G.players[props.ctx.currentPlayer].tableCards,
            offer: 0,
            persuasor: undefined,
            selectedSenator: undefined,
            persuasableSenators: Util.getPersuasableSenators(props.G, props.ctx)
        }
    }

    selectSenator(e) {
        this.setState({
            selectedSenator: this.state.persuasableSenators.find(s => s.senator.id === e.target.value)
        });
    }

    selectPersuasor(e) {
        this.setState({
            persuasor: this.state.mySenators.find(s => s.id === e.target.value)
        })
    }

    setOffer(e) {
        this.setState({
            offer: e.target.value
        })
    }

    render() {
        return (
            <div>
                <select onChange={(e => this.selectPersuasor(e))}>
                    <option value="">None</option>
                    {this.state.mySenators.map(senator => (
                        <option key={senator.id} value={senator.id}>{senator.name}</option>
                    ))}
                </select>  
                <select onChange={(e) => this.selectSenator(e)}>
                    <option value="">None</option>
                    {this.state.persuasableSenators.map(senatorObject => {
                        const content = senatorObject.senator.name + ' - ' +  (senatorObject.index ? 'Player ' + senatorObject.index : 'Forum')
                        return (
                            <option key={senatorObject.senator.id} value={senatorObject.senator.id}>
                                {content}
                            </option>
                        )   
                    })}
                </select>
                <input type="number" min="0" max={this.state.persuasor ? this.state.persuasor.talents : 0} onChange={(e) => this.setOffer(e)} />   
                <button onClick={() => this.props.doPersuasionAttempt(this.state.persuasor, this.state.selectedSenator, parseInt(this.state.offer,10))}>Do persuasion</button>
            </div>
        )
    }
    
}


class AttractKnightBoard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            mySenators: props.G.players[props.ctx.currentPlayer].tableCards,
            offer: 0,
            attractor: undefined
        }
    }

    setKnightAttractOffer(value) {
        this.setState({
            offer: value
        })
    }

    selectAttractor(e) {
        this.setState({
            attractor: this.state.mySenators.find(s => s.id === e.target.value)
        })
    }

    render() {
        return (
            <div>
                <select onChange={(e => this.selectAttractor(e))}>
                    <option value="">None</option>
                    {this.state.mySenators.map(senator => (
                        <option key={senator.id} value={senator.id}>{senator.name}</option>
                    ))}
                </select>  
                <input type="number" min="0" max={this.state.attractor ? this.state.attractor.talents : 0} onChange={(e) => this.setKnightAttractOffer(parseInt(e.target.value, 10))}/>
                <button onClick={() => this.props.doAttractKnight(this.state.attractor, parseInt(this.state.offer, 10))}>Do attract</button>
            </div>
        )
    }
}

class SponsorGamesBoard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            mySenators: props.G.players[props.ctx.currentPlayer].tableCards,
            sponsoredGameType: undefined,
            sponsor: undefined
        }
    }

    selectSponsor(e) {
        this.setState({
            sponsor: this.state.mySenators.find(s => s.id === e.target.value)
        })
    }

    setSponsoredGameType(e) {
        this.setState({
            sponsoredGameType: e.target.value
        })
    }

    render() {
        console.log('GamesTable', GamesTable)
        return (
            <div>
                <select onChange={e => this.selectSponsor(e)}>
                    <option value="">None</option>
                    {this.state.mySenators.map(senator => (
                        <option key={senator.id} value={senator.id}>{senator.name}</option>
                    ))}
                </select>
                <select onChange={e => this.setSponsoredGameType(e)}>
                    <option value="">None</option>
                    {GamesTable.map(game => (
                        <option key={game.id} value={game.id}>{game.name}</option>
                    ))}
                </select>
                <button onClick={() => this.props.doSponsorGames(this.state.sponsoredGameType, this.state.sponsor)}>DO Sponsor Games</button>
            </div>
        )
    }

}