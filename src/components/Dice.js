import React, { Component } from 'react';
import '../styles/Dice.scss';
import { evaluate, randomInt } from 'mathjs';

const numberMap = {
    1: 'st',
    2: 'nd',
    3: 'rd',
    default: 'th',
}

class Dice extends Component {
    constructor(props) {
        super(props);

        this.state = {
            outputRolls: [],
        }

        this.parseDice = this.parseDice.bind(this);
        this.rollManually = this.rollManually.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.getTrackerClassname = this.getTrackerClassname.bind(this);
        this.rollSelected = this.rollSelected.bind(this);
        
    }
    onInputChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    addDice(dice) {
        debugger;
        if (this.state[dice]) {
            if (this.state[dice] >= 99) {
                return;
            }
            this.setState({[dice]: this.state[dice] + 1});
            return;
        }
        this.setState({[dice]: 1});
    }

    parseDice(diceString) {
        const re = /[0-9]*d[0-9]*/g
        const specialRe = /[^0-9,\sd]/g
        const isComputed = [...diceString.matchAll(specialRe)].length !== 0;
        const results = [];
        if (isComputed) {
            const parsedString = diceString.replace(re, (match) => {
                const s = match.split('d');
                let total = 0;
                for (let i = 0; i < parseInt(s[0]); i++) {
                    total += randomInt(1, parseInt(s[1]) + 1);
                }
                return total;
            })
            return [['Total: ', evaluate(parsedString)]];
        }
        const matches = diceString.matchAll(re);
        for (const match of matches) {
            const s = match[0].split('d');
            for (let i = 0; i < parseInt(s[0]); i++) {
                results.push(['' + (i + 1) + (numberMap[i + 1] || numberMap.default) + ' d' + s[1] + ': ', randomInt(1, parseInt(s[1]) + 1)]);
            }
        }
        debugger;
        results.push(['Total: ', results.map((x) => x[1]).reduce((a,b) => a + b)]);
        return results;
        
    }

    rollManually() {
        const output = this.parseDice(this.state.manualDice);
        const lines = [];
        for (let i = 0; i < output.length; i++) {
            lines.push(<div key={i}>{output[i][0] + '    ' + output[i][1]}</div>)
        }
        this.setState({output: lines});
    }

    getTrackerClassname(dice) {
        const className = ['dice-rolling-number-tracker'];
        if (!this.state['d20']) {
            className.push('hidden');
        }
        return className;
    }

    rollSelected() {
        const diceString = (this.state['d20'] || '') + 'd20,'
            + (this.state['d12'] || '') + 'd12,'
            + (this.state['d10'] || '') + 'd10,'
            + (this.state['d8'] || '') + 'd8,'
            + (this.state['d6'] || '') + 'd6,'
            + (this.state['d4'] || '') + 'd4';
        const output = this.parseDice(diceString);
        const lines = [];
        for (let i = 0; i < output.length; i++) {
            lines.push(<div key={i}>{output[i][0] + '    ' + output[i][1]}</div>)
        }
        this.setState({output: lines});
    }

    render() {
        return (
            <div className="dice-rolling-container">
                <input name="manualDice" id="manualDice" className="dice-rolling-manual-input" placeholder="Manually Roll Dice" onChange={this.onInputChange}/>
                <button className="button-black" onClick={this.rollManually}>Roll</button>
                <div className="dice-rolling-buttons">
                    <div className="dice-rolling-button-container">
                        <button className="button-black dice-rolling-button" onClick={() => this.addDice('d20')}>D20</button>
                        <div className={this.getTrackerClassname('d20')}>{this.state['d20']}</div>
                    </div>
                    <div className="dice-rolling-button-container">
                        <button className="button-black dice-rolling-button" onClick={() => this.addDice('d12')}>D12</button>
                        <div className={this.getTrackerClassname('d12')}>{this.state['d12']}</div>
                    </div>
                    <div className="dice-rolling-button-container">
                        <button className="button-black dice-rolling-button" onClick={() => this.addDice('d10')}>D10</button>
                        <div className={this.getTrackerClassname('d10')}>{this.state['d10']}</div>
                    </div>
                    <div className="dice-rolling-button-container">
                        <button className="button-black dice-rolling-button" onClick={() => this.addDice('d8')}>D8</button>
                        <div className={this.getTrackerClassname('d8')}>{this.state['d8']}</div>
                    </div>
                    <div className="dice-rolling-button-container">
                        <button className="button-black dice-rolling-button" onClick={() => this.addDice('d6')}>D6</button>
                        <div className={this.getTrackerClassname('d6')}>{this.state['d6']}</div>
                    </div>
                    <div className="dice-rolling-button-container">
                        <button className="button-black dice-rolling-button" onClick={() => this.addDice('d4')}>D4</button>
                        <div className={this.getTrackerClassname('d4')}>{this.state['d4']}</div>
                    </div>
                </div>
                <div className="dice-rolling-buttons-tracker">
                    <div className="dice-rolling-tracker">{this.state['d20']}</div>
                    <div className="dice-rolling-tracker">{this.state['d12']}</div>
                    <div className="dice-rolling-tracker">{this.state['d10']}</div>
                    <div className="dice-rolling-tracker">{this.state['d8']}</div>
                    <div className="dice-rolling-tracker">{this.state['d6']}</div>
                    <div className="dice-rolling-tracker">{this.state['d4']}</div>
                </div>
                <button className="button-black" onClick={this.rollSelected}>Roll Selected Dice</button>
                <div className="dice-rolling-output">
                    {this.state.output}
                </div>
            </div>
        );
    }
}

export default Dice;
