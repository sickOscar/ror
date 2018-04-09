import Utils from "./Util";
import _ from 'lodash';

export default class MilitaryPlan {

    static applyNeutralPlan(game, ctx) {
        game.militaryPlan = {
            description: 'No military plan applicable',
            attacks: []
        };
        return game;
    }

    static applyPeacePlan(game, ctx) {

        // mantain basic legion and fleet
        const toReachMinimumLegions = 10 - game.republic.legions;
        const toReachMinimumLegionsCost = toReachMinimumLegions * game.legionCost
        if (toReachMinimumLegions > 0 && toReachMinimumLegions < game.republic.treasury) {
            console.log('create', toReachMinimumLegions, ' legions for', toReachMinimumLegionsCost);
        }

        const toReachMinimumFleet = 5 - game.republic.fleets;
        const toReachMinimumFleetCost = toReachMinimumFleet * game.fleetCost;
        if (toReachMinimumFleet > 0 && toReachMinimumFleet < game.republic.treasury) {
            console.log('create', toReachMinimumFleet, 'fleet for', toReachMinimumFleetCost)
        }

        if (toReachMinimumLegionsCost + toReachMinimumFleetCost < game.republic.treasury) {
            game.republic.legions += toReachMinimumLegions;
            game.republic.fleets += toReachMinimumFleet;
            game.republic.treasury -= toReachMinimumLegionsCost + toReachMinimumFleetCost;
        }

        game.militaryPlan = {
            description: "Rome is at peace, maintain the minimum at 10 legion and 5 fleets",
            attacks: []
        }

        return game;
    }

    static applyPlan1(G, ctx) {
        console.log('apply military 1');
        return {...G}
    }

    static applyPlan2(G, ctx) {
        console.log('apply military 2');
        return {...G}
    }

    static applyPlan3(G, ctx) {
        console.log('apply military 3');
        return {...G}
    }

    // plan 4 - Attack an Inactive War with Adequate Force
    static applyPlan4(G, ctx) {

        const game = _.cloneDeep(G);
        const toFight = Utils.hasAdequateForce(game)[0][0];
        console.log(toFight);

        const landCost = Math.max(0, toFight.landStrength - G.republic.legions) * G.legionCost;
        
        const fleetsLeftAfterSupport = Math.max(0, G.republic.fleets - toFight.navalSupport);
        const navalCost = (toFight.navalSupport * G.fleetCost) 
            + (Math.max(0, toFight.navalStrength - fleetsLeftAfterSupport) * G.fleetCost);

        G.republic.treasury -= (landCost + navalCost);
        G.republic.fleets = toFight.navalStrength + toFight.navalSupport;
        G.republic.legions = toFight.landStrength;

        G.republic.activeWars.push(toFight);

        G.militaryPlan = {
            description: 'Apply military Plan 4 || Attack an Inactive War with Adequate Force',
            attacks: [toFight]
        }

        _.remove(G.republic.inactiveWars, war => war.id === toFight.id)
        

        console.log('apply military 4');
        return {...G}
    }

}