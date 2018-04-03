export default class MilitaryPlan {

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

    }

    static applyPlan2(G, ctx) {

    }

    static applyPlan3(G, ctx) {

    }

    static applyPlan4(G, ctx) {
        
    }

}