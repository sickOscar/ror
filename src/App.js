import React from 'react';
import _ from 'lodash';
import './App.css';

import 'bootstrap/dist/css/bootstrap.css'

import { Client } from 'boardgame.io/react';
import { Game, PlayerView } from 'boardgame.io/core';
import { Random } from 'boardgame.io/core';
import { PlayerModel} from './Player.js'
import { DeckModel } from './Deck';

import  MortalityBoard from './MortalityBoard.js'
import  RevenueBoard from './RevenueBoard.js'
import ForumBoard from './ForumBoard';
import PlayerBoard from './PlayerBoard';
import { Neutrals } from './Neutrals.js';
import { CardModel } from './Card';
import { EventModel, EventDeck} from './Event';

import RevenueBot from './RevenueBot';
import ForumBot from './ForumBot';
import Util from './Util';

const forumState = require('./data/forum.json');

const deck = new DeckModel();

const initialHands = [
  PlayerModel.getRandomSenators(deck),
  PlayerModel.getRandomSenators(deck),
  PlayerModel.getRandomSenators(deck),
  PlayerModel.getRandomSenators(deck),
  PlayerModel.getRandomSenators(deck)
]

const randomHRAOIndex = Math.round(Random.Number(14));
_.flattenDeep(initialHands)[randomHRAOIndex].addSpoil('ROME_CONSUL');

const Ror = Game({

  name: 'RoR',

  setup: () => ({

    mortalityChitsToDraw: 1,
    mortalityChits: [],

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
      0: {
        name: "Player",
        tableCards: initialHands[0],
        hand: [],
        talents: 0,
      },
      1: {
        name: "Neutral 1",
        tableCards: initialHands[1],
        hand: [],
        talents: 0
      },
      2: {
        name: "Neutral 2",
        tableCards: initialHands[2],
        hand: [],
        talents: 0
      },
      3: {
        name: "Neutral 3",
        tableCards: initialHands[3],
        hand: [],
        talents: 0
      },
      4: {
        name: "Neutral 4",
        tableCards: initialHands[4],
        hand: [],
        talents: 0
      }
    },

  }),

  moves: {

    drawMortalityChit(G, ctx) {
      let senatorsToKill = [];
      for(let i = 0; i < G.mortalityChitsToDraw; i++) {
        senatorsToKill.push(Random.Die(36));
      }
      console.log('senatorsToKill', senatorsToKill)
      return {...G, mortalityChits: senatorsToKill}
    },

    killSenator(G, ctx, id) {
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
    },

    goToGameState(G, ctx, phase, gameState) {
      return {...gameState};
    },

    drawEvent(G, ctx, id) {
      let game = {...G};

      const drawnEvent = EventDeck.find(event => event.id === id);
      
      game.forum.events.push(drawnEvent);
      game = drawnEvent.apply(game, ctx);
      
      return game;
    }

  },

  flow: {
    phases: [
      { 
        name: 'mortality',
        onPhaseEnd: (G, ctx) => {
          return {...G, mortalityChits: []}
        }
        // allowedMoves: ['drawMortalityChit', 'killSenator'],
      },
      {
        name: 'revenue',
        // allowedMoves: ['distributeTalents', 'doStateContribution'],
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
        // allowedMoves: ['drawForumCard'],
        onPhaseBegin: (G, ctx) => {
          const game = {...G};
          game.republic.events = [];
          return game;
        },
        turnOrder: {
          first: (G) => {
            const HRAOOrder = Util.findHRAOOrder(G);
            console.log(HRAOOrder);
            console.log('FIRST PLAYER:', HRAOOrder[0].index)
            return HRAOOrder[0].index
          }
        }
      }
    ]
  }


})

class Board extends React.Component {

  goToGameState(phase, state) {

    if (phase === 'forum') {
      this.props.events.endPhase();
      this.props.events.endPhase();
    }
    
    this.props.moves.goToGameState(phase, state);
  }

  render() {
    return (
    <div className="container-fluid">
        <div className="row">
            <div className="col-sm-6">
              <div>
                <p>Player: {this.props.ctx.currentPlayer} | phase: {this.props.ctx.phase} | treasury: {this.props.G.republic.treasury}</p>
              </div>

              {this.props.ctx.phase === 'mortality' 
                && <MortalityBoard {...this.props}></MortalityBoard>
              }

              {this.props.ctx.phase === 'revenue' && parseInt(this.props.ctx.currentPlayer, 10) === 0 
                && <RevenueBoard {...this.props}></RevenueBoard>
              }
              {this.props.ctx.phase === 'revenue' && parseInt(this.props.ctx.currentPlayer, 10) !== 0 
                && <RevenueBot {...this.props}></RevenueBot>
              }


              {this.props.ctx.phase === 'forum' && parseInt(this.props.ctx.currentPlayer, 10) === 0 
                && <ForumBoard {...this.props}></ForumBoard>}

              {this.props.ctx.phase === 'forum' && parseInt(this.props.ctx.currentPlayer, 10) !== 0 
                && <ForumBot {...this.props}></ForumBot>}

            </div>
            <div className="col-sm-4">
              <button onClick={() => this.goToGameState('forum', forumState)}>GO TO FORUM</button>
            </div>

            <div className="col-sm-12">
              <PlayerBoard {...this.props}></PlayerBoard>
            </div>

            <div className="col-sm-12">
              <Neutrals {...this.props}></Neutrals>
            </div>
          </div>
      </div>
    )
  }
  
        }

const App = Client({
  game: Ror,
  board: Board,
  numPlayers: 5,
  playerView: PlayerView.STRIP_SECRETS,
  playerID: '0',
  debug: false,
  enhancer: window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
});

export default App;
