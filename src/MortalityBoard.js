import React from 'react';


export default class MortalityBoard extends React.Component {

    constructor(props) {
        super(props);
        this.props = props;

        this.state = {
            done: false
        }

        this.drawMortalityChit = this.drawMortalityChit.bind(this);
    }

    drawMortalityChit() {
        this.props.moves.drawMortalityChit();
        this.setState({
            done: true
        });
    }

    endPhase() {
        this.props.moves.resetMortalityChit();
        this.props.moves.resetSelected();
        this.props.events.endPhase();
    }

    render() {
        var mortalityChit = <p>Draw: {this.props.G.mortalityChits.join(', ')}</p>
        var button = this.state.done ? 
            <button onClick={() => this.endPhase()}>End Mortality Phase</button> : 
            <button onClick={this.drawMortalityChit}>Draw mortality Chit</button>
        return (
            <div>
                <p>Mortality Board</p>
                {mortalityChit}
                {button}
            </div>
        )
    }

}
