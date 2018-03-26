import _ from 'lodash';

export default class Utils {


    static findHRAOOrder(G) {
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

        order.filter(spoil => {
            return spoil.card;
        })

        return order;

    }


    static getPersuasableSenators(G, ctx) {

        let persuasable = [];
        for(let i = 0; i < Object.keys(G.players).length; i++) {
            if(i === parseInt(ctx.currentPlayer, 10)) {
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
        // Qui va dentro senza index e player
        persuasable = persuasable.concat(G.forum.senators.map(senator => ({senator})));
        return persuasable;

    }

    static getPlayersOrderedByDominance(G, ctx) {
        const pairedPlayers = _.toPairs(G.players);
        return _.orderBy(pairedPlayers, ['[1].dominance'])
    }

    static getRulingCoalition(G, majority) {
        const orderedPlayersByDominance = Utils.getPlayersOrderedByDominance(G);

        const plGameIndex = (index) => orderedPlayersByDominance[index][0]
        const pl = (index) => orderedPlayersByDominance[index][1]

        if (pl(0).votes > majority) {
            return [plGameIndex(0)]
        }
          
        if (pl(1).votes + pl(4).votes > majority) {
            return [plGameIndex(1), plGameIndex(4)]
        }

        if (pl(1).votes + pl(3).votes > majority) {
            return [plGameIndex(1), plGameIndex(3)]
        }

        if (pl(1).votes + pl(2).votes > majority) {
            return [plGameIndex(1), plGameIndex(2)]
        }

        if (pl(2).votes + pl(3).votes + pl(4).votes > majority) {
            return [plGameIndex(2), plGameIndex(3), plGameIndex(4)]
        }

        if (pl(0).votes + pl[4].votes > majority) {
            return [plGameIndex(0), plGameIndex(4)]
        }

        if (pl(0).votes + pl(3).votes > majority) {
            return [plGameIndex(0), plGameIndex(3)]
        }

        if (pl(0).votes + pl(2).votes > majority) {
            return [plGameIndex(0), plGameIndex(2)]
        }

        if (pl(0).votes + pl(1).votes > majority) {
            return [plGameIndex(0), plGameIndex(1)]
        }

        // TODO 9 - All Neutrals

        // TODO 10 - Largest Player Faction & Faction(s) of his choice

        return [];
    }

}