
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
            'execute': ['click_executeAction'],
            'graficos': ['click_fnViewGrafico'],
            'tipo_graph': ['change_fnGrafico']
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

    // função invocada na mudança dos itens do select
    fnGrafico: function(){
   	
    	// exemplo de array com valores fixos
    	var array_fixo = [65, 59, 80, 81, 56, 55, 40];
    	
    	// consulta um dataset customizado
    	var ds = DatasetFactory.getDataset("ds_testeGraficos",null,null,null);

    	// criar um array vazio para receber os dados do dataset
        var array_vazio = [];

    	// popula o array 
        for (x = 0; x < ds.values.length; x++){
        	array_vazio[x] = ds.values[x].Valor;
        }
    	
    	// verifica o valor do setado no combo 
    	var tipoCombo = $("#cmbTipo").val();
    	
    	// se for selecionado valor "bar"
    	if(tipoCombo == "bar"){
    	 	
    		// oculta o gráfico do tipo line
    		$("#lineType").hide();
    		
    		// exibe o gráfico do tipo bar
        	$("#barType").show();
        	
        	//definição dos dados utilizados para gerar o gráfico
    		var data = {
        		    //campos do gráfico
    				labels: ["P", "M", "G"],
    				// valores e formatações
        		    datasets: [
        		        {        		            
        		            fillColor: "rgba(220,220,220,0.2)",
        		            strokeColor: "rgba(220,220,220,1)",
        		            pointColor: "rgba(220,220,220,1)",
        		            pointStrokeColor: "#fff",
        		            pointHighlightFill: "#fff",
        		            pointHighlightStroke: "rgba(220,220,220,1)",
        		            // passando um dataset customizado como valor de fonte para o gráfico
        		            data: array_vazio 
        		        },
        		        {        		            
        		            fillColor: "rgba(151,187,205,0.2)",
        		            strokeColor: "rgba(151,187,205,1)",
        		            pointColor: "rgba(151,187,205,1)",
        		            pointStrokeColor: "#fff",
        		            pointHighlightFill: "#fff",
        		            pointHighlightStroke: "rgba(151,187,205,1)",
        		            // passando um array fixo como valor de fonte para o gráfico
        		            data: [280, 480, 940, 1900, 860, 727, 690]
        		        }
        		    ]
        		};
        	
    		// criação do gráfico
        	var chart = FLUIGC.chart('#barType', {
        	    id: 'barNew',
        	    width: '700',
        	    height: '200',
        	    // aqui poderão ser definidos outros options
        	});
        	
        	// definição do dados utilizados e o tipo de gráfico
        	var barChart = chart.bar(data, "");        	
    	}
    	
    	//se for selecionado valor "bar"
    	if(tipoCombo == "line"){
    		
    		//oculta gráfico de colunas
    		$("#barType").hide();
    		//oculta gráfico de 
    	 	$("#lineType").show();
    	 	
    	  	//definição dos dados utilizados para gerar o gráfico
    		var data = {
    				labels: ["P", "M", "G"],
    				// valores e formatações
        		    datasets: [
        		        {        		           
        		            fillColor: "rgba(220,220,220,0.2)",
        		            strokeColor: "rgba(220,220,220,1)",
        		            pointColor: "rgba(220,220,220,1)",
        		            pointStrokeColor: "#fff",
        		            pointHighlightFill: "#fff",
        		            pointHighlightStroke: "rgba(220,220,220,1)",
        		            data: array_vazio 
        		        },
        		        {        		            
        		            fillColor: "rgba(151,187,205,0.2)",
        		            strokeColor: "rgba(151,187,205,1)",
        		            pointColor: "rgba(151,187,205,1)",
        		            pointStrokeColor: "#fff",
        		            pointHighlightFill: "#fff",
        		            pointHighlightStroke: "rgba(151,187,205,1)",
        		            data: [280, 480, 940, 1900, 860, 727, 690]
        		        }
        		    ]
        		};
    		
    		// criação do gráfico       	
        	var chart = FLUIGC.chart('#lineType', {
        	    id: 'lineNew',
        	    width: '700',
        	    height: '200',
        	 // passando um array fixo como valor de fonte para o gráfico
        	});
        	
        	// definição do dados utilizados e o tipo de gráfico
        	var lineChart = chart.line(data, "");
    	}
    },

    fnViewGrafico: function() {
        var modGraphic = document.getElementById('mdGraphicPerc');
        modGraphic.style.display = 'block';
    }
    
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
//     let ctx = document.getElementById("myChart");
//     var canvas = document.getElementsByTagName('canvas')[0];

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

window.onclick = function (event) {
    var modGraphic = document.getElementById('mdGraphicPerc');
    var modal = document.getElementById('mdDocumMIT');

    if (event.target == modal) {
        modal.style.display = 'none';
    }
    if (event.target == modGraphic) {
        modGraphic.style.display = 'none';
    }
}

var spanGraphic = document.getElementsByClassName('close')[1];

function fnCloseSpanGraphic() {
    var modGraphic = document.getElementById('mdGraphicPerc');

    modGraphic.style.display = 'none';
}

function calculoHoras(){

    var num1 = $("#horasPrevistas").val();
    num1 = parseInt(num1);

    var num2 = $("#horasRalizadas").val();;
    num2 = parseInt(num2);

    var sub  = num1-num2;

    console.log('SUB: ' + sub)

}


