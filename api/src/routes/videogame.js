const router = require('express').Router();
const { simplificarDatosJuego , ordenarArreglo , getGames } = require('../../func.js');
const { Platform , Videogame, Genre } = require('../db.js');
const { conn } = require('../db.js');
require('dotenv').config();
const { key } = process.env;

router.get('/', async function(req, res){
    
    // let page = parseInt(req.query.page);
    // let filtro = parseInt(req.query.f);
    // let order = req.query.order;
    // let param = req.query.param;
    // let genre = req.query.genre;
    
    // if(!page){page = 1}
    // if(!filtro){filtro = 0}
    // if(!order){order = "asc"}
    // if(!param){param = "name"}
    // if(genre === "false"){genre = false}
    
    // //await getGames(`https://api.rawg.io/api/games?key=${key}`)

    let rta = []
    
    //if(filtro === 0 || filtro === 1){
        let pr1 = Promise.resolve(getGames(`https://api.rawg.io/api/games?key=${key}`))
        let pr2 = Promise.resolve(getGames(`https://api.rawg.io/api/games?key=${key}&page=2`)) 
        let pr3 = Promise.resolve(getGames(`https://api.rawg.io/api/games?key=${key}&page=3`)) 
        let pr4 = Promise.resolve(getGames(`https://api.rawg.io/api/games?key=${key}&page=4`)) 
        let pr5 = Promise.resolve(getGames(`https://api.rawg.io/api/games?key=${key}&page=5`)) 
        let pr6 = Promise.resolve(getGames(`https://api.rawg.io/api/games?key=${key}&page=6`)) 
        let pr7 = Promise.resolve(getGames(`https://api.rawg.io/api/games?key=${key}&page=7`)) 

        let prom = await Promise.all([pr1,pr2,pr3,pr4,pr5,pr6,pr7])

        let json = [];
        
        prom.forEach((j) => {
             json = [ ...json, ...j.results]
        })
        
        rta = [ ...rta, ...json.map(game => simplificarDatosJuego(game))]
    //}


    // if(filtro === 0 || filtro === 2){ 
        let db = await Videogame.findAll({
             include: [{ model: Platform },{ model: Genre }],
         });
        db.forEach(element => {
             rta.push(simplificarDatosJuego(element))
         });
    // }

    // if(order === "asc"){
    //     rta = ordenarArreglo(rta,param);
    // }else{
    //     rta = ordenarArreglo(rta,param,"desc");
    // }

    // if(req.query.name){
    //     rta = rta.filter(el => el.name.toLowerCase().includes(req.query.name.toLowerCase()))
    // }

    // if(genre){
    //      rta = rta.filter(el => el.genres.includes(genre))
    // }

    // rta = rta.map(el => {return {
    //     name: el.name,
    //     genres: el.genres,
    //     background_image: el.background_image,
    //     id: el.id,
    //     rating: el.rating,
    // }})

    // page = 15 * page;

    // rta = rta.slice(page - 15,page);

    // if(rta.length){
    res.send(rta);
    // }else{
    //     res.send(rta);
    //     console.log("No se encontraron juegos")
    // }
});

module.exports = router;