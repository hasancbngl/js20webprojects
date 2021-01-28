import React from 'react';
const char = (props) => {
    const style = {
        display: 'inline-block',
        margin: '20px 20px',
        padding: '20px',
        border: '2px solid green',
        textAlign: 'center'
    };
    return (
    <div 
    style={style}
    onClick={props.delete}>
        {props.element}
    </div>
    );
};

export default char;