import React from 'react';
import _ from 'lodash';
import './App.css';

import 'bootstrap/dist/css/bootstrap.css'

import {Client} from 'boardgame.io/react';
import {Game, PlayerView} from 'boardgame.io/core';
import {Random} from 'boardgame.io/core';
import {PlayerModel} from './Player.js'
import {DeckModel} from './Deck';

import MortalityBoard from './MortalityBoard.js'
import RevenueBoard from './RevenueBoard.js'
import PopulationBoard from './PopulationBoard';
import ForumBoard from './ForumBoard';
import SenateBoard from './SenateBoard';
import CombatBoard from './CombatBoard';
import RevolutionBoard from './RevolutionBoard';
import PlayerBoard from './PlayerBoard';
import {Neutrals} from './Neutrals.js';
import {CardModel} from './Card';
import {EventDeck} from './Event';
import GamesTable from './GamesTable';
import PopulationTable from './PopulationTable';
import MilitaryPlan from './MilitaryPlan';

import RevenueBot from './RevenueBot';
import ForumBot from './ForumBot';
import Util from './Util';

const forumState = require('./data/forum.json');
const senateState = require('./data/senate.json');

const earlyDeck = new DeckModel('early');
const middleDeck = new DeckModel('middle');
const lateDeck = new DeckModel('late');

const stage = 'early';

const initialTableCards = [
    PlayerModel.getRandomSenators(earlyDeck),
    PlayerModel.getRandomSenators(earlyDeck),
    PlayerModel.getRandomSenators(earlyDeck),
    PlayerModel.getRandomSenators(earlyDeck),
    PlayerModel.getRandomSenators(earlyDeck)
]

const initialHands = [
    earlyDeck.drawInitialRandom(),
    earlyDeck.drawInitialRandom(),
    earlyDeck.drawInitialRandom(),
    earlyDeck.drawInitialRandom(),
    earlyDeck.drawInitialRandom()
]

const forumDeck = DeckModel.buildInitialDeck({
    stage,
    earlyDeck: earlyDeck,
    middleDeck: middleDeck
});

const startingInactiveWars = [];

if (stage === 'early') {
    // 001 -> 1st punic war
    const punicWarIndex = earlyDeck.cards.findIndex(card => card.id === "001")
    const punicWarCard = earlyDeck.cards.slice(punicWarIndex, punicWarIndex + 1);
    startingInactiveWars.push(punicWarCard)
    earlyDeck.cards.splice(punicWarIndex, 1);
}

// console.log('forum deck', forumDeck);

