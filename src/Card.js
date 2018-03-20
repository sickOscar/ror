import React from 'react';
import './Card.css';

export const Card = (props) => {

    let mainClass = 'game-card';
    if (props.isFactionLeader) {
        mainClass += ' faction-leader';
    }

    return (
    <div className={mainClass}>
        <div className="row">
            <div className="col-sm-1">
                <small>[{props.id}]</small>
            </div>
            <div className="col-sm-10">
                <p className="text-center card-value">
                    {!props.isFactionLeader  
                        ? <b>{props.name}</b>
                        : <i><b>{props.name}</b></i>
                    }
                </p>
            </div>
        </div>    
        <div className="row">
            <div className="col-sm-3">
                <small>Talents</small>
                <p className="card-value">{props.talents}</p>
            </div>
            <div className="col-sm-6">

            </div>
            <div className="col-sm-3">
                <p>
                    <small>Mil {props.military}</small><br/> 
                    <small>Ora {props.oratory}</small> <br/>
                    <small>Loy {props.oratory}</small><br/>
                </p>
            </div>
        </div>
        <div className="row">
            <div className="col-sm-3">
                <small>Poluparity</small>
                <p className="card-value">{props.popularity}</p>
            </div>
            <div className="col-sm-6 text-center">
                <small>Influence</small>
                <p className="card-value">{props.influence}</p>
            </div>
            <div className="col-sm-3">
                <small>Knights</small>
                <p className="card-value">{props.knights}</p>
            </div>
        </div>
    </div>
)}


export class CardModel {

    constructor(model) {
        Object.assign(this, model);
    }

    addRevenueTalents() {
        let sumTalents = 1;
        if (this.type === 'senator') {
            if (this.isFactionLeader) {
                sumTalents = 3
            }
            sumTalents += this.knights ? this.knights : 0;
            this.talents += sumTalents;
        }
    }

}
