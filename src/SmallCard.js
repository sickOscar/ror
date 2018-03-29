import React from 'react';

export const SmallCard = (props) => (
    <tr>
        <td>[{("0" + props.id).slice(-2)}]</td>
        <td>{props.type}</td>
        <td>{props.name}</td>
        <td>{props.talents}</td>
        <td>{props.popularity}</td>
        <td>{props.influence}</td>
        <td>{props.military}</td>
        <td>{props.oratory}</td>
        <td>{props.loyalty}</td>
    </tr>

)
