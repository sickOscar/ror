import React from 'react';

export class EventModel {

    constructor(info) {
        Object.assign(this, info);

    }

    static buildDeck() {

        const eventDeck = [];

        eventDeck.push(new EventModel({
                id: 8,
                name: "Epidemic",
                description: "Epidemic Desctiption",
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
        ))

        return eventDeck;

    }

}

export const EventCard = (props) => {
    return (
        <div>
            {props.name} - {props.description}
        </div>
    )
}

export const EventDeck = EventModel.buildDeck();