import React from 'react';
import { Random } from 'boardgame.io/core';
import { CardModel } from './Card';

export class Deck extends React.Component {
    render() {
        return <div></div>
    }
}

export class DeckModel {

    constructor() {
        this.cards = require('./data/cards.json');

        this.cards = this.cards.map(DeckModel.augmentCard);

    }

    static augmentCard(card) {
        
        if (card.type === 'senator') {
            card.oratory = 2 + Math.floor(Random.Number() * 6);
            card.influence = 2 + Math.floor(Random.Number() * 6);
            card.popularity = 0;
            card.military = 2 + Math.floor(Random.Number() * 6);
            card.loyalty = 2 + Math.floor(Random.Number() * 7);
            card.talents = 0;
            card.knights = 0;
            card.spoils = [];
        }

        return card;

    }

    static drawRandomCard(deck) {
        let card, index;
        index = Math.round(Random.Number() * (deck.cards.length - 1));
        console.log(deck)
        card = deck.cards.slice(index, index + 1)[0];
        deck.cards.splice(index, 1);
        return new CardModel(card);
    }

    drawRandom(type) {
        let card, index;
        if (type) {
            const cardsOfType = this.cards.filter(c => c.type === type);
            index = Math.round(Random.Number() * (cardsOfType.length - 1));
        } else {
            index = Math.round(Random.Number() * (this.cards.length - 1));
        }
        card = this.cards.slice(index, index + 1)[0];
        this.cards.splice(index, 1);

        return new CardModel(card);
    }

}