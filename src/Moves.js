import {DeckModel} from './Deck';

export default class Moves {

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

}