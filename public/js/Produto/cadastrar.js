document.addEventListener("DOMContentLoaded", function(){

    var btnGravar = document.getElementById("btnGravar");

    btnGravar.addEventListener("click", gravarProduto);
    
    let inputImagem = document.getElementById("inputImagem");

    inputImagem.addEventListener('change', exibirPreviaImagem);
})

function exibirPreviaImagem() {

    let file = document.getElementById("inputImagem").files[0];

    if(file.type == "image/png" || file.type == "image/jpg" || file.type == "image/jpeg") {
        let link = URL.createObjectURL(file);

        let previaImagem = document.getElementById("previaImagem");

        previaImagem.src = link;
        previaImagem.style["display"] = "block";
    }
    else {
        alert("Arquivo não suportado");
        document.getElementById("inputImagem").files = null;
    }
}


function gravarProduto() {

    var inputCodigo = document.getElementById("inputCodigo");
    var inputNome = document.getElementById("inputNome");
    var inputQtde = document.getElementById("inputQtde");
    var selMarca = document.getElementById("selMarca");
    var selCategoria = document.getElementById("selCategoria");
    var inputPreco = document.getElementById("inputPreco");
    var inputImagem = document.getElementById("inputImagem");

    //if de validação básica
    if(inputCodigo.value != "" && inputNome.value != "" && inputQtde.value != "" && inputQtde.value != '0' && selMarca.value != '0' && selCategoria.value != '0' && inputPreco.value > 0 && inputImagem.files.length > 0){

        /*var data = {
            codigo: inputCodigo.value,
            nome: inputNome.value,
            quantidade: inputQtde.value,
            marca: selMarca.value,
            categoria: selCategoria.value
        }*/

        let formData = new FormData();

        formData.append("codigo", inputCodigo.value);
        formData.append("nome", inputNome.value);
        formData.append("quantidade", inputQtde.value);
        formData.append("preco", inputPreco.value);
        formData.append("marca", selMarca.value);
        formData.append("categoria", selCategoria.value);
        formData.append("inputImagem", inputImagem.files[0]);

        fetch('/produto/cadastro', {
            method: "POST",
            body: formData
        })
        .then(r => {
            return r.json();
        })
        .then(r=> {
            if(r.ok) {
                alert("Produto cadastrado!");
            }
            else{
                alert("Erro ao cadastrar produto");
            }
        })
        .catch(e => {
            console.log(e);
        })

    }
    else{
        alert("Preencha todos os campos corretamente!");
        return;
    }
}