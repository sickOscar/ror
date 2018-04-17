import CombatTable from "./CombatTable";

export class War {

    constructor(model) {
        Object.assign(this, model);
    }

    assignResources(game) {

        this.assignedResources = {
            legions: this.landStrength,
            veterans: 0,
            navalSupport: this.navalSupport,
            naval: this.navalStrength
        };

        game.republic.legions -= this.landStrength;
        game.republic.fleets -= this.navalSupport + this.navalStrength;

        return game;
    }

    shouldDoNavalBattle() {
        return this.navalStrength && !this.navalResult;
    }

    processStandoff(game, roll) {
        if (roll === this.standoff) {

            this.battleResult = {
                losses: {
                    fleets: Math.ceil(this.assignedResources.naval / 4),
                    legions: Math.ceil(this.assignedResources.legions / 4)
                }
            }

            this.assignedResources.naval -= this.battleResult.losses.fleets;
            this.assignedResources.legions -= this.battleResult.losses.legions;

            if (this.shouldDoNavalBattle()) {
                this.navalResult = 'standoff';
            }
            if (this.shouldDoLandBattle()) {
                this.landResult = 'standoff';
            }
        }
        return game
    }

    processDisaster(game, roll) {
        if (roll === this.disaster) {

            if (this.shouldDoNavalBattle()) {
                this.navalResult = 'disaster';
            }
            if (this.shouldDoLandBattle()) {
                this.landResult = 'disaster';
            }

            this.battleResult = {
                losses: {
                    fleets: Math.ceil(this.assignedResources.naval / 2),
                    legions: Math.ceil(this.assignedResources.legions / 2)
                }
            }
            
            this.assignedResources.naval -= this.battleResult.losses.fleets;
            this.assignedResources.legions -= this.battleResult.losses.legions;

            game.republic.unrest += 1;
            
        }
        return game
    }

    processRollBattle(game, roll) {
        if (this.shouldComputeRollResult(game, roll)) {

            if (this.shouldDoNavalBattle()) {
                this.battleResult = roll + this.assignedResources.naval - this.navalStrength;
            }

            if (this.shouldDoLandBattle()) {
                this.battleResult = roll + this.assignedResources.legions - this.landStrength;
            }
            // check result on combat table
            const battle = CombatTable[this.battleResult];
            this.battleResult = battle;

            if (this.shouldDoNavalBattle()) {
                this.navalResult = battle.result;
            }
            if (this.shouldDoLandBattle()) {
                this.landResult = battle.result
            }

            this.assignedResources.naval -= Math.max(0, battle.losses.fleets);
            this.assignedResources.legions -= Math.max(0, battle.losses.legions);

        }

        return game
    }

    shouldComputeRollResult(game, roll) {
        return roll !== this.disaster && roll !== this.standoff
    }

    shouldDoLandBattle(game, roll) {
        return (!this.navalStrength || this.navalResult === 'victory') && !this.landResult
    }

    static areFought(wars) {
        return wars.reduce((fought, war) => {
            return fought && ( (war.navalStrength && war.navalResult) || war.landResult )
        }, true)
    }

}