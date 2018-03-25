import React from 'react';
import { Random } from 'boardgame.io/dist/core';

export class Player extends React.Component {

}

export class PlayerModel {

    constructor(model) {
        Object.assign(this, model);
    }

    static getRandomSenators(deck) {

        const senators = [
            deck.drawRandom('senator'),
            deck.drawRandom('senator'),
            deck.drawRandom('senator')
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

}