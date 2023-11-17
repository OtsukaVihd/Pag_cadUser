const express = require('express');
const multer = require('multer');


const ProdutoController = require('../controllers/produtoController');
const Autenticação = require('../middlewares/autenticacao');

class ProdutoRoute {

    #router;
    get router() {
        return this.#router;
    }
    set router(router) {
        this.#router = router
    }

    constructor() {
        this.#router = express.Router();

        let storage= multer.diskStorage({
            destination: function(req, res, cb){
                cb(null, 'public/img/Produtos');
            },
        filename: function(req, file, cb){
            var ext = file.originalname.split('.')[1];
            cb(null, Date.now().toString() + '.' + ext)
        }
        })

        let autenticacao = new Autenticação();

        let upload = multer({storage});

        let ctrl = new ProdutoController();
        this.#router.get('/', autenticacao.verificaUsuarioLogado, ctrl.listarView);
        this.#router.get('/cadastro', autenticacao.verificaUsuarioLogadoAdmin, ctrl.cadastroView);
        this.#router.get('/obter/:id', ctrl.obterProduto);
        this.#router.post("/cadastro", autenticacao.verificaUsuarioLogadoAdmin, upload.single("inputImagem"), ctrl.cadastrarProduto);
        this.#router.post("/excluir", autenticacao.verificaUsuarioLogadoAdmin, ctrl.excluirProduto);
        this.#router.get("/alterar/:id", autenticacao.verificaUsuarioLogadoAdmin, ctrl.alterarView);
        this.#router.post("/alterar", autenticacao.verificaUsuarioLogadoAdmin, upload.single('inputImagem'), ctrl.alterarProduto);
    }
}

module.exports = ProdutoRoute;