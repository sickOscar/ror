import React from 'react';
import {EventCard} from "./Event";
import Utils from './Util';
import { War } from './War';

export default class ForumCardsBoard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div className="row">
                <div className="col-sm-12">

                    <div className="row border-top">
                        <div className="col-sm-12">
                            <h5>Forum Cards</h5>
                        </div>
                        {this.props.G.forum.senators.map(card => {
                            return <SenatorCard key={card.id} {...card}></SenatorCard>
                        })}
                        {this.props.G.forum.events.map(card => {
                            return <EventCard key={card.id} {...card}></EventCard>
                        })}
                    </div>

                    <div className="row border-top">
                        <div className="col-sm-12">
                            <h5>Active Wars</h5>
                        </div>
                        {this.props.G.republic.activeWars.map(war => {
                            return <WarCard key={war.id} war={war} game={this.props.G} className="col-sm-6">WAR {war.name}</WarCard>
                        })}
                    </div>

                    <div className="row border-top">
                        <div className="col-sm-12">
                            <h5>Inactive Wars</h5>
                        </div>
                        {this.props.G.republic.inactiveWars.map(war => {
                            return <WarCard key={war.id} game={this.props.G} war={war}></WarCard>
                        })}
                    </div>

                    <div className="row border-top">
                        <div className="col-sm-12">
                            <h5>Imminent Wars</h5>
                        </div>
                        {this.props.G.republic.imminentWars.map(war => {
                            return <WarCard key={war.id} game={this.props.G} war={war}></WarCard>
                        })}
                    </div>

                    <div className="row border-top">
                        <div className="col-sm-12">
                            <h5>Unprosecuted Wars</h5>
                        </div>
                        {this.props.G.republic.unprosecutedWars.map(war => {
                            return <WarCard key={war.id} game={this.props.G} war={war}></WarCard>
                        })}
                    </div>

                </div>
            </div>
        )
    }
}

const WarCard = (props) => {
    const classes = ["col-sm-12", "col-md-12", "animated bounceIn"]
    
    const war = new War(props.war);
    if (war.isActive(props.game)) {
        classes.push("active-war")
    }

    return (
        <div className={classes.join(' ')}>
            <p>WAR {props.war.name}</p>
            <p>land: {props.war.landStrength} | navalSupport: {props.war.navalSupport} | navalStrength: {props.war.navalStrength}</p>
            {props.war.assignedResources && 
                <p>on field: 
                     legions {props.war.assignedResources.legions} ({props.war.assignedResources.veterans} vets) | 
                    fleets {props.war.assignedResources.navalSupport + props.war.assignedResources.naval}
                   
                </p>
            }
            <p>needs: {Utils.getTalentsNeededForWar(props.war, props.game)}</p>
            <p>navalResult: {props.war.navalResult && <b>{props.war.navalResult}</b>}</p>
            <p>landResult: {props.war.landResult && <b>{props.war.landResult}</b>}</p>
        </div>
    )
};

const SenatorCard = (props) => (
    <div className="col-sm-12 col-md-12">
        SENATOR {props.name}
    </div>
);