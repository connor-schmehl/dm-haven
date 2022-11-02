import React, { useState } from 'react';
import '../styles/Initiative.scss';

function Initiative() {
    const [state, setState] = useState({initiatives: [], initiativeTracker: 0,}); 
    
    const onInputChange = function(event) {
        setState({...state, [event.target.name]: event.target.value});
    }

    const addInitiative = function() {
        if (state.name && state.initiative) {
            let newList = [...state.initiatives, {name: state.name, initiative: state.initiative}];
            newList.sort((i1, i2) => i2.initiative - i1.initiative);
            setState({...state, initiatives: newList});
        }
    }

    const nextInitiative = function() {
        const newInit = state.initiativeTracker < state.initiatives.length - 1 ? state.initiativeTracker + 1 : 0;
        setState({...state, initiativeTracker: newInit});
    }

    const prevInitiative = function() {
        const newInit = state.initiativeTracker > 0 ? state.initiativeTracker - 1 : state.initiatives.length - 1;
        setState({...state, initiativeTracker: newInit});
    }

    const getEntryClassNames = function(index) {
        const classNames = ['initiative-entry']
        if (index == state.initiativeTracker) {
            classNames.push('initiative-entry-active');
        }
        return classNames.join(' ');
    }

    const getInitiativeEntries = function() {
        return state.initiatives.map((init, k) => <li key={k} className={getEntryClassNames(k)}>{init.name} {init.initiative}</li>);
    }

    return (
        <div className="initiative-container">
            <ul className="initiative-list">
                {getInitiativeEntries()}
            </ul>
            <button className="initiative-button" onClick={prevInitiative}>prev</button>
            <button className="initiative-button" onClick={nextInitiative}>next</button>
                <div>
                    <input name="name" id="name" className="initiative-input" type="text" placeholder='Name' onChange={onInputChange}/>
                </div>
                <div>
                    <input name="initiative" id="initiative" className="initiative-input" type="number" placeholder="Initiative" onChange={onInputChange}/>
                </div>
                <button className="initiative-add-button" onClick={addInitiative}>Add</button>
        </div>
    );
}

export default Initiative;
