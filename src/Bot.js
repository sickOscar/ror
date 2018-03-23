
export default class Bot {

    static play(phase, G, ctx) {
        switch(phase) {
            case 'revenue':
                return Bot._getRevenuePlayedState(G, ctx);
            case 'forum':
                return Bot._getForumPlayedState(G, ctx);
            default:
                return {...G}
        }
    }

    static _getRevenuePlayedState(G, ctx) {

        const game = {...G}

        var player = game.players[parseInt(ctx.currentPlayer, 10)];
        console.log('playing', player);

        return game;
    }


    static _getForumPlayedState(G, ctx) {

        const game = {...G}
        
        var player = game.players[parseInt(ctx.currentPlayer, 10)];
        console.log('playing', player);

        return game;
    }


}