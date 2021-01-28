import React from 'react';
import './Person.css'
const person = (props) => {
    return ( <div className="Person">
        <p onClick = {props.click}>I'm {props.name} and {props.age} years old!</p>
        <p>{props.children}</p>
        <input type="text" value = {props.name} onChange = {props.changed}/>
        <br></br>
        <input type="text" value = {props.age} onChange = {props.changedAge}/>
        </div>
    )};

export default person;