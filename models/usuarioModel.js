const Database = require('../db/database')

const conexao = new Database();

class UsuarioModel{

    #usuId;
    #usuNome;
    #usuEmail;
    #usuAtivo;
    #usuSenha;
    #perId;
    #perDescricao;

    get usuId(){
        return this.#usuId;
    }
    set usuId(usuId){
        this.#usuId = usuId;
    }
//
    get usuNome(){
        return this.#usuNome;
    }
    set usuNome(usuNome){
        this.#usuNome = usuNome;
    }
//
    get usuEmail(){
        return this.#usuEmail;
    }
    set usuEmail(usuEmail){
        this.#usuEmail = usuEmail;
    }
//
    get usuAtivo(){
        return this.#usuAtivo;
    }
    set usuAtivo(usuAtivo){
        this.#usuAtivo = usuAtivo;
    }
//
    get usuSenha(){
        return this.#usuSenha;
    }
    set usuSenha(usuSenha){
        this.#usuSenha = usuSenha;
    }
//
    get perId() {
        return this.#perId;
    }
    set perId(perId){
        this.#perId = perId;
    }
//
    get perDescricao(){
        return this.#perDescricao;
    }

    set perDescricao(perDescricao){
        this.#perDescricao = perDescricao;
    }

    constructor(usuId, usuNome, usuEmail, usuSenha, usuAtivo, perId, perDescricao){
        this.#usuId = usuId;
        this.#usuNome = usuNome;
        this.#usuAtivo = usuAtivo;
        this.#usuEmail = usuEmail;
        this.#usuSenha = usuSenha;
        this.#perId = perId;
        this.#perDescricao = perDescricao;
    }

    async obterUsuario(id){
        let sql = `select * from tb_usuario where usu_id = ?`;
        let valores = [id];

        let rows = await conexao.ExecutaComando(sql, valores);

        if(rows.length > 0){
            let usuario = new UsuarioModel();
            usuario.usuId = rows[0]['usu_id'];
            usuario.usuNome = rows[0]['usu_nome'];
            usuario.usuEmail = rows[0]['usu_email'];
            usuario.#usuSenha = rows[0]['usu_senha'];
            usuario.#usuAtivo = rows[0]['usu_ativo'];
            usuario.perId = rows[0]['per_id'];
            return usuario;
        }

        return null

    }


    async gravarUsuario(){

        if(this.#usuId == 0){
            let sql = `insert into tb_usuario
            (usu_nome, usu_email, usu_ativo, usu_senha, per_id)
            values
            (?, ?, ?, ?, ?)`;

            let valores = [this.#usuNome, this.#usuEmail, this.#usuAtivo, this.#usuSenha, this.#perId];
        
            let resultado = await conexao.ExecutaComandoNonQuery(sql, valores);

            return resultado;
        }

        else{
            let sql = `update tb_usuario set usu_nome = ?, usu_email = ?, usu_ativo = ?, usu_senha = ?, per_id = ?
            where usu_id = ?`;

            let valores = [this.#usuNome, this.#usuEmail, this.#usuAtivo, this.#usuSenha, this.#perId, this.#usuId];
        
            let resultado = await conexao.ExecutaComandoNonQuery(sql, valores);

            return resultado;
        }
        
    }

    async listarUsuarios(){
        let lista = [];

        let sql = 'SELECT * from tb_usuario u inner join tb_perfil p on u.per_id = p.per_id'

        let rows = await conexao.ExecutaComando(sql)
        
        for(let i = 0; i < rows.length; i++){
            let row = rows[i];
            //row['usu_nome'];

            let usuario = new UsuarioModel(row['usu_id'], row['usu_nome'], row['usu_email'], row['usu_senha'], row['usu_ativo'], row['per_id'], row['per_desc']);

            lista.push(usuario);
        }

        return lista
    }

    async deletarUsuario(id){
        
        let sql = 'delete from tb_usuario where usu_id = ?';

        let valores = [id];

        let result = await conexao.ExecutaComandoNonQuery(sql, valores);

        return result
    }

    async autenticarUsuario(email, senha){

        let sql = "select * from tb_usuario where usu_email = ? and usu_senha = ? and usu_ativo = 'S'";

        let valores = [email, senha];

        let rows = await conexao.ExecutaComando(sql, valores);

        if(rows.length > 0){
            return new UsuarioModel(rows[0]['usu_id'], rows[0]['usu_nome'], rows[0]['usu_email'], rows[0]['usu_ativo'], rows[0]['usu_senha'], rows[0]['per_id'])
        }

        return null
    }
}

module.exports = UsuarioModel