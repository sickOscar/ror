import Moves from '../Moves';
import { DeckModel } from '../Deck';

describe('#moves', () => {

    describe('drawForumCard', () => {

        let drawFromTopMock;

        beforeEach(() => {
            drawFromTopMock = jest.spyOn(DeckModel, 'drawFromTop')                
        })

        afterEach(() => {
            drawFromTopMock.mockRestore()
        })
        
        it('should add an active war to activeWars if drawn', () => {

            drawFromTopMock.mockImplementation(() => {
                return {
                    type: "war",
                    armament: true,
                    id: '001'
                }
            });

            const G = {
                republic: {
                    activeWars: []
                }
            }

            const game = Moves.drawForumCard(G, {});
            expect(game.republic.activeWars).toHaveLength(1);
            expect(game.republic.activeWars[0].id).toEqual('001')

        })

        it('should add an INACTIVE war to inactiveWars if drawn', () => {

            drawFromTopMock.mockImplementation(() => {
                return {
                    type: "war",
                    armament: false,
                    id: '001'
                }
            });

            const G = {
                republic: {
                    activeWars: [],
                    inactiveWars: []
                }
            }

            const game = Moves.drawForumCard(G, {});
            expect(game.republic.activeWars).toHaveLength(0);
            expect(game.republic.inactiveWars).toHaveLength(1);
            expect(game.republic.inactiveWars[0].id).toEqual('001')

        })

        it('should add a senator to forum senator', () => {
            drawFromTopMock.mockImplementation(() => {
                return {
                    type: "senator",
                    id: '001'
                }
            });

            const G = {
                forum: {
                    senators: []
                }
            }

            const game = Moves.drawForumCard(G, {});
            expect(game.forum.senators).toHaveLength(1);
            expect(game.forum.senators[0].id).toEqual('001')

        })
    })

})