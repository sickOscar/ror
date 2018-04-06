import _ from 'lodash';

export default class Utils {


    static findHRAOOrder(G) {
        const order = [
            {
                id: 'ROME_CONSUL',
            },
            {
                id: 'FIELD_CONSUL'
            }
        ];

        for(let i = 0; i < Object.keys(G.players).length; i++) {
            for(let j = 0; j < G.players[i].tableCards.length; j++) {

                let spoils = G.players[i].tableCards[j].spoils;

                if (spoils && spoils.map(s => s.id).includes('ROME_CONSUL')) {
                    let rank = order.find(r => r.id === 'ROME_CONSUL')
                    rank.player = G.players[i];
                    rank.index = i;
                    rank.card = G.players[i].tableCards[j];
                }

                if (spoils && spoils.map(s => s.id).includes('FIELD_CONSUL')) {
                    let rank = order.find(r => r.id === 'FIELD_CONSUL')
                    rank.player = G.players[i];
                    rank.index = i;
                    rank.card = G.players[i].tableCards[j];
                }

            }
        }

        order.filter(spoil => {
            return spoil.card;
        })

        return order;

    }


    static getPersuasableSenators(G, ctx) {

        let persuasable = [];
        for(let i = 0; i < Object.keys(G.players).length; i++) {
            if(i === parseInt(ctx.currentPlayer, 10)) {
                continue;
            }
            for(let j = 0; j < G.players[i].tableCards.length; j++) {
                if (G.players[i].tableCards[j].isFactionLeader) {
                    continue;
                }
                persuasable.push({
                    senator: G.players[i].tableCards[j],
                    player: G.players[i],
                    index: i
                })
            }
        }
        // Qui va dentro senza index e player
        persuasable = persuasable.concat(G.forum.senators.map(senator => ({senator})));
        return persuasable;

    }

    static getPlayersOrderedByDominance(G, ctx) {
        const pairedPlayers = _.toPairs(G.players);
        return _.orderBy(pairedPlayers, ['[1].dominance'])
    }

    static getRulingCoalition(G, majority) {
        const orderedPlayersByDominance = Utils.getPlayersOrderedByDominance(G);

        const plGameIndex = (index) => orderedPlayersByDominance[index][0]
        const pl = (index) => orderedPlayersByDominance[index][1]

        if (pl(0).votes > majority) {
            return [plGameIndex(0)]
        }
          
        if (pl(1).votes + pl(4).votes > majority) {
            return [plGameIndex(1), plGameIndex(4)]
        }

        if (pl(1).votes + pl(3).votes > majority) {
            return [plGameIndex(1), plGameIndex(3)]
        }

        if (pl(1).votes + pl(2).votes > majority) {
            return [plGameIndex(1), plGameIndex(2)]
        }

        if (pl(2).votes + pl(3).votes + pl(4).votes > majority) {
            return [plGameIndex(2), plGameIndex(3), plGameIndex(4)]
        }

        if (pl(0).votes + pl[4].votes > majority) {
            return [plGameIndex(0), plGameIndex(4)]
        }

        if (pl(0).votes + pl(3).votes > majority) {
            return [plGameIndex(0), plGameIndex(3)]
        }

        if (pl(0).votes + pl(2).votes > majority) {
            return [plGameIndex(0), plGameIndex(2)]
        }

        if (pl(0).votes + pl(1).votes > majority) {
            return [plGameIndex(0), plGameIndex(1)]
        }

        // TODO 9 - All Neutrals

        // TODO 10 - Largest Player Faction & Faction(s) of his choice

        return [];
    }

    static isCrisis(G) {
        const bigWar = G.republic.activeWars.reduce((isBigWar, war) => {
            return bigWar || war.stregth > 15
        }, false);
        // TODO control if at least 1 senator is rebel
        const rebel = false;
        return G.republic.activeWars.length >= 3 || bigWar || rebel; 
    }

    static anyWarPresent(G) {
        return G.republic.activeWars.length !== 0
            || G.republic.inactiveWars.length !== 0
            || G.republic.imminentWars.length !== 0
            || G.republic.unprosecutedWars.length !== 0
    }

    /**
     * 4.05.32
     * 
     * A War is “Dangerous” if it has matching cards waiting to be drawn regardless 
     * of whether or not it is currently Active. 
     * 
     * The measure of the relative danger such Wars pose when more than one is in play 
     * is determined by the force that would be Adequate against it if all of those 
     * remaining matching cards were in play.
     * 
     * @param {*} G 
     */
    static anyDangerousWar(G) {
        return false;
    }

    /**
     * 4.05.31
     * 
     * “Adequate Force” is defined as a number of Legions (or Fleets in the case of Naval Battles) 
     * equal to the Strength of the opposing War. 
     * 
     * Commander and Veteran bonuses are not calculated in determining whether a force is adequate.
     *  
     * The minimum number of Fleets is always used in support. 
     * 
     * Half (fractions rounded down) of any excess Legions (or Fleets in the case of Naval Battles) 
     * up to the maximum modi er of +15 not committed to any battle accompany the “Adequate Force”.
     *  
     * Veterans owing allegiance to any Senator of the Commander’s Faction will accompany that force.
     *  
     * Otherwise, commitment of excess Veterans and the decision of which Commander  
     * fights which of the two Wars being attacked is at the discretion of the Dominant Player. 
     * 
     * __________________________________________________________________________________
     * 
     * Checks all wars passed (or if not passed, checks active wars) and finds a combination
     * of wars that can be fought
     * 
     * @param {*} G 
     * @return Array ok ids of wars which can be fought
     */
    static hasAdequateForce(G, warsToCheck) {
        // deve controllare quenti build di legion + flotte possono essere fatti e fare i conti

        warsToCheck = warsToCheck || G.republic.activeWars;

        // const maxBuildableLegions = Math.floor(G.republic.treasury / G.legionCost);
        // const maxBuildableFleet = Math.floor(G.republic.treasury / G.fleetCost);

        warsToCheck = _.orderBy(warsToCheck, war => war.landStrength);

        const game = {...G};

        const canBuildToFightArray = warsToCheck.map(war => Utils.canBuildToFight(war, game));
        // console.log('canBuildToFightArray', canBuildToFightArray)
        const fightable = _.zip(warsToCheck, canBuildToFightArray)
            .filter(pair => pair[1]) // get those with canFight === true

        return fightable;
    }

    /**
     * 
     * Return true or false, changes game object passed so the next call has an updated game
     * if previous iterations have found a fightable war
     * 
     * @param {*} game 
     * @param {*} war 
     * @return boolean
     */
    static canBuildToFight(war, game) { 

        // already has force to fight
        if (game.republic.legions >= war.landStrength && game.republic.fleets >= war.navalSupport + war.navalStrength) {
            return true;
        } 

        const fleetsToBuild = (war.navalSupport + war.navalStrength) - game.republic.fleets;
        const legionsToBuild = war.landStrength - game.republic.legions;
        const totalCost = (fleetsToBuild * game.fleetCost) + (legionsToBuild * game.legionCost);

        if (totalCost <= game.republic.treasury) {
            // can build
            game.republic.treasury -= totalCost;
            return true;
        }

        return false;

    }

}