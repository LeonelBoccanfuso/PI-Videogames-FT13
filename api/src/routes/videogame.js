const router = require('express').Router();
const { simplificarDatosJuego , ordenarArreglo , getGames } = require('../../func.js');
const { Platform , Videogame, Genre } = require('../db.js');
const { conn } = require('../db.js');
require('dotenv').config();
const { key } = process.env;

router.get('/', async function(req, res){
    
    let page = parseInt(req.query.page);
    let filtro = parseInt(req.query.f);
    let order = req.query.order;
    let param = req.query.param;
    let genre = req.query.genre;
    
    if(!page){page = 1}
    if(!filtro){filtro = 0}
    if(!order){order = "asc"}
    if(!param){param = "name"}
    if(genre === "false"){genre = false}
    
    //await getGames(`https://api.rawg.io/api/games?key=${key}`)

    let rta = []
    
    if(filtro === 0 || filtro === 1){
        let g = await getGames(`https://api.rawg.io/api/games?key=${key}`);
        
        let json = g.results;

        for (let i = 2; i< 6; i++) {
            g = await getGames(`https://api.rawg.io/api/games?key=${key}&page=${i}`);
            json = [ ...json, ...g.results];
        }

        rta = [ ...rta, ...json.map(game => simplificarDatosJuego(game))]
    }


    if(filtro === 0 || filtro === 2){ 
        let db = await Videogame.findAll({
            include: [{ model: Platform },{ model: Genre }],
        });
        db.forEach(element => {
            rta.push(simplificarDatosJuego(element))
        });
    }

    if(order === "asc"){
        
        rta = ordenarArreglo(rta,param);
    }else{
        rta = ordenarArreglo(rta,param,"desc");
    }

    if(req.query.name){
        rta = rta.filter(el => el.name.toLowerCase().includes(req.query.name.toLowerCase()))
    }

    if(genre){
         rta = rta.filter(el => el.genres.includes(genre))
    }

    rta = rta.map(el => {return {
        name: el.name,
        genres: el.genres,
        background_image: el.background_image,
        id: el.id,
        rating: el.rating,
    }})

    page = 15 * page;

    rta = rta.slice(page - 15,page);

    if(rta.length){
        res.send(rta);
    }else{
        res.send(rta);
        console.log("No se encontraron juegos")
    }
});

module.exports = router;