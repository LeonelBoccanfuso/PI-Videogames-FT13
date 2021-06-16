import React from 'react';
import './game.css';

export default function Game({game}) {
    return (
        <div className="game">
            
            {
                //https://www.publicdomainpictures.net/pictures/40000/velka/question-mark.jpg
                game.background_image ? (
                    <img className="imagen" src={game.background_image} width="200" height="200" alt="❌" />
                ) : (<img className="imagen" src="https://www.publicdomainpictures.net/pictures/40000/velka/question-mark.jpg" width="200" height="200" alt="❌" />)
            }
            
            <div id="inf">
                <h2>{game.name}</h2>
                <hr/>
                <div id="genres">
                    {
                        game.genres.map(element => (
                            <h3 key={element}> {element} </h3>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};
