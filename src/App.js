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
import PopulationBoard from './PopulationBoard';
import ForumBoard from './ForumBoard';
import SenateBoard from './SenateBoard';
import PlayerBoard from './PlayerBoard';
import { Neutrals } from './Neutrals.js';
import { CardModel } from './Card';
import { EventDeck} from './Event';
import GamesTable from './GamesTable';
import PopulationTable from './PopulationTable';

import RevenueBot from './RevenueBot';
import ForumBot from './ForumBot';
import Util from './Util';

const forumState = require('./data/forum.json');
const senateState = require('./data/senate.json');

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
  /***
   *       _____          _                   
   *      / ____|        | |                  
   *     | (___     ___  | |_   _   _   _ __  
   *      \___ \   / _ \ | __| | | | | | '_ \ 
   *      ____) | |  __/ | |_  | |_| | | |_) |
   *     |_____/   \___|  \__|  \__,_| | .__/ 
   *                                   | |    
   *                                   |_|    
   */
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
      stateOfRepublicSpeechExit: null,
    },

    legionCost: 10,
    fleetCost: 10,

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
    
    playersOrder: [0, 1, 2, 3, 4],

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

  /***
   *      __  __                              
   *     |  \/  |                             
   *     | \  / |   ___   __   __   ___   ___ 
   *     | |\/| |  / _ \  \ \ / /  / _ \ / __|
   *     | |  | | | (_) |  \ V /  |  __/ \__ \
   *     |_|  |_|  \___/    \_/    \___| |___/
   *                                          
   *                                          
   */
  moves: {

    drawMortalityChit(G, ctx) {
      let senatorsToKill = [];
      for(let i = 0; i < G.mortalityChitsToDraw; i++) {
        senatorsToKill.push(Random.Die(36));
      }
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

    drawForumCard(G, ctx) {
      const game = {...G};
      const card = DeckModel.drawRandomCard(game.forumDeck);

      switch(card.type) {
        case 'senator':
          game.forum.senators.push(card);
          break;
        case 'concession':
          game.forum.concessions.push(card);
          break;
        default:
          break;
      }

      return {...game}
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
    },

    doPersuasionAttempt(G, ctx, persuasor, senatorObject, offer) {

      const game = {...G};

      let loyaltyModifier = parseInt(senatorObject.senator.loyalty, 10);
      loyaltyModifier += senatorObject.senator.talents;
      if (senatorObject.player) {
        loyaltyModifier += 7;
      }

      let base = parseInt(persuasor.oratory, 10) + parseInt(persuasor.influence, 10) - loyaltyModifier;
      base += parseInt(offer, 10);
      const roll = Random.Die(6, 2);
      const rollTotal = roll.reduce((sum ,n) => sum +n , 0)

      if (rollTotal <= base) {
        let cards, targetIndex;
        if (senatorObject.player) {
          cards = game.players[senatorObject.index].tableCards
          targetIndex = cards.findIndex(card => card.id === senatorObject.senator.id);
        } else {
          cards = game.forum.senators;
          targetIndex = cards.findIndex(card => card.id === senatorObject.senator.id);
        }
        cards.splice(targetIndex, 1);
        
        const senatorCard = new CardModel(senatorObject.senator);
        senatorCard.talents += offer;
        game.players[ctx.currentPlayer].tableCards.push(senatorCard);

      } else if (rollTotal >= 10 || rollTotal > base) {
        const persuaded = game.players[senatorObject.index].tableCards.find(card => card.id === senatorObject.senator.id);
        persuaded.talents += offer;
      }

      return {...game}
    },

    doAttractKnight(G, ctx, attractor, offer) {
      const game = {...G};

      game.players[ctx.currentPlayer].tableCards.find(c => c.id === attractor.id).talents -= offer;

      const base = offer + Random.Die(6);
      if (base >= 6) {
        game.players[ctx.currentPlayer].tableCards.find(c => c.id === attractor.id).knights += 1;
      } else {
        console.log('fail')
      }

      return game;
    },
    
    doSponsorGames(G, ctx, gameType, sponsor) {
      const game = {...G};

      const sponsoredGame = GamesTable.find(g => g.id === gameType);
      const senator = game.players[ctx.currentPlayer].tableCards.find(c => c.id === sponsor.id)
      
      if (senator.talents >= sponsoredGame.cost) {
        senator.talents -= sponsoredGame.cost;
        senator.popularity += sponsoredGame.popularity;
        game.republic.unrest += sponsoredGame.unrest;
      } 

      return game;
    },

    doStateOfRepublicSpeech(G, ctx) {
      let game = {...G};
      const HRAOObject = Util.findHRAOOrder(G)[0];
      console.log(HRAOObject);

      const rolls = Random.Die(6, 3);
      const totalRoll = rolls.reduce((sum, r) => sum + r, 0);

      const totalResult = totalRoll + HRAOObject.card.popularity - game.republic.unrest;

      console.log(totalResult);
      game = PopulationTable[totalResult].apply(game, ctx);
      game.republic.stateOfRepublicSpeechExit = PopulationTable[totalResult];

      return game;
    },

    buildRulingCoalition(G, ctx) {
      let game = {...G};

      const totalVotes = PlayerModel.getTotalVotes(G, ctx)

      const majority = Math.ceil(totalVotes / 2);

      for (let i = 0; i < Object.keys(G.players).length; i++) {
        const compareSubject = new PlayerModel(G.players[i])
        G.players[i].votes = compareSubject.countVotes();
        G.players[i].dominance = Object.values(G.players).reduce((dominance, player, index) => {
          
          if (index === i) {
            return dominance;
          }

          const comparingTo = new PlayerModel(player);
          const comparingToVotes = comparingTo.countVotes();
          
          if (comparingToVotes > compareSubject.countVotes()) {
            return dominance + 1;
          } 
          if (comparingToVotes === compareSubject.countVotes()) {
            if (comparingTo.countTreasury() > compareSubject.countTreasury()) {
              return dominance + 1;
            } 
            if (comparingTo.countTreasury() === compareSubject.countTreasury()) {
              if (comparingTo.countPopularity() > compareSubject.countPopularity()) {
                return dominance + 1;
              }
              if (comparingTo.countPopularity() === compareSubject.countPopularity()) {
                if (comparingTo.countInfluence() > compareSubject.countInfluence()) {
                  return dominance + 1;
                } 
              }
            }
          }

          return dominance;
        }, 1);
      }

      game.republic.rulingCoalition = Util.getRulingCoalition(G, majority);

      return game;
    },

    doMilitaryPlan: (G, ctx) => {
      let game = {...G};

      const isCrisis = Util.isCrisis(G);
      console.log('isCrisis', isCrisis);

      const maxLegionsMaintainable = G.republic.treasury / G.legionCost;
      const maxFleetMaintainable = G.republic.treasury / G.fleetCost;

      


      return game;
    },

    doSpoilsDistribution: (G, ctx) => {
      let game = {...G}
      return game;
    }

  },

  flow: {
    phases: [
      /***
     *      __  __                  _             _   _   _           
     *     |  \/  |                | |           | | (_) | |          
     *     | \  / |   ___    _ __  | |_    __ _  | |  _  | |_   _   _ 
     *     | |\/| |  / _ \  | '__| | __|  / _` | | | | | | __| | | | |
     *     | |  | | | (_) | | |    | |_  | (_| | | | | | | |_  | |_| |
     *     |_|  |_|  \___/  |_|     \__|  \__,_| |_| |_|  \__|  \__, |
     *                                                           __/ |
     *                                                          |___/ 
     */
      { 
        name: 'mortality',
        onPhaseEnd: (G, ctx) => {
          return {...G, mortalityChits: []}
        }
        // allowedMoves: ['drawMortalityChit', 'killSenator'],
      },
      /***
     *      _____                                               
     *     |  __ \                                              
     *     | |__) |   ___  __   __   ___   _ __    _   _    ___ 
     *     |  _  /   / _ \ \ \ / /  / _ \ | '_ \  | | | |  / _ \
     *     | | \ \  |  __/  \ V /  |  __/ | | | | | |_| | |  __/
     *     |_|  \_\  \___|   \_/    \___| |_| |_|  \__,_|  \___|
     *                                                          
     *                                                          
     */
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
      /***
       *      ______                                    
       *     |  ____|                                   
       *     | |__      ___    _ __   _   _   _ __ ___  
       *     |  __|    / _ \  | '__| | | | | | '_ ` _ \ 
       *     | |      | (_) | | |    | |_| | | | | | | |
       *     |_|       \___/  |_|     \__,_| |_| |_| |_|
       *                                                
       *                                                
       */
      {
        name: 'forum',
        // allowedMoves: ['drawForumCard'],
        onPhaseBegin: (G, ctx) => {
          const game = {...G};
          game.republic.events = [];

          // set player order
          const HRAOOrder = Util.findHRAOOrder(G);
          const firstPlayer = HRAOOrder[0].index;
          const playersOrder = [];
          
          let j = 0
          while (j < Object.keys(game.players).length) {
            playersOrder.push(firstPlayer + j % Object.keys(game.players).length);
            j++;
          }
          game.playersOrder = playersOrder;

          return game;
        },
        turnOrder: {
          first: (G) => {
            const HRAOOrder = Util.findHRAOOrder(G);
            return HRAOOrder[0].index;
          },
          next: (G, ctx) => (ctx.currentPlayer + 1) % ctx.numPlayers
        }
      },
      /***
       *      _____                            _           _     _                 
       *     |  __ \                          | |         | |   (_)                
       *     | |__) |   ___    _ __    _   _  | |   __ _  | |_   _    ___    _ __  
       *     |  ___/   / _ \  | '_ \  | | | | | |  / _` | | __| | |  / _ \  | '_ \ 
       *     | |      | (_) | | |_) | | |_| | | | | (_| | | |_  | | | (_) | | | | |
       *     |_|       \___/  | .__/   \__,_| |_|  \__,_|  \__| |_|  \___/  |_| |_|
       *                      | |                                                  
       *                      |_|                                                  
       */
      {
        name: 'population',
        onPhaseBegin: (G, ctx) => {
          const game = {...G};

          game.playersOrder = [0,1,2,3,4];

          return game;
        },
        onPhaseEnd: (G, ctx) => {
          const game = {...G};
          game.republic.stateOfRepublicSpeechExit = null;
          return game;
        }
      },
      /***
       *       _____                          _          
       *      / ____|                        | |         
       *     | (___     ___   _ __     __ _  | |_    ___ 
       *      \___ \   / _ \ | '_ \   / _` | | __|  / _ \
       *      ____) | |  __/ | | | | | (_| | | |_  |  __/
       *     |_____/   \___| |_| |_|  \__,_|  \__|  \___|
       *                                                 
       *                                                 
       */
      {
        name: 'senate',
        onPhaseBegin: (G, ctx) => {
          console.log(G);
          const game = {...G};

          return game;
        }
      },
      /***
       *       _____                       _               _   
       *      / ____|                     | |             | |  
       *     | |        ___    _ __ ___   | |__     __ _  | |_ 
       *     | |       / _ \  | '_ ` _ \  | '_ \   / _` | | __|
       *     | |____  | (_) | | | | | | | | |_) | | (_| | | |_ 
       *      \_____|  \___/  |_| |_| |_| |_.__/   \__,_|  \__|
       *                                                       
       *                                                       
       */
      {
        name: 'combat',
        onPhaseBegin: (G, ctx) => {
          console.log(G);
          const game = {...G};
          return game;
        }
      },
      /***
       *      _____                           _           _     _                 
       *     |  __ \                         | |         | |   (_)                
       *     | |__) |   ___  __   __   ___   | |  _   _  | |_   _    ___    _ __  
       *     |  _  /   / _ \ \ \ / /  / _ \  | | | | | | | __| | |  / _ \  | '_ \ 
       *     | | \ \  |  __/  \ V /  | (_) | | | | |_| | | |_  | | | (_) | | | | |
       *     |_|  \_\  \___|   \_/    \___/  |_|  \__,_|  \__| |_|  \___/  |_| |_|
       *                                                                          
       *                                                                          
       */
      {
        name: 'revolution',
        onPhaseBegin: (G, ctx) => {
          console.log(G);
          const game = {...G};
          return game
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

    if (phase === 'senate') {
      this.props.events.endPhase();
      this.props.events.endPhase();
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
                <p>Player: {this.props.ctx.currentPlayer} | phase: {this.props.ctx.phase} | treasury: {this.props.G.republic.treasury} | unrest: {this.props.G.republic.unrest}</p>
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


              {this.props.ctx.phase === 'population' 
                && <PopulationBoard {...this.props}></PopulationBoard>}

              {this.props.ctx.phase === 'senate' 
                && <SenateBoard {...this.props}></SenateBoard>}

            </div>
            <div className="col-sm-4">
              <button onClick={() => this.goToGameState('forum', forumState)}>GO TO FORUM</button>
              <button onClick={() => this.goToGameState('senate', senateState)}>GO TO SENATE</button>
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
