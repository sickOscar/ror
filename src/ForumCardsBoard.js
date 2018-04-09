import React from 'react';
import {EventCard} from "./Event";

export default class ForumCardsBoard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div className="row">
                <div className="col-sm-12">

                    <div className="row">
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


                    <div className="row">
                        <div className="col-sm-12">
                            <h5>Active Wars</h5>
                        </div>
                        {this.props.G.republic.activeWars.map(war => {
                            return <WarCard key={war.id} className="col-sm-6">WAR {war.name}</WarCard>
                        })}
                    </div>

                    <div className="row">
                        <div className="col-sm-12">
                            <h5>Inactive Wars</h5>
                        </div>
                        {this.props.G.republic.inactiveWars.map(war => {
                            return <WarCard key={war.id} {...war}></WarCard>
                        })}
                    </div>

                    <div className="row">
                        <div className="col-sm-12">
                            <h5>Imminent Wars</h5>
                        </div>
                        {this.props.G.republic.imminentWars.map(war => {
                            return <WarCard key={war.id} {...war}></WarCard>
                        })}
                    </div>

                    <div className="row">
                        <div className="col-sm-12">
                            <h5>Unprosecuted Wars</h5>
                        </div>
                        {this.props.G.republic.unprosecutedWars.map(war => {
                            return <WarCard key={war.id} {...war}></WarCard>
                        })}
                    </div>

                </div>
            </div>
        )
    }
}

const WarCard = (props) => (
    <div className="col-sm-12 col-md-6">
        WAR {props.name}
    </div>
);

const SenatorCard = (props) => (
    <div className="col-sm-12 col-md-6">
        SENATOR {props.name}
    </div>
);