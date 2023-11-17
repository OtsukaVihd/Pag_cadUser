const PedidoItemModel = require("../models/pedidoItemModel");


class PedidoController{

    async listar(req, res){
        let pedidoItem = new PedidoItemModel();
        let lista = await pedidoItem.listar();

        res.render('pedido/listar', {lista:lista});

    }
}

module.exports = PedidoController;