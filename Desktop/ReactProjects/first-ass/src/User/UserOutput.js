import React from 'react';
import './UserOutput.css';

const UserOutput = (props) => {
    return ( <div className="UserOutput">
        <p >That's a paragraph written by {props.username}</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse pulvinar tortor et enim gravida, sit amet dapibus orci maximus. Nulla interdum libero non nulla viverra auctor. Morbi condimentum, enim sit amet lacinia luctus, dolor leo feugiat ante, eget malesuada tellus quam imperdiet justo. In lorem justo.. </p>
    </div>
    )};

export default UserOutput;