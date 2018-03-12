import React from 'react';

export const Card = (props) => (
    <div>
        {props.type} - {props.name} - {props.talents}
    </div>
)


export class CardModel {

    constructor(model) {
        Object.assign(this, model);
    }

}
