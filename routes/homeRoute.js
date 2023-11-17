const express = require('express');
//const Autenticação = require('../middlewares/autenticacao');
const HomeController = require('../controllers/homeController');

class HomeRoute {

    #router;
    get router() {
        return this.#router;
    }
    set router(router) {
        this.#router = router
    }

    constructor() {
        this.#router = express.Router();
        //let autenticacao = new Autenticação();

        let ctrl = new HomeController();
        this.#router.get("/", ctrl.homeView)
        
    }
}

module.exports = HomeRoute;