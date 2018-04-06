import React from 'react';
import _ from 'lodash';

class StateContributionBoard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            player: this.props.G.players[this.props.ctx.currentPlayer],
            contributor: undefined,
            contribution: 0,
            maxContribution: 0
        }

        this.handleContributionChange = this.handleContributionChange.bind(this);
        this.handleContributorChange = this.handleContributorChange.bind(this);

    }

    handleContributorChange(event) {

        const maxContribution = this.state.player.tableCards
            .find(card => card.id === event.target.value)
            .talents
        
        this.setState({
            contributor: event.target.value,
            maxContribution,
            contribution: 0
        });
        this.props.moves.resetSelected();
        this.props.moves.setCardAsSelected(event.target.value, 'ACTIVE');
    }

    handleContributionChange(event) {
        this.setState({
            contribution: _.isNaN(parseInt(event.target.value, 10)) ? 0 : parseInt(event.target.value, 10)
        })
    }

    saveContribution() {
        let actualContribution = this.state.contribution;
        if (this.state.contribution > this.state.maxContribution) {
            actualContribution = this.state.maxContribution;
        }
        this.props.moves.doStateContribution(this.state.contributor, actualContribution);
        this.setState({
            contribution: 0,
            maxContribution: this.state.maxContribution - actualContribution
        })
    }

    render() {
        let contributionInput = <input type="number" step="1" max={this.state.maxContribution} min="0" onChange={this.handleContributionChange} value={this.state.contribution}/> 

        return (
            <div>
                <h4>State contribution</h4>
                <select value={this.state.contributor} onChange={this.handleContributorChange}>
                    <option value="">No contribution</option>
                    {this.state.player.tableCards.map(card => (
                        <option key={card.id} value={card.id}>{card.name}</option>
                    ))}
                </select>
                {contributionInput}
                <button onClick={() => this.saveContribution()}>Save contribution</button>
            </div>
        )
    }

}

export default class RevenueBoard extends React.Component {

    constructor(props) {
        super(props);
        this.player = this.props.G.players[this.props.ctx.currentPlayer];

        this.state = {
            talentsAssigned: false,
            familyTalents: this.player.talents,
            senators: this.player.tableCards.reduce((obj, senator) => {
                obj[senator.id] = Object.assign({}, senator);
                return obj;
            }, {})
        };
        
    }
    
    changeSenatorTalents(senatorId, event) {
        const addedToSenator = (this.state.senators[senatorId].talents - event.target.value) < 0;
        if (addedToSenator) {
            if (this.state.familyTalents > 0) {
                const sen = {...this.state.senators};
                sen[senatorId].talents++;
                this.setState({
                    familyTalents: this.state.familyTalents - 1,
                    senators: sen
                })
            }
        } else {
            const sen = {...this.state.senators};
            sen[senatorId].talents--;
            this.setState({
                familyTalents: this.state.familyTalents + 1,
                senators: sen
            })
        }
    }

    save() {
        this.props.moves.distributeTalents(this.state)
        this.setState({
            talentsAssigned: true
        })
    }

    endTurn() {
        this.props.moves.resetSelected();
        this.props.events.endTurn();
    }

    render() {

        if (!this.state.talentsAssigned) {
            return (
                <div>
                    <p>Family talents: {this.state.familyTalents}</p>
                    {Object.values(this.state.senators).map(senator => (
                        <div className="input-group" key={senator.id}>
                            <label>{senator.name}</label>
                            <input type="number" onChange={(event) => this.changeSenatorTalents(senator.id, event)} step="1" min="0" max="1000" value={senator.talents} ></input>
                        </div>
                    ))}
                    <button onClick={() => this.save()}>Save</button>
                </div>
            )
        }

        return (
            <div>
                <StateContributionBoard {...this.props}></StateContributionBoard>
                <button onClick={() => this.endTurn()}>End turn</button>
            </div>
        )
        
    }

}
