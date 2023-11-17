const Database = require('../db/database');

const banco = new Database();


class PedidoItemModel{

    #pedidoItemId;
    #pedidoId;
    #produtoId;
    #produtoNome;
    #pedidoItemQuantidade;
    #pedidoItemPreco;


    get pedidoId(){
        return this.#pedidoId;
    }

    set pedidoId(pedidoId){
        this.#pedidoId = pedidoId;
    }


    get pedidoItemId(){
        return this.#pedidoItemId;
    }

    set pedidoItemId(pedidoItemId){
        this.#pedidoItemId = pedidoItemId;
    }


    get produtoId(){
        return this.#produtoId;
    }

    set produtoId(produtoId){
        this.#produtoId = produtoId;
    }


    get produtoNome(){
        return this.#produtoNome;
    }

    set produtoNome(produtoNome){
        this.#produtoNome = produtoNome;
    }   


    get pedidoItemQuantidade(){
        return this.#pedidoItemQuantidade;
    }

    set pedidoItemQuantidade(pedidoItemQuantidade){
        this.#pedidoItemQuantidade = pedidoItemQuantidade;
    }


    get pedidoItemPreco(){
        return this.#pedidoItemPreco;
    }

    set pedidoItemPreco(pedidoItemPreco){
        this.#pedidoItemPreco = pedidoItemPreco;
    }


    constructor(pedidoItemId, pedidoId, produtoId, produtoNome, pedidoItemQuantidade, pedidoItemPreco){
        this.#pedidoItemId = pedidoItemId;
        this.#pedidoId = pedidoId;
        this.#produtoId = produtoId;
        this.#produtoNome = produtoNome;
        this.#pedidoItemQuantidade = pedidoItemQuantidade;
        this.#pedidoItemPreco = pedidoItemPreco;

    }

    async gravar(){

        let sql = 'insert into tb_pedidoitens (ped_id, prd_id, pit_quantidade, pit_preco) values (?,?,?,?)';

        let valores = [this.#pedidoId, this.#produtoId, this.#pedidoItemQuantidade, this.#pedidoItemPreco];

        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

    async listar(){
        let sql = `select * from tb_pedido p 
        inner join tb_pedidoitens i on p.ped_id = i.ped_id 
        inner join tb_produto pr on i.prd_id = pr.prd_id`;

        let rows = await banco.ExecutaComando(sql);
        let lista = [];

        for(let i = 0; i < rows.length; i++){
            let item = rows[i];
            let pedidoItem = new PedidoItemModel(item['pit_id'], item['ped_id'], item['prd_id'], item['prd_nome'], item['pit_quantidade'], item['pit_preco']);

            lista.push(pedidoItem);
        }

        return lista;
    }
}


module.exports =  PedidoItemModel;