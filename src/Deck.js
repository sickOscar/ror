import React from 'react';
import { Random } from 'boardgame.io/core';
import { CardModel } from './Card';
import EarlyCards from './data/cards_early';
import MiddleCards from './data/cards_middle';
import LateCards from './data/cards_late';
import _ from 'lodash';

export class Deck extends React.Component {
    render() {
        return <div></div>
    }
}

export class DeckModel {

    constructor(stage) {

        if (stage === 'early') {
            this.cards = [...EarlyCards];
            this.cards = DeckModel.addTaxFarmersToDeck(this.cards);
            this.cards = DeckModel.addTribunesToDeck(this.cards, 'early');
            this.cards = this.cards.map(card => {
                card.deck = 'early';
                return card;
            })
        }

        if (stage === 'middle') {
            this.cards = [...MiddleCards];
            this.cards = DeckModel.addTribunesToDeck(this.cards, 'middle');
            this.cards = this.cards.map(card => {
                card.deck = 'middle';
                return card;
            })
        }

        if (stage === 'late') {
            this.cards = [...LateCards];
            this.cards = DeckModel.addTribunesToDeck(this.cards, 'late');
            this.cards = this.cards.map(card => {
                card.deck = 'late';
                return card;
            })
        }

        if (!stage) {
            this.cards = [];
        }

        this.cards = this.cards.map(DeckModel.augmentCard);

    }

    push(card) {
        this.cards.push(card);
    }

    /**
     * Adds tribunes to stage deck
     * @param {*} deck 
     */
    static addTribunesToDeck(deck, stage) {
        const tribuneCard = {
            type: "intrigue",
            subtype: "tribune",
            name: "Tribune"
        }

        let startIndex, num;
        switch(stage) {
            case 'early':
                startIndex = 38;
                num = 9;
                break;
            case 'middle':
                startIndex = 90;
                num = 7;
                break;
            case 'late':
                //
                break;
            default:
                break;
        }

        const tribunes = [];
        let cardId, t;
        for (let i = 0; i < num; i++) {
            cardId = '0' + (startIndex + i);
            t = Object.assign({}, tribuneCard, {id: cardId});
            tribunes.push(t)
        }
        return deck.concat(tribunes);
    }

    /**
     * Adds 6 tax farmers to basic early stage deck
     * @param {*} deck 
     */
    static addTaxFarmersToDeck(deck, stage) {
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
            card.popularity = card.popularity || 0;
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

    /**
     * 
     * @param {stage, earlyDeck, middleDeck, lateDeck} params 
     */
    static buildInitialDeck(params) {
        const deck = new DeckModel();

        const eraEndsCard = {
            id: "065",
            type: "end",
            name: "Era Ends"
        }

        if (params.stage === 'early') {
            const sixEarlyCards = [];
            let i;
            for(i = 0; i < 6; i++) {
                sixEarlyCards.push(params.earlyDeck.drawRandom());
            }
            const sixMiddleCards = [];
            for(i = 0; i < 6; i++) {
                sixMiddleCards.push(params.middleDeck.drawRandom());
            }
            const mix = Random.Shuffle(sixEarlyCards.concat(sixMiddleCards).concat([eraEndsCard]));
            
            params.earlyDeck.cards = Random.Shuffle(params.earlyDeck.cards);

            for (i = 0; i < params.earlyDeck.cards.length; i++) {
                deck.push(params.earlyDeck.cards[i]);
            }

            for (i = 0; i < mix.length; i++) {
                deck.push(mix[i]);
            }
        }
        return deck;
    }

    static drawFromTop(deck) {
        return deck.cards.shift();
    }
    
    drawRandom(params) {
        let card, index;
        if (params) {
            const cardsOfType = _.filter(this.cards, params);
            index = Math.round(Random.Number() * (cardsOfType.length - 1));
        } else {
            index = Math.round(Random.Number() * (this.cards.length - 1));
        }
        card = this.cards.slice(index, index + 1)[0];
        this.cards.splice(index, 1);

        return new CardModel(card);
    }

    drawInitialRandom() {
        const cards = [];
        let validCard = false;
        for(let i = 0; i < 3; i++) {
            validCard = false;
            let card;
            let drawnCard;
            while(!validCard) {
                let cardIndex = Math.round(Random.Number() * (this.cards.length - 1));
                card = this.cards[cardIndex];
                if (card.type === 'intrigue' 
                    || (card.type === 'senator' && card.statesman === true)
                    || card.type === 'concession'
                ) {
                    validCard = true;
                    drawnCard = this.cards.slice(cardIndex, cardIndex + 1)[0];
                    this.cards.splice(cardIndex, 1);
                }
            }
            cards.push(new CardModel(drawnCard));
        }
        return cards;
    }

    concat() {
        return this.cards.concat.apply(this.cards, arguments);
    }

}