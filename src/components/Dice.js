import React, { useState } from 'react';
import '../styles/Dice.scss';
import { evaluate, randomInt } from 'mathjs';

const numberMap = {
    1: 'st',
    2: 'nd',
    3: 'rd',
    default: 'th',
}

function Dice() {
    const [state, setState] = useState({output: []});

    const onInputChange = function(event) {
        setState({...state, [event.target.name]: event.target.value});
    }

    const addDice = function(dice) {
        debugger;
        if (state[dice]) {
            if (state[dice] >= 99) {
                return;
            }
            setState({...state, [dice]: state[dice] + 1});
            return;
        }
        setState({...state, [dice]: 1});
    }

    const parseDice = function(diceString) {
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

    const rollManually = function() {
        const output = parseDice(state.manualDice);
        const lines = [];
        for (let i = 0; i < output.length; i++) {
            lines.push(<div key={i}>{output[i][0] + '    ' + output[i][1]}</div>)
        }
        setState({...state, output: lines});
    }

    const getTrackerClassname = function(dice) {
        const className = ['dice-rolling-number-tracker'];
        if (!state['d20']) {
            className.push('hidden');
        }
        return className;
    }

    const rollSelected = function() {
        const diceString = (state['d20'] || '') + 'd20,'
            + (state['d12'] || '') + 'd12,'
            + (state['d10'] || '') + 'd10,'
            + (state['d8'] || '') + 'd8,'
            + (state['d6'] || '') + 'd6,'
            + (state['d4'] || '') + 'd4';
        const output = parseDice(diceString);
        const lines = [];
        for (let i = 0; i < output.length; i++) {
            lines.push(<div key={i}>{output[i][0] + '    ' + output[i][1]}</div>)
        }
        setState({...state, output: lines});
    }

    return (
        <div className="dice-rolling-container">
            <input name="manualDice" id="manualDice" className="dice-rolling-manual-input" placeholder="Manually Roll Dice" onChange={onInputChange}/>
            <button className="button-black" onClick={rollManually}>Roll</button>
            <div className="dice-rolling-buttons">
                <div className="dice-rolling-button-container">
                    <button className="button-black dice-rolling-button" onClick={() => addDice('d20')}>D20</button>
                    <div className={getTrackerClassname('d20')}>{state['d20']}</div>
                </div>
                <div className="dice-rolling-button-container">
                    <button className="button-black dice-rolling-button" onClick={() => addDice('d12')}>D12</button>
                    <div className={getTrackerClassname('d12')}>{state['d12']}</div>
                </div>
                <div className="dice-rolling-button-container">
                    <button className="button-black dice-rolling-button" onClick={() => addDice('d10')}>D10</button>
                    <div className={getTrackerClassname('d10')}>{state['d10']}</div>
                </div>
                <div className="dice-rolling-button-container">
                    <button className="button-black dice-rolling-button" onClick={() => addDice('d8')}>D8</button>
                    <div className={getTrackerClassname('d8')}>{state['d8']}</div>
                </div>
                <div className="dice-rolling-button-container">
                    <button className="button-black dice-rolling-button" onClick={() => addDice('d6')}>D6</button>
                    <div className={getTrackerClassname('d6')}>{state['d6']}</div>
                </div>
                <div className="dice-rolling-button-container">
                    <button className="button-black dice-rolling-button" onClick={() => addDice('d4')}>D4</button>
                    <div className={getTrackerClassname('d4')}>{state['d4']}</div>
                </div>
            </div>
            <div className="dice-rolling-buttons-tracker">
                <div className="dice-rolling-tracker">{state['d20']}</div>
                <div className="dice-rolling-tracker">{state['d12']}</div>
                <div className="dice-rolling-tracker">{state['d10']}</div>
                <div className="dice-rolling-tracker">{state['d8']}</div>
                <div className="dice-rolling-tracker">{state['d6']}</div>
                <div className="dice-rolling-tracker">{state['d4']}</div>
            </div>
            <button className="button-black" onClick={rollSelected}>Roll Selected Dice</button>
            <div className="dice-rolling-output">
                {state.output}
            </div>
        </div>
    );
}

export default Dice;
