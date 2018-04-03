import React from 'react';
import { Random } from 'boardgame.io/core';
import { CardModel } from './Card';
import EarlyCards from './data/cards_early';


export class Deck extends React.Component {
    render() {
        return <div></div>
    }
}

export class DeckModel {

    constructor(stage) {

        if (!stage || stage === 'early') {
            this.cards = [...EarlyCards];
            this.cards = DeckModel.addTaxFarmersToDeck(this.cards);
            this.cards = DeckModel.addTribunesToDeck(this.cards);
        }

        this.cards = this.cards.map(DeckModel.augmentCard);

    }

    /**
     * Adds 9 tribues to basic early stage deck
     * @param {*} deck 
     */
    static addTribunesToDeck(deck) {
        const tribuneCard = {
            type: "intrigue",
            name: "Tribune"
        }
        const tribunes = [];
        let cardId, t;
        for (let i = 0; i < 9; i++) {
            cardId = '0' + (38 + i);
            t = Object.assign({}, tribuneCard, {id: cardId});
            tribunes.push(t)
        }
        return deck.concat(tribunes);
    }

    /**
     * Adds 6 tax farmers to basic early stage deck
     * @param {*} deck 
     */
    static addTaxFarmersToDeck(deck) {
        const taxFarmerCard = {
            type: 'concession',
            name: "Tax Farmer",
            talent: 2,
            activation: 'turn',
            destroyable: true,
            destroyedBy: [''] // TODO add destroy condition
        }
        const taxFarmers = [];
        let cardId, t;
        for (let i = 0; i < 6; i++) {
            cardId = '0' + (59 + i);
            t = Object.assign({}, taxFarmerCard, {id: cardId});
            taxFarmers.push(t)
        }
        return deck.concat(taxFarmers);
    }

    static augmentCard(card) {
        
        if (card.type === 'senator') {
            // card.oratory = 2 + Math.floor(Random.Number() * 6);
            // card.influence = 2 + Math.floor(Random.Number() * 6);
            // card.military = 2 + Math.floor(Random.Number() * 6);
            // card.loyalty = 2 + Math.floor(Random.Number() * 7);
            card.popularity = 0;
            card.talents = 0;
            card.knights = 0;
            card.spoils = [];
        }

        return card;

    }

    static drawRandomCard(deck) {
        let card, index;
        index = Math.round(Random.Number() * (deck.cards.length - 1));
        card = deck.cards.slice(index, index + 1)[0];
        deck.cards.splice(index, 1);
        return new CardModel(card);
    }
    
    static getOriginalCard(deck, card) {
        let originalCards = [...EarlyCards];
        return originalCards.find(c => {
            return c.id === card.id;
        });
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