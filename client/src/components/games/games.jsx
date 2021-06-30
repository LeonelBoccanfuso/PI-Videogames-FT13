import React , { useState , useEffect} from 'react';
import { connect } from "react-redux";
import { getGames , getGenres} from "../../actions/index";
import Game from '../game/game';
import { Link } from 'react-router-dom';
import './games.css';

export function Games(props) {
  const [games, setGames] = useState({
    games: [],
    page: [],
  });
  const [input, setInput] = useState({
    search: '',
    filter: '0',
    order: 'asc',
    param: 'name',
    genderfilter: "false",
    page: 1,
  });

  useEffect(() => {
    //props.getGames([input.search,input.filter,input.order,input.param,input.page,input.genderfilter]);
    props.getGames();
    props.getGenres();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if(props.games){
      setGames({
        ...games,
        games: ordenarArreglo(props.games,input.param,input.order),
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.games]);

  useEffect(() => {
    if(props.games){
      setGames({
        ...games,
        page: games.games.slice((input.page * 15) - 15,(input.page * 15))
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input.page,games.games]);

  const ordenarArreglo = function(arr,propiedad,orden = "asc"){
    if(!arr.length){return arr}
    let rta = arr;
    switch(orden){
      case "desc":
        rta.sort(function (a, b) {
          if (a[propiedad] < b[propiedad]) {
            return 1;
          }
          if (a[propiedad] > b[propiedad]) {
            return -1;
          }
          return 0;
        });
        break;
      default:
           rta.sort(function (a, b) {
               if (a[propiedad] > b[propiedad]) {
               return 1;
               }
               if (a[propiedad] < b[propiedad]) {
               return -1;
               }
               return 0;
           });
           break;
    }
    return rta;
}

  const handleInputChange = function(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
  }

  const aplicarFiltros = function(){

    let juegosfiltrados;
    juegosfiltrados = ordenarArreglo(props.games,input.param,input.order);

    if(input.filter !== '0'){
      if(input.filter === '1'){
        juegosfiltrados = juegosfiltrados.filter((game) => (typeof game.id === "number"))
      }else{
        juegosfiltrados = juegosfiltrados.filter((game) => (typeof game.id === "string"))
      }
    }

    if(input.search.length){
      juegosfiltrados = [...juegosfiltrados.filter(el => el.name.toLowerCase().includes(input.search.toLowerCase()))]
    }

    if(input.genderfilter !== "false"){
      juegosfiltrados = [...juegosfiltrados.filter(el => el.genres.includes(input.genderfilter))]
    }

    games.games = juegosfiltrados;
    
    setInput({
      ...input,
      page: 1,
    })

    setGames({
      ...games,
      page: games.games.slice((input.page * 15) - 15,(input.page * 15))
    })
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
          <select name="order" id="order" onChange={handleInputChange}>
              <option value="asc"> Ascㅤㅤㅤ🡅</option>
              <option value="desc">Desㅤㅤㅤ🡇</option>
          </select>

        <label >  Filter By: </label>
          <select name="filter" id="filter" onChange={handleInputChange}>
              <option value="0">All</option>
              <option value="1">Native</option>
              <option value="2">Added</option>
          </select>
        
        <label >  Gender: </label>
          <select name="genderfilter" id="genderfilter" onChange={handleInputChange}>
              <option value="false">--Gender--</option>
              {
                props.genres && props.genres.map(genre =>(
                  <option key={genre} value={genre}>{genre}</option>
                ))
              }
          </select>

        <label >  Order By: </label>
          <select name="param" id="param" onChange={handleInputChange}>
              <option value="name">Name</option>
              <option value="rating">Rating</option>
          </select>
          <br/>
        {!props.games ? (<button className="apply" hidden>Apply</button>) : (<button className="apply" onClick={aplicarFiltros}>Apply</button>)}
        
      </div>
      <div className="gameList">

        <div className="paginado">
          {games.page && input.page > 1 &&<button className="apply" onClick={handlePrev}> Prev</button>}
          <span>  {"Page " + input.page}  </span>
          {games.page && (games.games.slice(((input.page + 1) * 15) - 15,((input.page + 1) * 15)).length > 0) && <button className="apply" onClick={handleNext}>Next</button>}
        </div>

        <div>
        {
          !props.games ? (
              <div id="loadContainer"><div className="preloader"></div></div>
            ) : (
              games.page.length ? (
                games.page.map(game =>
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
    //getGames: (el) => dispatch(getGames(...el)),
    getGames: () => dispatch(getGames()),
    getGenres: () => dispatch(getGenres()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Games);