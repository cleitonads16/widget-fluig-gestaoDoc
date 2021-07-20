
var MyWidget = SuperWidget.extend({
    //variáveis da widget
    variavelNumerica: null,
    variavelCaracter: null,

    //método iniciado quando a widget é carregada
    init: function() {

        var data = $.datepicker.formatDate('dd/mm/yy', new Date());
        $('#nomCoord_'+this.instanceId).val(WCMAPI.getUser());
        $('#data_'+this.instanceId).val(data);

        getArrayProject();
        this.tabModal();
        
        //Filtar tabela
        var $rows = $('#tnProjClient tr');
        $('#campFiltro').keyup(function() {
            var val = $.trim($(this).val()).replace(/ +/g, ' ').toLowerCase();
            
            $rows.show().filter(function() {
                var text = $(this).text().replace(/\s+/g, ' ').toLowerCase();
                return !~text.indexOf(val);
            }).hide();
        });
        
    },

    
  
    //BIND de eventos
    bindings: {
        local: {
            'testeGraf': ['click_grafcoDoughnut'],
            'graficos': ['click_modal'],
            'tipo_graph': ['click_fnGrafico']
        },
        global: {}
    },

    tabModal: function (){

        var html = "";
    
        $.ajax({ 
            async : true, 
            type : "GET", 
            contentType: "application/json", 
            url : '/api/public/ecm/document/listDocumentWithChildren/23146', 
            success: function(retorno) {
                $.each(retorno.content,function(k,v){ 
                    var objeto = new Object(); objeto = v.children; 
                    for(var x = 0; x < objeto.length; x++){ 
                        
                        html += "<tr>"+
                                "<td>"+ x +"</td>" +
                                '<td><button type="button" id="btLinkMITmodal" class="btn btn-link">'+ objeto[x].description +'</button></td>' +
                                "</tr>";
                    } 
    
                })

                document.getElementById('tbodyModal').innerHTML = html;
            } 
        });
        
    },

    // fnViewGrafico: function() {
    //     var modGraphic = document.getElementById('mdGraphicPerc');
    //     modGraphic.style.display = 'block';
    // },

    modal: function() {
        console.log('CLIQUEI NO MODAL')
        var myModal = FLUIGC.modal({
            title: 'Graficos',
            content: '<div id="MY_SELECTOR"></div>',
            id: 'fluig-modalMit',
            size: 'large',
            actions: [{
                'label': 'Fechar',
                'autoClose': true
            }]
        }, function(err, data) {
            if(err) {
                // do error handling
            } else {
                
                var data = [
                    {
                        value: 300,
                        color:"#B0CC49",
                        highlight: "rgb(176,204,73,0.5)",
                        label: "P"
                    },
                    {
                        value: 50,
                        color: "#C67926",
                        highlight: "rgb(198,121,38,0.5)",
                        label: "M"
                    },
                    {
                        value: 100,
                        color: "#ED145B",
                        highlight: "rgb(237,20,91,0.5)",
                        label: "G"
                    }
                ]
                var chart = FLUIGC.chart('#MY_SELECTOR', {
                    id: 'set_an_id_for_my_chart',
                    width: '700',
                    height: '200',
                    /* See the list of options */
                });
                // call the doughnut function
                var doughnutChart = chart.doughnut(data, "");
                doughnutChart.generateLegend();
                
            }
        });
    },

    
    
});


function fnRefresh(){
    console.log('REFRESH')
    var myLoading1 = FLUIGC.loading('#divLoading');
    myLoading1.show();
    myLoading1.hide();
}

