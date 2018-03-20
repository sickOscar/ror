
export default class Bot {

    static play(phase, G, ctx) {
        switch(phase) {
            case 'revenue':
                return Bot._getRevenuePlayedState(G, ctx);
            default:
                return {...G}
        }
    }

    static _getRevenuePlayedState(G, ctx) {

        const game = {...G}

        var player = game.players[ctx.currentPlayer];
        console.log('playing', player);

        return game;
    }


}