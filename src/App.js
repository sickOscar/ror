import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import 'bootstrap/dist/css/bootstrap.css'

import { Client } from 'boardgame.io/react';
import { Game, PlayerView } from 'boardgame.io/core';
import { Random } from 'boardgame.io/core';
import { CardModel, Card } from './Card.js';
import { PlayerModel, Player} from './Player.js'
import { DeckModel } from './Deck';

import  MortalityBoard from './MortalityBoard.js'
import  RevenueBoard from './RevenueBoard.js'
import { Neutrals } from './Neutrals.js';

const deck = new DeckModel();

const player1InitialCards = PlayerModel.getRandomSenators(deck);
const player2InitialCards = PlayerModel.getRandomSenators(deck);
const player3InitialCards = PlayerModel.getRandomSenators(deck);
const player4InitialCards = PlayerModel.getRandomSenators(deck);
const player5InitialCards = PlayerModel.getRandomSenators(deck);

const Ror = Game({

  name: 'RoR',

  setup: () => ({

    republic: {
	treasury: 0,
    	unrest: 0,
    	landBills: [],
    	laws: [],
    	legions: 4,
    	fleets: 0,
    	veterans: 0,
    	activeWars: [],
    	unprosecutedWars: [],
    	inactiveWars: [],
    	imminentWars: [],
    },

    forum: {
	events: [],
	provinces: [],
	senators: [],
	concessions: []
    },

    curia: {
	senators: [],
	concessions: [],
	leaders: []
    },

    forumDeck: deck,

    players: {
      '0': {
        tableCards:player1InitialCards,
        hand: [],
        talents: 0
      },
      '1': {
        name: "Neutral 2",
        tableCards: player2InitialCards,
        hand: [],
        talents: 0
      },
      '2': {
        name: "Neutral 3",
        tableCards: player3InitialCards,
        hand: [],
        talents: 0
      },
      '3': {
        name: "Neutral 4",
        tableCards: player4InitialCards,
        hand: [],
        talents: 0
      },
      '4': {
        name: "Neutral 5",
        tableCards: player5InitialCards,
        hand: [],
        talents: 0
      }
    },

  }),

  moves: {

    drawMortalityChit(G, ctx) {
      return {...G, mortalityChit: Random.Die(36)}
    },

    drawForumCard(G, ctx, id) {
      const forumDeck = G.forumDeck.slice();
      forumDeck.pop();
      return {...G, forumDeck}
    }


  },

  flow: {
    phases: [
      { 
        name: 'mortality',
        allowedMoves: ['drawMortalityChit'],
        endPhaseIf: G => G.mortalityChit
      },
      {
        name: 'revenue',
        onPhaseBegin: (G, ctx) => {

          const game = Object.assign({}, G);

          game.players = Object.keys(game.players).map(playerIndex => {
            const player = game.players[playerIndex];
            player.tableCards.map(card => {
              card.talents = card.isFactionLeader ? card.talents + 3 : card.talents + 1;
            })
            return player;
          })

          return game;
        }
      },
      {
        name: 'forum',
        allowedMoves: [],
        allowedMoves: ['drawForumCard']
      }
    ]
  }


})

const Board = (props) => (

  <div className="container">
    <div className="row">
        <div className="col-sm-12">
          <div>
            <p>Player: {props.ctx.currentPlayer} | phase: {props.ctx.phase}</p>
          </div>

          {props.ctx.phase === 'mortality' && 
            <MortalityBoard {...props}></MortalityBoard>
          }

          {props.ctx.phase === 'revenue' && 
            <RevenueBoard {...props}></RevenueBoard>
          }

            {/* <button onClick={() => props.events.endTurn()}>End turn</button>
          <button onClick={() => props.events.endPhase()}>End Phase { props.ctx.phase}</button> */}

        </div>

        <div className="col-sm-12">
          <Neutrals {...props}></Neutrals>
        </div>
      </div>
  </div>
)

const App = Client({
  game: Ror,
  board: Board,
  playerView: PlayerView.STRIP_SECRETS,
  debug: false
});



export default App;
