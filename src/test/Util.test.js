import Utils from '../Util';

describe('#hasAdequateForce', () => {

    it('should return an empty array if no war is passed or present', () => {
        const G = {
            republic: {
                activeWars: [],
                inactiveWars: []
            }
        }
        const hasForce = Utils.hasAdequateForce(G);
        expect(hasForce).toBeInstanceOf(Array);
        expect(hasForce).toHaveLength(0);
    })

    it('shuld return empty array if war passed can\'t be fought', () => {
        const G = {
            republic: {
                activeWars: [],
                inactiveWars: [],
                legions: 0,
                fleets: 0,
                treasury: 0
            },
            legionCost: 10,
            fleetCost: 10
        }
        const wars = [
            {
                landStrength: 1,
                navalSupport: 1,
                navalStrength: 1
            }
        ]
        const hasForce = Utils.hasAdequateForce(G);
        expect(hasForce).toBeInstanceOf(Array);
        expect(hasForce).toHaveLength(0);
    })

    it('should return empty array if active war can\'t be fought', () => {
        const G = {
            republic: {
                activeWars: [{
                    landStrength: 1,
                    navalSupport: 1,
                    navalStrength: 1
                }],
                inactiveWars: [],
                legions: 0,
                fleets: 0,
                treasury: 0
            },
            legionCost: 10,
            fleetCost: 10
        }
        const hasForce = Utils.hasAdequateForce(G);
        expect(hasForce).toBeInstanceOf(Array);
        expect(hasForce).toHaveLength(0);
    })

    it('should return the war if active war can be fought', () => {
        const G = {
            republic: {
                activeWars: [{
                    landStrength: 1,
                    navalSupport: 1,
                    navalStrength: 1
                }],
                inactiveWars: [],
                legions: 0,
                fleets: 0,
                treasury: 30
            },
            legionCost: 10,
            fleetCost: 10
        }
        const hasForce = Utils.hasAdequateForce(G);
        expect(hasForce).toBeInstanceOf(Array);
        expect(hasForce).toHaveLength(1);
    })

})

describe('#canBuildToFight', () => {

    it('should return true if the republic has enough treasury to build war and modify Game', () => {
        const G = {
            republic: {
                treasury: 100,
                legions: 0,
                fleets: 0
            },
            fleetCost: 10,
            legionCost: 10
        }
        const war = {
            landStrength: 1,
            navalSupport: 1,
            navalStrength: 1
        }
        expect(Utils.canBuildToFight(war, G)).toEqual(true);
        expect(G.republic.treasury).toEqual(70);
    })

})

describe('#getTalentsNeededForWar', () => {

    it('should compute the correct cost of a war in case of no legions or fleets', () => {

        const war = {
            landStrength: 10,
            navalSupport: 5,
            navalStrength: 10
        }
        const game = {
            legionCost: 10, 
            fleetCost: 10,
            republic: {
                legions: 0,
                fleets: 0
            }
        }

        const cost = Utils.getTalentsNeededForWar(war, game);
        expect(cost).toEqual(250);
    })

    it('should compute the correct cost having legions', () => {

        const war = {
            landStrength: 10,
            navalSupport: 5,
            navalStrength: 10
        }
        const game = {
            legionCost: 10, 
            fleetCost: 10,
            republic: {
                legions: 4,
                fleets: 0
            }
        }

        const cost = Utils.getTalentsNeededForWar(war, game);
        expect(cost).toEqual(210);
    })

    it('should compute the correct cost having more legions than landStrength', () => {

        const war = {
            landStrength: 10,
            navalSupport: 5,
            navalStrength: 10
        }
        const game = {
            legionCost: 10, 
            fleetCost: 10,
            republic: {
                legions: 30,
                fleets: 0
            }
        }

        const cost = Utils.getTalentsNeededForWar(war, game);
        expect(cost).toEqual(150);
    })

    it('should compute the correct cost having fleets for support', () => {

        const war = {
            landStrength: 10,
            navalSupport: 5,
            navalStrength: 10
        }
        const game = {
            legionCost: 10, 
            fleetCost: 10,
            republic: {
                legions: 0,
                fleets: 5
            }
        }

        const cost = Utils.getTalentsNeededForWar(war, game);
        expect(cost).toEqual(200);
    })

    it('should compute the correct cost having not enough fleets for support', () => {

        const war = {
            landStrength: 10,
            navalSupport: 5,
            navalStrength: 10
        }
        const game = {
            legionCost: 10, 
            fleetCost: 10,
            republic: {
                legions: 0,
                fleets: 2
            }
        }

        const cost = Utils.getTalentsNeededForWar(war, game);
        expect(cost).toEqual(230);
    })

    it('should compute the correct cost having more fleets than support', () => {

        const war = {
            landStrength: 10,
            navalSupport: 5,
            navalStrength: 10
        }
        const game = {
            legionCost: 10, 
            fleetCost: 10,
            republic: {
                legions: 0,
                fleets: 8
            }
        }

        const cost = Utils.getTalentsNeededForWar(war, game);
        expect(cost).toEqual(170);
    })

    it('should compute the correct cost having more fleets than needed', () => {

        const war = {
            landStrength: 10,
            navalSupport: 5,
            navalStrength: 10
        }
        const game = {
            legionCost: 10, 
            fleetCost: 10,
            republic: {
                legions: 0,
                fleets: 16
            }
        }

        const cost = Utils.getTalentsNeededForWar(war, game);
        expect(cost).toEqual(100);
    })

})