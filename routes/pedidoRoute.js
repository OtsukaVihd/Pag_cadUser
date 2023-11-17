const express = require('express');

const PedidoController = require('../controllers/pedidoController');

class PedidoRoute {

    #router;
    get router() {
        return this.#router;
    }
    set router(router) {
        this.#router = router;
    }

    constructor() {
        this.#router = express.Router();

        let ctrl = new PedidoController();

        this.#router.get('/', ctrl.listar);
        //this.#router.get('/', auth.verificaLoginLoja, ctrl.listarView);

        
    }
}

module.exports = PedidoRoute;