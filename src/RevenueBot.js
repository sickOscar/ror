import React from 'react';
import Bot from './Bot';
import CONST from './Const';

export default class RevenueBot extends React.Component {

    constructor(props) {
        super(props);

        this.state = {...props};

        Bot.play('revenue', props.G, props.ctx)
        this.endTurn();
    }

    endTurn() {
        setTimeout(() => {
            console.log('end Turn')
            
            if (this.props.ctx.currentPlayer === '4') {
                this.props.events.endTurn();
                this.props.events.endPhase();
            } else {
                this.props.events.endTurn();
            }
        }, CONST.BOT_TURN_TIME);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({...nextProps});
        Bot.play('revenue', nextProps.G, nextProps.ctx)
        this.endTurn();
    }

    render() {
        return (
            <div>
                Playing Bot {this.props.ctx.currentPlayer}...
            </div>
        )
    }
}