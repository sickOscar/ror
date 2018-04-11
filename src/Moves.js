import {DeckModel} from './Deck';
import {Random} from 'boardgame.io/core';
import _ from 'lodash';
import Utils from './Util';
import MilitaryPlan from './MilitaryPlan';

const earlyDeck = new DeckModel('early');
const middleDeck = new DeckModel('middle');
const lateDeck = new DeckModel('late');

export default class Moves {

    static drawMortalityChit(G, ctx) {
        let senatorsToKill = [];
        for (let i = 0; i < G.mortalityChitsToDraw; i++) {
            senatorsToKill.push(Random.Die(36).toString()); // 36
        }
        const game = { ...G };
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
        return { ...G, mortalityChits: senatorsToKill }
    }

    static drawForumCard(G, ctx) {
        const game = {...G};
        const card = DeckModel.drawFromTop(game.forumDeck);

        console.log('drawn', card)

        switch (card.type) {
            case 'senator':
                game.forum.senators.push(card);
                break;
            case 'concession':
                game.forum.concessions.push(card);
                break;
            case 'war':
                if (card.armament) {
                    game.republic.activeWars.push(card);
                } else {
                    game.republic.inactiveWars.push(card);
                }
                break;
            default:
                break;
        }

        return {...game}
    }

    static distributeTalents(G, ctx, talentsObject) {
        const game = {...G};
        const players = Object.assign({}, G.players);
        const originalSenators = players[ctx.currentPlayer].tableCards;
        players[ctx.currentPlayer].talents = talentsObject.familyTalents;
        _.each(talentsObject.senators, senator => {
            let originalSenator = _.find(originalSenators, { id: senator.id });
            if (senator.talents !== originalSenator.talents) {
                game.interface.selectedCard.passive.push(senator.id);
                senator.oldData = _.pick(originalSenator, ['talents']);
            }
        });
        players[ctx.currentPlayer].tableCards = Object.values(talentsObject.senators);
        return { ...G, players}
    }

    static doStateContribution(G, ctx, contributor, contribution) {
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
    }

    static doMilitaryPlan(G, ctx) {
        let game = {...G};

        const isCrisis = Utils.isCrisis(game);

        let foundAvailablePlan = false;

        if (!Utils.anyWarPresent(game)) {
            game = MilitaryPlan.applyPeacePlan(game);
            foundAvailablePlan = true;
        } else {

            // plan 1 - Attack two Active Wards with Adequate Force
            if (game.republic.activeWars.length > 1 && Utils.hasAdequateForce(game).length > 1) {
                game = MilitaryPlan.applyPlan1(game, ctx);
                foundAvailablePlan = true;
            } 

            // plan 2 - Attack a Dangerous War with Adequate Force
            else if (Utils.anyDangerousWar(game) && Utils.hasAdequateForce(game).length > 0) {
                // intersect di Utils.anyDangerousWar(G) e Util.hasAdequateForce(G)
                // prendo il primo elemento
                game = MilitaryPlan.applyPlan2(game, ctx);
                foundAvailablePlan = true;
            } 

            // plan 3 - Attack an Active War with Adequate Force
            else if (game.republic.activeWars.length > 0 && Utils.hasAdequateForce(game).length === 1) {
                // controllare che Util.hasAdequateForce(G)[0] sia inclusa in game.republic.activeWars
                game = MilitaryPlan.applyPlan3(game, ctx);
                foundAvailablePlan = true;
            } 
            
            // plan 4 - Attack an Inactive War with Adequate Force
            else if (game.republic.inactiveWars.length > 0 && Utils.hasAdequateForce(game).length === 1) {
                // controllare che Util.hasAdequateForce(G)[0] sia inclusa in game.republic.inactiveWars
                game = MilitaryPlan.applyPlan4(game, ctx);
                foundAvailablePlan = true;
            }
        }

        if (!foundAvailablePlan) {
            game = MilitaryPlan.applyNeutralPlan(game);
        }

        return game;
    }

    static attackWar(G, ctx, warToAttack) {

        const game = _.cloneDeep(G);

        const war = game.republic.activeWars.find(w => warToAttack.id === w.id);

        war.assignedResources = {
            legions: war.landStrength,
            veterans: 0,
            navalSupport: war.navalSupport,
            naval: war.navalStrength
        };

        game.republic.legions -= war.landStrength;
        game.republic.fleets -= war.navalSupport + war.navalStrength;

        if (war.navalStrength && !war.navalVictory) {
            const roll = Random.Die(6, 3).reduce((sum, next) => sum + next, 0);
            war.navalBattleResult = roll + war.assignedResources.naval - war.navalStrength;

            if (war.navalBattleResult === war.standoff) {
                console.log('STANDOFF')
                war.assignedResources.naval -= Math.ceil(war.assignedResources.naval / 4);
                console.log(war)
            }
            

        }


        console.log(game.militaryPlan)
        const attacksIndex = game.militaryPlan.attacks.findIndex(w => w.id === war.id);
        game.militaryPlan.attacks[attacksIndex] = war;

        
        return {...game};

    }

}