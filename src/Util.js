export default {

    findHRAO: (G) => {
        for(let i = 0; i < G.players.length; i++) {
            for(let j = 0; G.players[i].tableCards.length; j++) {
                if (G.players[i].tableCards[j].spoils.includes('ROME_CONSUL')) {
                    return G.players[i].tableCards[j];
                }
            }
        }
    }

}