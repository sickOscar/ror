import React from 'react';

export const SmallCard = (props) => {
    
    
    let mainClass = '';
    
    if (props.active) {
        mainClass += ' active-selected';
    }
    if (props.passive) {
        mainClass += ' passive-selected';
    }
    
    return (
        <tr className={mainClass}>
            <td>[{("0" + props.id).slice(-2)}]</td>
            <td>{props.type}</td>
            <td>{props.name}</td>
            <td>{props.military}</td>
            <td>{props.oratory}</td>
            <td>{props.loyalty}</td>
            {
                (props.active || props.passive) && props.oldData
                    ? <td>{props.oldData.popularity} -> {props.popularity}</td>
                    : <td>{props.popularity}</td>
            }
            {
                (props.active || props.passive) && props.oldData
                    ? <td>{props.oldData.influence} -> {props.influence}</td>
                    : <td>{props.influence}</td>
            }
            {
                (props.active || props.passive) && props.oldData
                    ? <td>{props.oldData.knights} -> {props.knights}</td>
                    : <td>{props.knights}</td>
            }
            {
                (props.active || props.passive) && props.oldData
                    ? <td>{props.oldData.talents} -> {props.talents}</td>
                    : <td>{props.talents}</td>
            }
        </tr>
    )

}
