import React from 'react';
import Bot from './Bot';
import CONST from './Const';

export default class ForumBot extends React.Component {

    constructor(props) {
        super(props);

        this.state = {...props};

        Bot.play('forum', props.G, props.ctx)
        this.endTurn();
    }

    endTurn() {
        setTimeout(() => {
            if (this.props.ctx.currentPlayer === this.props.G.playersOrder[this.props.G.playersOrder.length - 1]) {
                this.props.events.endTurn();
                this.props.events.endPhase();
            } else {
                this.props.events.endTurn();
            }
        }, CONST.BOT_TURN_TIME);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({...nextProps});
        Bot.play('forum', nextProps.G, nextProps.ctx)
        this.endTurn();
    }

    render() {
        return (
            <div>
                <p>BOT {this.props.ctx.currentPlayer} PLAYING</p>
            </div>
        )
    }

}