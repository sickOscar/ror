import React from 'react';
import { Random } from 'boardgame.io/dist/core';
import _ from 'lodash';

export class Player extends React.Component {

}

export class PlayerModel {

    constructor(model) {
        Object.assign(this, model);
    }

    static getRandomSenators(deck) {

        const senators = [
            deck.drawRandom({type:'senator', statesman: false}),
            deck.drawRandom({type:'senator', statesman: false}),
            deck.drawRandom({type:'senator', statesman: false})
        ];

        var leaderIndex = Math.round(Random.Number() * 2);

        senators[leaderIndex].isFactionLeader = true;

        return senators;
    }

    countVotes() {
        return this.tableCards.reduce((sum, card) => {
            return sum + card.oratory + card.knights;
        }, 0)
    }

    countTreasury() {
        return this.talents + this.tableCards.reduce((sum, card) => {
            return sum + card.talents;
        }, 0) 
    }

    countInfluence() {
        return this.tableCards.reduce((sum, card) => {
            return sum + card.influence;
        }, 0)
    }

    countPopularity() {
        return this.tableCards.reduce((sum, card) => {
            return sum + card.popularity;
        }, 0)
    }

    static getTotalVotes(G, ctx) {
        return Object.values(G.players).reduce((sum, player) => {
            const p = new PlayerModel(player);
            return sum + p.countVotes();
        }, 0)
    }

    static getMajority(G) {
        return Math.ceil(PlayerModel.getTotalVotes(G) / 2);
    }

    static getRulingPlayers(G) {
        let rulingPlayers = Object.values(G.republic.rulingCoalition)
            .reduce((players, next) => {
                const model = new PlayerModel(G.players[next]);
                model.originalIndex = next;
                players.push(model);
                return players;
            }, []);

        return _.sortBy(rulingPlayers, player => {
            return player.countVotes()
        })
    }

}