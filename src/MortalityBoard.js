import React from 'react';

export default class MortalityBoard extends React.Component {

    constructor(props) {
        super(props);
        this.props = props;
        this.drawMortalityChit = this.drawMortalityChit.bind(this);
    }

    drawMortalityChit() {
        console.log(this.props);
        this.props.moves.drawMortalityChit();
    }

    render() {
        return (
            <div>
                <p>Mortality Board</p>
                <button onClick={this.drawMortalityChit}>Draw mortality Chit</button>  
            </div>
        )
    }

}