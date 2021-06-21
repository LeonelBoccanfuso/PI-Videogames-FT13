import React , { useState , useEffect} from 'react';
import { connect } from "react-redux";
import { getGames , getGenres} from "../../actions/index";
import Game from '../game/game';
import { Link } from 'react-router-dom';
import './games.css';

export function Games(props) {
  const [input, setInput] = useState({
    search: '',
    filter: '0',
    order: 'asc',
    param: 'name',
    genderfilter: "false",
    page: 1,
  });

  useEffect(() => {
    props.getGames([input.search,input.filter,input.order,input.param,input.page,input.genderfilter]);
    props.getGenres();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input.page]);

  const handleInputChange = function(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
  }

  const handleInputChangeFilter = function(e){
    console.log(e);
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }
  
  const aplicarFiltros = function(){
    setInput({
      ...input,
      page: 1,
    })
    props.getGames([input.search,input.filter,input.order,input.param,null,input.genderfilter]);
  }

  function handlePrev(event) {
    event.preventDefault();
    if (input.page > 1) {
      setInput({
        ...input,
        page: input.page - 1,
      })
    }
  }

  function handleNext(event) {
    event.preventDefault();
    setInput({
      ...input,
      page: input.page + 1,
    })
  }

  return (
    <div className="container" >
      <div className="filtros">
        <label >Name: </label>
        <div id="buscador">
          <input name="search" value={input.search} onChange={handleInputChange} type="text" placeholder="Buscar..."/>
        </div>

        <label >Order: </label>
          <select name="order" id="order" onChange={handleInputChangeFilter}>
              <option value="asc"> Ascㅤㅤㅤ🡅</option>
              <option value="Desc">Desㅤㅤㅤ🡇</option>
          </select>

        <label >  Filter By: </label>
          <select name="filter" id="filter" onChange={handleInputChangeFilter}>
              <option value="0">All</option>
              <option value="1">Native</option>
              <option value="2">Added</option>
          </select>
        
        <label >  Gender: </label>
          <select name="genderfilter" id="genderfilter" onChange={handleInputChangeFilter}>
              <option value="false">--Gender--</option>
              {
                props.genres && props.genres.map(genre =>(
                  <option key={genre} value={genre}>{genre}</option>
                ))
              }
          </select>

        <label >  Order By: </label>
          <select name="by" id="by" onChange={handleInputChangeFilter}>
              <option value="name">Name</option>
              <option value="rating">Rating</option>
          </select>
          <br/>
        {!props.games ? (<button className="apply" hidden>Apply</button>) : (<button className="apply" onClick={aplicarFiltros}>Apply</button>)}
        
      </div>
      <div className="gameList">
        <div className="paginado">
          {props.games && input.page > 1 &&<button className="apply" onClick={handlePrev}> Prev</button>}
          <span>  {"Page " + input.page}  </span>
          {props.games && props.games[14] && <button className="apply" onClick={handleNext}>Next</button>}
        </div>
        <div>
        {
          !props.games ? (
              <div id="loadContainer"><div className="preloader"></div></div>
            ) : (
              props.games && props.games[0] ? (
                props.games.map(game =>
                  <Link className="link" key={game.id} to={`/games/${game.id}`} style={{ color: 'inherit', textDecoration: 'inherit'}}>
                    <Game game={game} />
                  </Link >
                )
              ) : (
                <h2>Games not found.</h2>
              )
            )
        }
        </div>
        <div className="paginado">
          {props.games && input.page > 1 &&<button className="apply" onClick={handlePrev}> Prev</button>}
          <span>  {"Page " + input.page}  </span>
          {props.games && props.games[14] && <button className="apply" onClick={handleNext}>Next</button>}
        </div>
      </div>
    </div>
  )
};

function mapStateToProps(state) {
  return {
    games: state.games,
    genres: state.genres,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getGames: (el) => dispatch(getGames(...el)),
    getGenres: () => dispatch(getGenres()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Games);