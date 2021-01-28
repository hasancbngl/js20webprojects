import React from 'react';

const UserInput = (props) => {
    const myStyle = {
        border: '2px solid blue',
        background: '#157842',
        padding: '20px',
        margin:'20px 150px'
    };
    return ( <div>
        <input style={myStyle} type="text" 
        onChange={props.changed}
        value={props.currentName}></input>
    </div>

    )};
    
export default UserInput;