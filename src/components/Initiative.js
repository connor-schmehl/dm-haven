import React, { Component } from 'react';
import '../styles/Initiative.scss';

class Initiative extends Component {
    constructor(props) {
        super(props);

        this.state = {
            initiatives: [],
            initiativeTracker: 0,
        }
        this.onInputChange = this.onInputChange.bind(this);
        this.addInitiative = this.addInitiative.bind(this);
        this.nextInitiative = this.nextInitiative.bind(this);
        this.prevInitiative = this.prevInitiative.bind(this);
        this.getEntryClassNames = this.getEntryClassNames.bind(this);
        this.getInitiativeEntries = this.getInitiativeEntries.bind(this);
    }
    onInputChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    addInitiative() {
        if (this.state.name && this.state.initiative) {
            let newList = [...this.state.initiatives, {name: this.state.name, initiative: this.state.initiative}];
            newList.sort((i1, i2) => i2.initiative - i1.initiative);
            this.setState({initiatives: newList});
        }
    }

    nextInitiative() {
        const newInit = this.state.initiativeTracker < this.state.initiatives.length - 1 ? this.state.initiativeTracker + 1 : 0;
        this.setState({initiativeTracker: newInit});
    }

    prevInitiative() {
        const newInit = this.state.initiativeTracker > 0 ? this.state.initiativeTracker - 1 : this.state.initiatives.length - 1;
        this.setState({initiativeTracker: newInit});
    }

    getEntryClassNames(index) {
        const classNames = ['initiative-entry']
        if (index == this.state.initiativeTracker) {
            classNames.push('initiative-entry-active');
        }
        return classNames.join(' ');
    }

    getInitiativeEntries() {
        return this.state.initiatives.map((init, k) => <li key={k} className={this.getEntryClassNames(k)}>{init.name} {init.initiative}</li>);
    }

    render() {
        return (
            <div className="initiative-container">
                <ul className="initiative-list">
                    {this.getInitiativeEntries()}
                </ul>
                <button className="initiative-button" onClick={this.prevInitiative}>prev</button>
                <button className="initiative-button" onClick={this.nextInitiative}>next</button>
                    <div>
                        <input name="name" id="name" className="initiative-input" type="text" placeholder='Name' onChange={this.onInputChange}/>
                    </div>
                    <div>
                        <input name="initiative" id="initiative" className="initiative-input" type="number" placeholder="Initiative" onChange={this.onInputChange}/>
                    </div>
                    <button className="initiative-add-button" onClick={this.addInitiative}>Add</button>
            </div>
        );
    }
}

export default Initiative;
