import React from 'react';

export default class PopulationBoard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            speechDone: false
        };

        this.doSpeech = this.doSpeech.bind(this);
    }

    doSpeech() {
        this.setState({
            speechDone: true
        });
        this.props.moves.doStateOfRepublicSpeech()
    }

    render() {
        return (
            <div>
                <h2>Population Phase</h2>
                {!this.state.speechDone && 
                    <button onClick={this.doSpeech}>State of Republic Speech</button>  
                }
                {this.state.speechDone &&
                    <div>
                        <p>Speech Result: {this.props.G.republic.stateOfRepublicSpeechExit.label}</p>                        
                        <button onClick={() => this.props.events.endPhase()}>End Population Phase</button>
                    </div>
                }
            </div>
        )
    }

}