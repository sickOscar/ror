import React from 'react';
import './stylesheets/common.css'
import './stylesheets/Card.css'
import { Spoils } from './Spoil';

export const Card = (props) => {
    
    let mainClass = 'game-card';
    
    if (props.isFactionLeader) {
        mainClass += ' faction-leader';
    }
    if (props.active) {
        mainClass += ' active-selected';
    }
    if (props.passive) {
        mainClass += ' passive-selected';
    }
    
    const ROME_CONSUL = props.spoils.map(s => s.id).includes('ROME_CONSUL')
        ? <small><b>ROME_CONSUL</b></small>
        : ''

    const FIELD_CONSUL = props.spoils.map(s => s.id).includes('FIELD_CONSUL')
        ? <small><b>FIELD_CONSUL</b></small>
        : ''
    
    return (
    <div className={mainClass} >
        
        <div className="row">
            
            <div className="col-sm-9 align-center align-middle">
                <small>[{props.id}]</small>&nbsp;-&nbsp;
                {!props.isFactionLeader
                    ? <b>{props.name}</b>
                    : <i><b>{props.name}</b></i>
                }
            </div>
            
            <div className="col-sm-3 align-center align-middle">
                {ROME_CONSUL}
                {FIELD_CONSUL}
            </div>
            
        </div>    
        
        
        <div className="row">
            
            <div className="col-sm-3 align-center align-middle">
                <small>Talents</small>
                {
                    (props.active || props.passive) && props.oldData
                        ? <p className="card-value">{props.oldData.talents} -> {props.talents}</p>
                        : <p className="card-value">{props.talents}</p>
                }
                
            </div>
            
            <div className="col-sm-6 align-center align-middle">

            </div>
            
            <div className="col-sm-3 align-center align-middle">
                <p>
                    <small>Military {props.military}</small><br/> 
                    <small>Oratory {props.oratory}</small> <br/>
                    <small>Loyalty {props.loyalty}</small><br/>
                </p>
            </div>
            
        </div>
        
        
        <div className="row">
            
            <div className="col-sm-3 align-center align-middle">
                <small>Popularity</small>
                {
                    (props.active || props.passive) && props.oldData
                        ? <p className="card-value">{props.oldData.popularity} -> {props.popularity}</p>
                        : <p className="card-value">{props.popularity}</p>
                }</div>
            
            <div className="col-sm-6 align-center align-middle">
                <small>Influence</small>
                {
                    (props.active || props.passive) && props.oldData
                        ? <p className="card-value">{props.oldData.influence} -> {props.influence}</p>
                        : <p className="card-value">{props.influence}</p>
                }
            </div>
            
            <div className="col-sm-3 align-center align-middle">
                <small>Knights</small>
                {
                    (props.active || props.passive) && props.oldData
                        ? <p className="card-value">{props.oldData.knights} -> {props.knights}</p>
                        : <p className="card-value">{props.knights}</p>
                }
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

    addSpoil(label) {
        const spoil = Spoils[label];
        this.influence += spoil.influence;
        this.spoils.push(spoil);
    }

    
}
