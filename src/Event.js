import React from 'react';

export class EventModel {

    constructor(info) {
        Object.assign(this, info);

    }

    static buildDeck() {

        const eventDeck = [];

        eventDeck.push(new EventModel({
                id: 3,
                name: "Mob Violence",
                description: "Draw Mortality Chits equal to the current Unrest Level. Only those Senators in Rome and whose popularity is less than current Unrest Level can be killed",
                // TODO do the card!!
                apply: (G, ctx) => {
                    const game = {...G};
                    return game;
                },
                destroy: (G, ctx) => {
                    return {...G}
                }
            }
        ));

        eventDeck.push(new EventModel({
                id: 4,
                name: "Natural Disaster",
                description: "The state treasury must immediately pay 50t for relief",
                // TODO destroy concessions. Andare a vedere la carta
                apply: (G, ctx) => {
                    const game = {...G};
                    game.republic.treasury -= 50;
                    return game;
                },
                destroy: (G, ctx) => {
                    return {...G}
                }
            }
        ));

        eventDeck.push(new EventModel({
                id: 5,
                name: "Ally Deserts",
                description: "Roman allies are wavering. ",
                // TODO All battles fought this turn with an even result on3d6 will result in a temporary increase to the War card's strenght for this turn equal to the result on the black die.
                apply: (G, ctx) => {
                    const game = {...G};
                    game.republic.treasury -= 20;
                    return game;
                },
                destroy: (G, ctx) => {
                    return {...G}
                }
            }
        ));

        eventDeck.push(new EventModel({
                id: 6,
                name: "Evil Omens",
                description: "The state treasury must immediately pay 20t or sacrifices and temple repair",
                // TODO -1 penalty is applied to Every die or dice roll except fo initiative and further roll on event table (Exception: +1 to all persuasion attempts)
                apply: (G, ctx) => {
                    const game = {...G};
                    game.republic.treasury -= 20;
                    return game;
                },
                destroy: (G, ctx) => {
                    return {...G}
                }
            }
        ));

        eventDeck.push(new EventModel({
                id: 7,
                name: "Refuge",
                description: "The next enemy leader killed by a Victory will instead be given Refugee by next war card drawn",
                apply: (G, ctx) => {
                    return {...G}
                },
                destroy: (G, ctx) => {
                    return {...G,}
                }
            }
        ));

        eventDeck.push(new EventModel({
                id: 8,
                name: "Epidemic",
                description: "Draw six Mortality Chits",
                apply: (G, ctx) => {
                    return {...G, 
                        mortalityChitsToDraw: 6
                    }
                },
                destroy: (G, ctx) => {
                    return {...G,
                        mortalityChitsToDraw: 1
                    }
                }
            }
        ));

        return eventDeck;

    }

}

export const EventCard = (props) => {
    return (
        <div>
            {props.name} - {props.description}
        </div>
    )
};

export const EventDeck = EventModel.buildDeck();