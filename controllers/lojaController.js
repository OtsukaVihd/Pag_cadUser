const PedidoModel = require("../models/pedidoModel");
const ProdutoModel = require("../models/produtoModel");
const PedidoItemModel = require('../models/pedidoItemModel')

class LojaController {

    async listarView(req, res) {
        let prod = new ProdutoModel();
        let lista = await prod.listarProdutos();
        res.render('loja/listar', { lista: lista, layout: 'loja/listar' });
    }

    async gravarPedido(req, res) {
        let listaProdutos = req.body.listaProdutos;
        var correto = true;

        if (listaProdutos != null && listaProdutos.length > 0) {
            let pedido = new PedidoModel();
            await pedido.gravar();

            for (let i = 0; i < listaProdutos.length; i++) {
                let pedidoItem = new PedidoItemModel(0, pedido.pedidoId, listaProdutos[i].id, listaProdutos[i].nome, listaProdutos[i].quantidade, listaProdutos[i].preco);
                let produto = new ProdutoModel();

                produto = await produto.buscarProduto(listaProdutos[i].id);
                await pedidoItem.gravar();
                
                if (produto.produtoQuantidade >= pedidoItem.pedidoItemQuantidade) {
                    produto.produtoQuantidade -= pedidoItem.pedidoItemQuantidade;
                    await produto.alterarEstoque();
                    correto = true;
                } else {
                    correto = false;
                }
            }
        
            if (correto == true)
                res.send({ msg: 'Pedido gravado com sucesso!', ok: true });
            else
                res.send({ msg: 'Compra excedida do estoque', ok: false });
        } else {
            res.send({ msg: 'Nenhum produto adicionado ao carrinho!', ok: false });
        }
    }
}



module.exports = LojaController;