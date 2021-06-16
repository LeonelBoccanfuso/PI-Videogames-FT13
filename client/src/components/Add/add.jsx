import './add.css';
import { connect } from "react-redux";
import { getGenres , getPlatforms } from "../../actions/index";
import axios from 'axios';
import React ,{ useState , useEffect} from 'react';

export function Add(props) {
  const [finish, setFinish] = useState(false);
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    name: '',
    description: '',
    released: '',
    rating: '',
    genres: [],
    platforms: [],
  });

  useEffect(() => {
    props.getGenres();
    props.getPlatforms();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function validate(input) {
    let errors = {};
    if (!input.name) {
      errors.name = 'Name is required!';
    }

    if (!input.description) {
      errors.description = 'Description is empty!';
    }

    if (!input.released) {
      errors.released = 'Release date is required!';
    }

    if (!input.genres.length) {
      errors.genres = 'Genre is required!';
    }

    if (!input.platforms.length) {
      errors.platforms = 'Platform is required!';
    }

    if (!input.rating) {
      errors.rating = 'Rating is required!';
    } else if(input.rating > 5 || input.rating < 0){
        errors.rating = 'Rating must be a number between 0 - 5';
    }
    return errors;
  };

    const handleInputChange = function(e) {
      setErrors(validate({
        ...input,
        [e.target.name]: e.target.value
      }));
      setInput({
        ...input,
        [e.target.name]: e.target.value
      });
    }

    const handleInputChangePlatforms = function(e) {
      
      if(e.target.checked){
        input.platforms = [...input.platforms,e.target.name];
      }else{
        input.platforms = input.platforms.filter((platform) => platform !== e.target.name)
      }
      setErrors(validate(input));
    }

    const handleInputChangeGenres = function(e) {
      if(e.target.checked){
        input.genres = [...input.genres,e.target.name];
      }else{
        input.genres = input.genres.filter((genre) => genre !== e.target.name)
      }
      setErrors(validate(input));
    }

    const inputSubmit = function(e){
      e.preventDefault();
      setErrors(validate(input));
      if(errors.name || errors.description || errors.rating || errors.released || errors.platforms || errors.genres || !input.name.length){
        console.log("Form Incomplete!!")
      }else{
        axios.post("http://localhost:3001/videogame",input);
        setFinish(true);
      }
    }

    return (
      <div>{
        !finish ? (<div>{
          (!props.genres || !props.platforms) || (!props.genres[0] || !props.platforms[0]) ? (<div id="loadContainer"><div className="preloader"></div></div>) :(
          <form onSubmit={inputSubmit}>
            <h1> Add Game</h1>
            <div className="inputDiv">
              <label>Name: </label>
              <input className={errors.name && 'danger'} onChange={handleInputChange} name="name" value={input.name}></input>
              {errors.name && (<p className="danger">{errors.name}</p>)}
            </div>
            <div className="inputDiv" >
            <label>Description: </label>
              <input className={errors.description && 'danger'} onChange={handleInputChange} name="description" value={input.description} type="text" id="descr"></input>
              {errors.description && (<p className="danger">{errors.description}</p>)}
            </div>
              <div className="inputDiv">
            <label>Release date: </label>
              <input className={errors.released && 'danger'} onChange={handleInputChange} name="released" value={input.released} id="reldate" type="date"></input>
              {errors.released && (<p className="danger">{errors.released}</p>)}
            </div>
            <div className="inputDiv">
              <label>Rating: </label>
              <input className={errors.rating && 'danger'} onChange={handleInputChange} name="rating" value={input.rating} type='number' min="0" max="5"></input>
              {errors.rating && (<p className="danger">{errors.rating}</p>)}
            </div>
            <hr hidden/>
            <div id="checkboxs">
              <div>
                {errors.genres && (<p className="danger">{errors.genres}</p>)}
                <h4>Choose your game genres: </h4> 
                {
                  props.genres.map( genre => (
                    <div key={genre} className="checks" >
                      <input type="checkbox" name={genre} onChange={handleInputChangeGenres}/>
                      <label>{genre}</label>
                    </div>
                  ))
                }
              </div>
              <div>
                {errors.platforms && (<p className="danger">{errors.platforms}</p>)}    
                <h4>Choose your game platforms: </h4> 
                {
                  props.platforms.map( platform => (
                    <div key={platform} className="checks" >
                      <input type="checkbox" name={platform} onChange={handleInputChangePlatforms}/>
                      <label>{platform}</label>
                    </div>
                  ))
                }
              </div>
            </div>
              <input type="submit" id="submit"/>

          </form>)
      } </div>):(<h1 style={{ color:"greenyellow"}}>Game Added!</h1>)
    }
      </div>
    );
  }

  function mapStateToProps(state) {
    return {
      genres: state.genres,
      platforms: state.platforms,
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      getGenres: () => dispatch(getGenres()),
      getPlatforms: () => dispatch(getPlatforms()),
    };
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Add);