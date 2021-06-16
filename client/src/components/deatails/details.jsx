import React from 'react';
import {useEffect} from 'react';
import { connect } from "react-redux";
import { getGame } from "../../actions/index";
import './details.css';

export function Details(props) {

  useEffect(() => {
    props.getGame(props.match.params.id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
    return (
        <div className="game">
            {!props.game ? (<div id="loadContainer"><div className="preloader"></div></div>) : (
            <div>
              <div id="up">
                 {
                    //https://www.publicdomainpictures.net/pictures/40000/velka/question-mark.jpg
                    props.game.background_image ? (
                      <img className="imagen" src={props.game.background_image} width="400" height="400" alt="Not Found" />
                    ) : (<img className="imagen" src="https://www.publicdomainpictures.net/pictures/40000/velka/question-mark.jpg" width="400" height="400" alt="❌" />)
                 }
                  <div id="details">
                    <h1>{props.game.name}</h1>
                    <div className="undertitle">
                      <h3>{props.game.released}</h3>
                      <h3>{props.game.rating}⭐</h3>
                    </div>
                    <div className="undertitle">

                    {
                      props.game && props.game.genres && props.game.genres.map((genre) => (<h3 key={genre}>{genre}</h3>))
                      
                    }
                    </div>
                    <div className="undertitle">
                    {
                      props.game && props.game.platforms && props.game.platforms.map((platforms) => (<h3 key={platforms}>{platforms}</h3>))
                    }
                    </div>
                  </div>
                </div>
                <div id="desc">
                  <div dangerouslySetInnerHTML={{ __html: props.game.description }} />
                </div>
            </div>)}
        </div>
    );
};

function mapStateToProps(state) {
    return {
      game:  state.game,
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      getGame: (el) => dispatch(getGame(el)),
    };
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Details);