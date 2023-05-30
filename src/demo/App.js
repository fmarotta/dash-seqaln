/* eslint no-magic-numbers: 0 */
import React, {Component} from 'react';

import { DashSeqaln } from '../lib';

let sampleSeries = {
    Entropy: [0, 0.5, 0.3, 0.5, 0.2, 0, 0.5, 0.3, 0.5, 0.2, 0, 0.5, 0.3, 0.5, 0.2, 0, 0.5, 0.3, 0.5, 0.2, 0, 0.5, 0.3, 0.5, 0.2, 0.7, 0.9, 1],
}
let sampleAln = {
    id1: "ART--RGPWTQRW-LLERERP---RM-M",
    id2: "A-MD-RGD-TDRWPLLD-EWP---RTFM",
    id3: "AR--TRGP-TERWP--ERERP---RM-M",
}

class App extends Component {

    constructor() {
        super();
        this.state = {
            title: "My MSA",
            aln: sampleAln,
            included: Object.keys(sampleAln),
            excluded: [],
            series: sampleSeries,
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