function getArrayProject(){
    var html = "";
    var codCliente = "";
    var nomCliente = "";


    // myLoading1.show();
    //var c1 = DatasetFactory.createConstraint('projeto', 'OPV003', 'OPV003', ConstraintType.MUST);
    //var dsProjetosProtheus = DatasetFactory.getDataset('dsProjetosProtheus', null, new Array(c1), null);

    var c1 = DatasetFactory.createConstraint('codigo_cliente', '000002', '000002', ConstraintType.MUST);
    var dsProjetosProtheus = DatasetFactory.getDataset('dsProjetosProtheus', null, new Array(c1), null);

    for (var i = 0; i < dsProjetosProtheus.values.length; i++){
        var c1 = DatasetFactory.createConstraint('codigo', dsProjetosProtheus.values[i].codigo_cliente, dsProjetosProtheus.values[i].codigo_cliente, ConstraintType.MUST);
        var c2 = DatasetFactory.createConstraint('loja', dsProjetosProtheus.values[i].loja, dsProjetosProtheus.values[i].loja, ConstraintType.MUST);
    	var dsClienteProtheus = DatasetFactory.getDataset('dsClienteProtheus', null, new Array(c1, c2), null);
        

        if (dsClienteProtheus.values.length){
            codCliente = dsClienteProtheus.values[0].codigo;
            nomCliente = dsClienteProtheus.values[0].nome;
        }

        html += "<tr>"+
            "<td>" + dsProjetosProtheus.values[i].projeto+"</td>"+
            "<td>" + dsProjetosProtheus.values[i].descricao+"</td>" +
            "<td>"+nomCliente+"</td>" +
            "<td>Nome do Responsável</td>" +
            '<td><button type="button" id="btLinkMIT" class="btn btn-link" value="' + dsProjetosProtheus.values[i].projeto+'" onclick="fnArrayMIT(this);calculoHoras()" data-documento>MIT P</button></td>' +
            "<td><input type='number' id='horasPrevistas' class='form-control'/></td>" +
            "<td><input type='number' id='horasRalizadas' class='form-control'/></td>" +
            "<td>Progresso</td>" +
            "</tr>";
        
    }
    document.getElementById("arrayProj").innerHTML = html;
   
}



function fnArrayMIT(campoID) {
    var modal = document.getElementById('mdDocumMIT');
    //alert(campoID.value);
    modal.style.display = "block";
}

function fnCloseDocumMIT(){
    var modal = document.getElementById('mdDocumMIT');
    modal.style.display = "none";
}

function fnCloseOk() {
    var modal = document.getElementById('mdDocumMIT');
    modal.style.display = "none";
}

// function fnGraphicDonuts(){
//     console.log('ENTREI NA FUNÇÃO DONUTS')
//     let ctx = document.getElementById("myChart");
//     // var canvas = document.getElementsByTagName('canvas')[0];

//     var cores = new Array();
//     cores[0] = 'red';
//     cores[1] = 'yellow';
//     cores[2] = 'blue';
//     cores[3] = 'white';
//     cores[4] = 'black';
//     cores[5] = 'navy';
//     cores[6] = 'beige';
//     cores[7] = 'gray';
//     cores[8] = 'gold';
//     cores[9] = 'orange';
//     cores[10] = 'brown';
//     cores[11] = 'silver';
//     cores[12] = 'pink';
//     cores[13] = 'purple';
//     cores[14] = 'green';
//     cores[15] = 'violet';

//     var projetos = new Array();
//     projetos[0] = 'red';
//     projetos[1] = 'yellow';
//     projetos[2] = 'blue';
//     projetos[3] = 'white';
//     projetos[4] = 'black';
//     projetos[5] = 'navy';
//     projetos[6] = 'beige';
//     projetos[7] = 'gray';
//     projetos[8] = 'gold';
//     projetos[9] = 'orage';
//     projetos[10] = 'brown';
//     projetos[11] = 'silver';
//     projetos[12] = 'pink';
//     projetos[13] = 'purple';
//     projetos[14] = 'green';
//     projetos[15] = 'violet';

//     let dados = {
//         datasets: [{
//             data: [10,15,5,8,10,20,28,5,5,5,3,3,2,10,10,10],
//             backgroundColor: cores
//         }],
//         labels: projetos
//     };

//     let opcoes = {
//         cutoutPercentage: 70
//     };

//     let meuDonutChart = new Chart(ctx, {
//         type: 'doughnut',
//         data: dados,
//         options: opcoes
//     });
// }

// function fnGraphic() {
//     var modGraphic = document.getElementById('mdGraphicPerc');

//     fnGraphicDonuts();
//     modGraphic.style.display = 'block';
// }

// window.onclick = function (event) {
//     var modGraphic = document.getElementById('mdGraphicPerc');
//     var modal = document.getElementById('mdDocumMIT');

//     if (event.target == modal) {
//         modal.style.display = 'none';
//     }
//     if (event.target == modGraphic) {
//         modGraphic.style.display = 'none';
//     }
// }

var spanGraphic = document.getElementsByClassName('close')[1];

// function fnCloseSpanGraphic() {
//     var modGraphic = document.getElementById('mdGraphicPerc');

//     modGraphic.style.display = 'none';
// }

function calculoHoras(){

    var num1 = $("#horasPrevistas").val();
    num1 = parseInt(num1);

    var num2 = $("#horasRalizadas").val();;
    num2 = parseInt(num2);

    var sub  = num1-num2;

    console.log('SUB: ' + sub)

}


