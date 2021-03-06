import React from 'react';
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
                <h5 id="gotogames">
                    <a style={{ color: 'inherit', textDecoration: 'inherit'}} href="http://localhost:3000/games">Go To Games!!</a>
                </h5>
            </div>
        </div>
    );
};
