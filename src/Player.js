import React from 'react';
import { Random } from 'boardgame.io/dist/core';

export class Player extends React.Component {

}

export class PlayerModel {

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

}