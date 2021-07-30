$( document ).ready(function(){

    $('.tabDoc').on('click', function () {
       teste()
    })
})

function teste(){

    console.log('Função teste Arquivo js 2')

    document.querySelectorAll(".tr_class").forEach(e => {
        e.addEventListener("click", function() {
           let valores_td = [];
           this.querySelectorAll("td").forEach(i => {
              valores_td.push(i.textContent.trim());
           });
           console.log(valores_td);
        });
     });

    // var $rows = $('#tabelaModal tr');
    // $("#filtrar_tabela").change(function() {

    //     var val = $.trim($(this).val()).replace(/ +/g, ' ').toLowerCase();
                                
    //     $rows.show().filter(function() {
    //         var text = $(this).text().replace(/\s+/g, ' ').toLowerCase();
    //         return !~text.indexOf(val);
    //     }).hide();
    // }); 
}


