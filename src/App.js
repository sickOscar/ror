import React from 'react';
import './App.css';

import 'bootstrap/dist/css/bootstrap.css'

import { Client } from 'boardgame.io/react';
import { Game, PlayerView } from 'boardgame.io/core';
import { Random } from 'boardgame.io/core';
import { PlayerModel} from './Player.js'
import { DeckModel } from './Deck';

import  MortalityBoard from './MortalityBoard.js'
import  RevenueBoard from './RevenueBoard.js'
import PlayerBoard from './PlayerBoard';
import { Neutrals } from './Neutrals.js';
import { CardModel } from './Card';

import RevenueBot from './RevenueBot';

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
      treasury: 100,
      unrest: 0,
      landBills: [],
      laws: [],
      legions: 4,
      fleets: 0,
      veterans: 0,
      events: [],
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
        name: "Player",
        tableCards:player1InitialCards,
        hand: [],
        talents: 0,
      },
      '1': {
        name: "Neutral 1",
        tableCards: player2InitialCards,
        hand: [],
        talents: 0
      },
      '2': {
        name: "Neutral 2",
        tableCards: player3InitialCards,
        hand: [],
        talents: 0
      },
      '3': {
        name: "Neutral 3",
        tableCards: player4InitialCards,
        hand: [],
        talents: 0
      },
      '4': {
        name: "Neutral 4",
        tableCards: player5InitialCards,
        hand: [],
        talents: 0
      }
    },

  }),

  moves: {

    drawMortalityChit(G, ctx) {
      const toDie = Random.Die(36);
      return {...G, mortalityChit: toDie}
    },

    killSenator(G, ctx, id) {
      if (!id) {
        id = G.mortalityChit;
      }
      const game = {...G};

      for (let playerIndex in game.players) {
        let player = game.players[playerIndex];
        const foundSenatorIndex = player.tableCards.findIndex(card => card.id === id);
        if (foundSenatorIndex > -1) {
          player.tableCards.slice(foundSenatorIndex, foundSenatorIndex + 1);
        }
      }

      return {...game}
    },

    distributeTalents(G, ctx, talentsObject) {
      const players = Object.assign({}, G.players);
      players[ctx.currentPlayer].tableCards = Object.values(talentsObject.senators);
      players[ctx.currentPlayer].talents = talentsObject.familyTalents;

      return {...G, players}
    },

    doStateContribution(G, ctx, contributor, contribution) {
      const game = Object.assign({}, G);

      if (!contributor) {
        return game;
      }

      game.republic.treasury += contribution;

      const senator = game.players[ctx.currentPlayer].tableCards
        .find(card => card.id === contributor)
      senator.talents -= contribution;

      if (contribution >= 50) {
        senator.influence += 7;
      }

      if (contribution >= 25 && contribution < 50) {
        senator.influence += 3;
      }

      if (contribution >= 10 && contribution < 20) {
        senator.influence += 1;
      }

      return {...game}

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
        allowedMoves: ['drawMortalityChit', 'killSenator'],
      },
      {
        name: 'revenue',
        allowedMoves: ['distributeTalents', 'doStateContribution'],
        onPhaseBegin: (G, ctx) => {

          const game = Object.assign({}, G);

          game.republic.treasury += 100;

          game.players = Object.keys(game.players).map(playerIndex => {
            const player = game.players[playerIndex];
            player.tableCards = player.tableCards.map(card => {
              const c = new CardModel(card);
              c.addRevenueTalents();
              return c;
            })
            return player;
          })

          return game;
        }
      },
      {
        name: 'forum',
        allowedMoves: ['drawForumCard']
      }
    ]
  }


})

const Board = (props) => (

  <div className="container-fluid">
    <div className="row">
        <div className="col-sm-12">
          <div>
            <p>Player: {props.ctx.currentPlayer} | phase: {props.ctx.phase} | treasury: {props.G.republic.treasury}</p>
          </div>

          {props.ctx.phase === 'mortality' 
            && <MortalityBoard {...props}></MortalityBoard>
          }

          {props.ctx.phase === 'revenue' && props.ctx.currentPlayer === '0' 
            && <RevenueBoard {...props}></RevenueBoard>
          }
          {props.ctx.phase === 'revenue' && props.ctx.currentPlayer !== '0' 
            && <RevenueBot {...props}></RevenueBot>
          }

        </div>

        <div className="col-sm-12">
          <PlayerBoard {...props}></PlayerBoard>
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
  numPlayers: 5,
  playerView: PlayerView.STRIP_SECRETS,
  playerID: '0',
  debug: false
});

export default App;
