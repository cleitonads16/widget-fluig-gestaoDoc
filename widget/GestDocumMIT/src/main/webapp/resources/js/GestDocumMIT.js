var myLoading1 = FLUIGC.loading('#divLoading');
var MyWidget = SuperWidget.extend({
    //variáveis da widget
    variavelNumerica: null,
    variavelCaracter: null,

    //método iniciado quando a widget é carregada
    init: function() {

        getArrayProject();
        
        //Editar horas previstas e horas realizadas
        $(".h-prev").dblclick(function () {
            console.log('Cliquei Prev')
            var conteudoOriginal = $(this).val();
            $(this).addClass("celulaEmEdicao");
            $(this).html("<input type='text' value='" + conteudoOriginal + "'/>");
            $(this).children().first().focus();
    
            $(this).children().first().keypress(function (e) {
                if (e.which == 13) {
                    var novoConteudo = $(this).val();
                    $(this).parent().text(novoConteudo).val(parseInt(novoConteudo));
                    $(this).parent().removeClass("celulaEmEdicao");
                }
            });
    
            $(this).children().first().blur(function(){
                $(this).parent().text(conteudoOriginal);
                $(this).parent().removeClass("celulaEmEdicao");
            });
        });

        $(".h-realiz").dblclick(function () {
            console.log('Cliquei Realiz')
            var conteudoOriginal = $(this).val();
            $(this).addClass("celulaEmEdicao");
            $(this).html("<input type='text' value='" + conteudoOriginal + "'/>");
            $(this).children().first().focus();
    
            $(this).children().first().keypress(function (e) {
                if (e.which == 13) {
                    var novoConteudo = $(this).val();
                    $(this).parent().text(novoConteudo).val(parseInt(novoConteudo));
                    $(this).parent().removeClass("celulaEmEdicao");
                    
                }
            })
    
            $(this).children().first().blur(function(){
                $(this).parent().text(conteudoOriginal);
                $(this).parent().removeClass("celulaEmEdicao");
            });

        });
        
    },
  
    //BIND de eventos
    bindings: {
        local: {
            'execute': ['click_executeAction'],
            'calculoHoras': ['keypress_calculoHoras']
        },
        global: {}
    },
 
    executeAction: function(htmlElement, event) {
        alert("Teste 2");
    },

    calculoHoras: function(){

        var hPrev = $(".h-prev").val();
        var hRealiz = $(".h-realiz").val();
        var calculo = hPrev - hRealiz;
    
        console.log('CAUCULO:  '+calculo);
    
    }
    
});


function fnRefresh(){
    getArrayProject();
}

function getArrayProject(){
    var html = "";
    var codCliente = "";
    var nomCliente = "";

    myLoading1.show();
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
            '<td><button type="button" id="btLinkMIT" class="btn btn-link" value="' + dsProjetosProtheus.values[i].projeto+'" onclick="fnArrayMIT(this);">MIT P</button></td>' +
            "<td class='h-prev'>00:00</td>" +
            "<td class='h-realiz'data-calculoHoras>00:00</td>" +
            "<td>Progresso</td>" +
            "</tr>";
    }
    document.getElementById("arrayProj").innerHTML = html;
    myLoading1.hide();
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

function fnGraphicDonuts(){
    let ctx = document.getElementById("myChart");
    var canvas = document.getElementsByTagName('canvas')[0];

    var cores = new Array();
    cores[0] = 'red';
    cores[1] = 'yellow';
    cores[2] = 'blue';
    cores[3] = 'white';
    cores[4] = 'black';
    cores[5] = 'navy';
    cores[6] = 'beige';
    cores[7] = 'gray';
    cores[8] = 'gold';
    cores[9] = 'orange';
    cores[10] = 'brown';
    cores[11] = 'silver';
    cores[12] = 'pink';
    cores[13] = 'purple';
    cores[14] = 'green';
    cores[15] = 'violet';

    var projetos = new Array();
    projetos[0] = 'red';
    projetos[1] = 'yellow';
    projetos[2] = 'blue';
    projetos[3] = 'white';
    projetos[4] = 'black';
    projetos[5] = 'navy';
    projetos[6] = 'beige';
    projetos[7] = 'gray';
    projetos[8] = 'gold';
    projetos[9] = 'orage';
    projetos[10] = 'brown';
    projetos[11] = 'silver';
    projetos[12] = 'pink';
    projetos[13] = 'purple';
    projetos[14] = 'green';
    projetos[15] = 'violet';

    let dados = {
        datasets: [{
            data: [10, 10, 10, 10, 10, 5, 5, 5, 5, 5, 5, 5, 5, 5, 2, 3],
            backgroundColor: cores
        }],
        labels: projetos
    };

    let opcoes = {
        cutoutPercentage: 70
    };

    let meuDonutChart = new Chart(ctx, {
        type: 'doughnut',
        data: dados,
        options: opcoes
    });
}

function fnGraphic() {
    var modGraphic = document.getElementById('mdGraphicPerc');

    fnGraphicDonuts();
    modGraphic.style.display = 'block';
}

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


