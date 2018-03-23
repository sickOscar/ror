export default {


    findHRAOOrder: (G) => {
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

        return order;

    },


    getPersuasableSenators: (G, ctx) => {

        let persuasable = [];
        for(let i = 0; i < Object.keys(G.players).length; i++) {
            if(i == ctx.currentPlayer) {
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

        persuasable = persuasable.concat(G.forum.senators.map(senator => ({senator})));
        return persuasable;

    }


}