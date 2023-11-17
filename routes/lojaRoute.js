const express = require('express');

//const Autenticação = require('../middlewares/autenticacao');
const lojaController = require('../controllers/lojaController');

class LojaRoute {

    #router;
    get router() {
        return this.#router;
    }
    set router(router) {
        this.#router = router
    }

    constructor() {
        this.#router = express.Router();

        let ctrl = new lojaController()
        
        //let auth = new Autenticação();

        this.#router.get('/', ctrl.listarView);
        //this.#router.get('/', auth.verificaLoginLoja, ctrl.listarView);
        this.#router.post('/gravar-pedido', ctrl.gravarPedido);
        
    }
}

module.exports = LojaRoute;