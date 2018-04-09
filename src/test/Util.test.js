import Utils from '../Util';

describe('hasAdequateForce', () => {

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

describe('canBuildToFight', () => {

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