const randomHRAOIndex = Math.round(Random.Number(14));
_.flattenDeep(initialTableCards)[randomHRAOIndex].addSpoil('ROME_CONSUL');

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
            inactiveWars: startingInactiveWars,
            imminentWars: [],
            stateOfRepublicSpeechExit: null,
        },

        legionCost: 10,
        fleetCost: 10,
        militaryPlan: {},

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

        forumDeck: forumDeck,

        playersOrder: [0, 1, 2, 3, 4],

        players: {
            0: {
                name: "Player",
                tableCards: initialTableCards[0],
                hand: initialHands[0],
                talents: 0,
            },
            1: {
                name: "Neutral 1",
                tableCards: initialTableCards[1],
                hand: initialHands[1],
                talents: 0
            },
            2: {
                name: "Neutral 2",
                tableCards: initialTableCards[2],
                hand: initialHands[2],
                talents: 0
            },
            3: {
                name: "Neutral 3",
                tableCards: initialTableCards[3],
                hand: initialHands[3],
                talents: 0
            },
            4: {
                name: "Neutral 4",
                tableCards: initialTableCards[4],
                hand: initialHands[4],
                talents: 0
            }
        },
        
        interface: {
            selectedCard: {
                active: [],
                passive: []
            },
            // changed: []
        }
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
            for (let i = 0; i < G.mortalityChitsToDraw; i++) {
                senatorsToKill.push(Random.Die(36).toString()); // 36
            }
            const game = {...G};
            for (let playerIndex in game.players) {
                let player = game.players[playerIndex];
                for (let indexToKill = 0; indexToKill < senatorsToKill.length; indexToKill++) {
                    const indexSenatorToKill = player.tableCards.findIndex(card => {
                        return card.id === senatorsToKill[indexToKill].toString();
                    });
                    if (indexSenatorToKill > -1) {
                        let cardToReset = player.tableCards[indexSenatorToKill];
                        let originalCard = DeckModel.getOriginalCard(earlyDeck.concat(middleDeck, lateDeck), cardToReset);
                        originalCard.oldData = _.omit(cardToReset, ['id', 'type', 'name', 'military', 'oratory', 'loyalty', 'oldData', 'spoils']);
                        Object.assign(cardToReset, originalCard);
                        game.interface.selectedCard.passive.push(cardToReset.id);
                        
                    }
                }
            }
            return {...G, mortalityChits: senatorsToKill}
        },
        
        resetMortalityChit(G) {
            return {...G, mortalityChits: []}
        },
        

        distributeTalents(G, ctx, talentsObject) {
            const game = {...G};
            const players = Object.assign({}, G.players);
            const originalSenators = players[ctx.currentPlayer].tableCards;
            players[ctx.currentPlayer].talents = talentsObject.familyTalents;
            _.each(talentsObject.senators, senator => {
                let originalSenator = _.find(originalSenators, {id: senator.id});
                if (senator.talents !== originalSenator.talents) {
                    game.interface.selectedCard.passive.push(senator.id);
                    senator.oldData = _.pick(originalSenator, ['talents']);
                }
            });
            players[ctx.currentPlayer].tableCards = Object.values(talentsObject.senators);
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
            const card = DeckModel.drawFromTop(game.forumDeck);

            switch (card.type) {
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

        /**
         * Your Senator chosen (in Rome) may attempt to:
         * # persuade an unaligned Senator in the Forum
         * # persuade an already Aligned non-Faction Leader Senator.
         * to join his own Faction.
         *
         * The Senator making the Persuasion Attempt
         * + Add his Oratory and
         * + Add his Influence and
         * - Subtracts the target Senator’s Loyalty rating to get a Base Number.
         * This Base Number can be modified by Loyalty (1.07.411), Bribes (1.07.412) and CounterBribes (1.07.413).
         *
         * If the target Senator is already Aligned, +7 is added to his Loyalty rating.
         * The number of Talents in the Personal Treasury of the target Senator is also added to his Loyalty rating.
         *
         * The resulting Base Number is then compared to a 2d6 roll.
         *
         * If Roll > Base Number,
         *    Persuasion Attempt succeeds => the target Senator joins the Faction of the Senator making the Persuasion Attempt.
         * If the Original (unmodified) Roll >= 10 || Modified roll is < Base Number
         *    Persuasion Attempt fails => the target Senator remains either uncommitted or aligned to his current Faction as the case may be.
         *
         * @param G
         * @param ctx
         * @param persuasor => The Senator making the Persuasion Attempt
         * @param senatorTarget
         * @param offer
         * @returns {{}}
         */
        doPersuasionAttempt(G, ctx, persuasor, senatorTarget, offer) {
            const game = {...G};
            // loyalty = loyalty + 7 (if already Aligned) + talents
            let loyaltyModifier = parseInt(senatorTarget.senator.loyalty, 10);
            loyaltyModifier += senatorTarget.senator.talents;
            if (senatorTarget.player) {
                loyaltyModifier += 7;
            }
            // base = oratory + influence - loyalty
            let base = parseInt(persuasor.oratory, 10) + parseInt(persuasor.influence, 10) - loyaltyModifier;
            base += parseInt(offer, 10);
            const roll = Random.Die(6, 2);
            const rollTotal = roll.reduce((sum, n) => sum + n, 0);
            persuasor.talents -= offer;
            
            if (rollTotal <= base) {
                let cards, targetIndex;
                if (senatorTarget.player) {
                    cards = game.players[senatorTarget.index].tableCards
                    targetIndex = cards.findIndex(card => card.id === senatorTarget.senator.id);
                } else {
                    cards = game.forum.senators;
                    targetIndex = cards.findIndex(card => card.id === senatorTarget.senator.id);
                }
                cards.splice(targetIndex, 1);

                const senatorCard = new CardModel(senatorTarget.senator);
                senatorCard.talents += offer;
                game.players[ctx.currentPlayer].tableCards.push(senatorCard);

            } else if (rollTotal >= 10 || rollTotal > base) {
                //const persuaded = game.players[senatorTarget.index].tableCards.find(card => card.id === senatorTarget.senator.id);
                //persuaded.talents += offer;
                senatorTarget.senator.talents += offer;
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

            const rolls = Random.Die(6, 3);
            const totalRoll = rolls.reduce((sum, r) => sum + r, 0);

            const totalResult = totalRoll + HRAOObject.card.popularity - game.republic.unrest;

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

            const isCrisis = Util.isCrisis(game);
            console.log('isCrisis', isCrisis);

            const maxLegionsMaintainable = game.republic.treasury / game.legionCost;
            const maxFleetMaintainable = game.republic.treasury / game.fleetCost;

            game = MilitaryPlan.applyNeutralPlan(game);

            if (!Util.anyWarPresent(game)) {
                
                game = MilitaryPlan.applyPeacePlan(game);

            } else {

                if (game.republic.activeWars.length > 1 && Util.hasAdequateForce(game).length > 1) {
                    // plan 1
                    game = MilitaryPlan.applyPlan1(game, ctx);
                } else if (Util.anyDangerousWar(game) && Util.hasAdequateForce(game).length > 0) {
                    // plan 2
                    // intersect di Utils.anyDangerousWar(G) e Util.hasAdequateForce(G)
                    // prendo il primo elemento
                    game = MilitaryPlan.applyPlan2(game, ctx);
                } else if (game.republic.activeWars.length > 0 && Util.hasAdequateForce(game).length === 1) {
                    // plan3
                    // controllare che Util.hasAdequateForce(G)[0] sia inclusa in game.republic.activeWars
                    game = MilitaryPlan.applyPlan3(game, ctx);
                } else if (game.republic.inactiveWars.length > 0 && Util.hasAdequateForce(game).length === 1) {
                    // plan4
                    // controllare che Util.hasAdequateForce(G)[0] sia inclusa in game.republic.inactiveWars
                    game = MilitaryPlan.applyPlan4(game, ctx);
                }
            }
    
            return game;
        },

        doSpoilsDistribution: (G, ctx) => {
            let game = {...G}
            return game;
        },
        
        setCardAsSelected(G, ctx, indexCard, type) {
            const game = Object.assign({}, G);
            // let card = null;
            // if (!_.isEmpty(indexCard)) {
            //     card = game.players[ctx.currentPlayer].tableCards.find(card => card.id === indexCard)
            // }
            if (type === 'ACTIVE') {
                game.interface.selectedCard.active.push(indexCard);
            } else if (type === 'PASSIVE') {
                game.interface.selectedCard.passive.push(indexCard);
            }
            return {...game}
        },
        
        // getCardsSelected(G, ctx, indexCard, type) {
        //     if (!_.isEmpty(indexCard)) {
        //         if (type === 'ACTIVE') {
        //             return G.selectedCard.active;
        //         } else if (type === 'PASSIVE') {
        //             return G.selectedCard.passive
        //         }
        //     }
        //     return [];
        // },
        
        resetSelected(G, ctx) {
            const game = Object.assign({}, G);
            game.interface.selectedCard.active = [];
            game.interface.selectedCard.passive = [];
            return {...game}
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

                    game.playersOrder = [0, 1, 2, 3, 4];

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
                            <p>Player: {this.props.ctx.currentPlayer} | phase: {this.props.ctx.phase} | treasury: {this.props.G.republic.treasury} |
                                unrest: {this.props.G.republic.unrest} | legions: {this.props.G.republic.legions} | fleets: {this.props.G.republic.fleets}</p>
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

                        {this.props.ctx.phase === 'combat'
                        && <CombatBoard {...this.props}></CombatBoard>}

                        {this.props.ctx.phase === 'revolution'
                        && <RevolutionBoard {...this.props}></RevolutionBoard>}

                    </div>
                    <div className="col-sm-4">
                        <button onClick={() => this.goToGameState('forum', forumState)}>GO TO FORUM</button>
                        <button onClick={() => this.goToGameState('senate', senateState)}>GO TO SENATE</button>
                    </div>
                </div>

                <div className="col-sm-12">
                    <PlayerBoard {...this.props}></PlayerBoard>
                </div>

                <div className="col-sm-12">
                    <Neutrals {...this.props}></Neutrals>
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
