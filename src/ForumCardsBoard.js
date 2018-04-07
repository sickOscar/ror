import React from 'react';

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
                            return <div className="col-sm-6">{card.name}</div>
                        })}
                    </div>


                    <div className="row">
                        <div className="col-sm-12">
                            <h5>Active Wars</h5>
                        </div>
                        {this.props.G.republic.activeWars.map(war => {
                            return <div className="col-sm-6">WAR {war.name}</div>
                        })}
                    </div>

                    <div className="row">
                        <div className="col-sm-12">
                            <h5>Inactive Wars</h5>
                        </div>
                        {this.props.G.republic.inactiveWars.map(war => {
                            return <div className="col-sm-6" key={war.id}>{war.name}</div>
                        })}
                    </div>

                </div>
            </div>
        )
    }
}