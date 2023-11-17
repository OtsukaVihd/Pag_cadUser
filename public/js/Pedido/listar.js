document.addEventListener("DOMContentLoaded", function(){

    document.getElementById('btnExportarExcel').addEventListener('click', exportarExcel);

    function exportarExcel(){

        var wb = XLSX.utils.table_to_book(document.getElementById('tabelaPedidos'));
        XLSX.writeFile(wb, "RelatórioPedidos.xlsx");
    }

    function filtrarTabela(){
        var criterioBusca = document.querySelector('input[name="criterioBusca"]:checked').value;
        var termoBusca = document.getElementById('inputBusca').value;

        //fetch
        
    }
})