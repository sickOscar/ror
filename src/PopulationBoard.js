import React from 'react';

export default class PopulationBoard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};

        this.doSpeech = this.doSpeech.bind(this);
    }

    doSpeech() {
        this.props.moves.doStateOfRepublicSpeech()
    }

    render() {
        return (
            <div>
                <h2>Population Phase</h2>
                <button onClick={this.doSpeech}>State of Republic Speech</button>  
            </div>
        )
    }

}