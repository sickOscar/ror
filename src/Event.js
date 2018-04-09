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
                    return {
                        ...G,
                        mortalityChitsToDraw: 6
                    }
                },
                destroy: (G, ctx) => {
                    return {
                        ...G,
                        mortalityChitsToDraw: 1
                    }
                }
            }
        ));

        eventDeck.push(new EventModel({
                id: 9,
                name: "Drought",
                description: "Creates or worsen Drought conditions",
                apply: (G, ctx) => {
                    return {...G}
                },
                destroy: (G, ctx) => {
                    return {...G}
                }
            }
        ));

        eventDeck.push(new EventModel({
                id: 10,
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
                id: 11,
                name: "Storm at Sea",
                description: "2d6 Roman Fleets of the HRAO's choice are eliminated. There is no effect on legions although some may have to be withdrawn to Italy for lack of support if sufficient additional Fleets cannot be raised during the senate phase.",
                apply: (G, ctx) => {
                    const game = {...G}
                    return game;
                },
                destroy: (G, ctx) => {
                    return {...G}
                }
            }
        ));

        eventDeck.push(new EventModel({
                id: 12,
                name: "Manpower shortage",
                description: "The cost of raising legion and fleets are increased by 20",
                apply: (G, ctx) => {
                    const game = {...G};
                    game.legionCost += 20;
                    game.fleetCost += 20;
                    return game;
                },
                destroy: (G, ctx) => {
                    const game = {...G};
                    game.legionCost -= 20;
                    game.fleetCost -= 20;
                    return game;
                }
            }
        ));

        eventDeck.push(new EventModel({
                id: 13,
                name: "Allied Enthusiasm",
                description: "State receives 50t in the revenue phase",
                apply: (G, ctx) => {
                    const game = {...G};
                    return game;
                },
                destroy: (G, ctx) => {
                    const game = {...G};
                    return game;
                }
            }
        ));

        eventDeck.push(new EventModel({
                id: 14,
                name: "New Alliance",
                description: "A neutral state sides with Rome. The enemy sues for peace! Must be applied to a War or revolt of HRAO's choice at the end of senate phase. State collects half of the spoils. Shuffle the war in the top 6 cards of the deck. If revolt, then it is completely defeated;",
                apply: (G, ctx) => {
                    const game = {...G};
                    return game;
                },
                destroy: (G, ctx) => {
                    const game = {...G};
                    return game;
                }
            }
        ));

        eventDeck.push(new EventModel({
                id: 15,
                name: "Rhodian Alliance",
                description: "If no current war requires fleets, this event is discarded. The state receives 8 free fleets. 8 fleets must be disbanded upon the defeat of current war at the end of combat phase. this card can be rejected by a vote in the senate phase.",
                apply: (G, ctx) => {
                    const game = {...G};
                    return game;
                },
                destroy: (G, ctx) => {
                    const game = {...G};
                    return game;
                }
            }
        ));

        eventDeck.push(new EventModel({
                id: 16,
                name: "Enemy ally deserts",
                description: "All battles fought this turn with a 3d6 odd result wil result in a temporary decrease of the war's strength ofr this turn equal to the result of the black die.",
                apply: (G, ctx) => {
                    const game = {...G};
                    return game;
                },
                destroy: (G, ctx) => {
                    const game = {...G};
                    return game;
                }
            }
        ));

        eventDeck.push(new EventModel({
                id: 17,
                name: "Enemy leader Dies",
                description: "At the end of the forum phase, the HRAO chooses one enemy leader in play to be discarded",
                apply: (G, ctx) => {
                    const game = {...G};
                    return game;
                },
                destroy: (G, ctx) => {
                    const game = {...G};
                    return game;
                }
            }
        ));

        eventDeck.push(new EventModel({
                id: 18,
                name: "Trial of Verres - 70BC",
                description: "During the next revenue phase, the state income from every province is increased by 3, Governor provincial spoil are decreased by the same amount",
                apply: (G, ctx) => {
                    const game = {...G};
                    return game;
                },
                destroy: (G, ctx) => {
                    const game = {...G};
                    return game;
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