/* eslint no-magic-numbers: 0 */
import React, {Component} from 'react';

import { DashSeqaln } from '../lib';

let sampleSeries = [
    {
        label: "Entropy",
        values: [0.1, 0.5, 0.3, 0.5, 0.2, 0, 0.5, 0.3, 0.5, 0.2, 0, 0.5, 0.3, 0.5, 0.2, 0, 0.5, 0.3, 0.5, 0.2, 0, 0.5, 0.3, 0.5, 0.2, 0.7, 0.9, 1],
        color: "green",
        height: "100px",
    },
]
let sampleAln = {
    "id1": "ART--RGPWTQRW-LLERERP---RM-M",
    "id2": "A-MD-RGD-TDRWPLLD-EWP---RTFM",
    "id3": "AR--TRGP-TERWP--ERERP---RM-M",
}

class App extends Component {

    constructor() {
        super();
        this.state = {
            title: "My MSA",
            alignment: sampleAln,
            included: Object.keys(sampleAln),
            excluded: [],
            series: sampleSeries,
            color_scheme: "Flower",
            show_letters: true,
            allow_sequence_selection: true,
        };
        this.setProps = this.setProps.bind(this);
    }

    setProps(newProps) {
        this.setState(newProps);
    }

    render() {
        return (
            <div>
                <DashSeqaln
                    setProps={this.setProps}
                    {...this.state}
                />
            </div>
        )
    }
}

export default App;
