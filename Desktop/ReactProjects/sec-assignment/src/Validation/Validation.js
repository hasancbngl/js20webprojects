import React from 'react';

const Validation = (props) => {
    let message = 'Text long enough';
    if(props.length<=5) {
        message = 'Text too short!';
    }

    return (
    <div>
        <p>Text Length: {props.length}</p>
        <p>{message}</p>
    </div>
    )};

export default Validation;    