import React from 'react';
import { Link } from 'react-router-dom';
import './landing.css';

export default function Landing(props) {
    return (
        <div>
            <div>
                <h1 id="title">Henry Games</h1>
            </div>
            <div id="imgandtext">
                 <img src="https://www.muycomputer.com/wp-content/uploads/2014/05/de-Nintendo.png" width="700px" height="500px" alt="Not Found"/>
                 <h2 id="text">
                     Videogame Library
                      From Henry
                 </h2>
            </div>
            <div>
                <h5 id="gotogames"><Link to="/games" style={{ color: 'inherit', textDecoration: 'inherit'}}>
                    <div id="bton">Go to games!!</div>
                </Link></h5>
            </div>
        </div>
    );
};
