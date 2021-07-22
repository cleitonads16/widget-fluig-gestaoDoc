var MyWidget = SuperWidget.extend({
    //variáveis da widget
    variavelNumerica: null,
    variavelCaracter: null,

    //método iniciado quando a widget é carregada
    init: function() {

        var data = $.datepicker.formatDate('dd/mm/yy', new Date());
        $('#nomCoord_'+this.instanceId).val(WCMAPI.getUser());
        $('#data_'+this.instanceId).val(data);

        this.getArrayProject();
        this.carregar();

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
            'horas': ['blur_calculoHoras','blur_salvar'],
            'refresh': ['click_fnRefresh'],
            'documento': ['click_tabModal'],
        },
        global: {
            'open-modal': ['click_modal'],
        }
    },

    // Modal Documentos
    tabModal: function (){

        var myModal = FLUIGC.modal({
            title: 'MIT',
            content: '<div class="tabModal">'+
                     '<table id="tabelaModal" class="table table-striped table-bordered table-responsive">'+
                     '<thead>'+
                     '<tr class="info">'+
                     '<td><b>Sequ&ecirc;ncia</b></td>'+
                     '<td><b>Documento</b></td>'+
                     '</tr>'+
                     '</thead>'+
                     '<tbody id="tbodyModal"></tbody>'+
                     '</table>'+
                     '</div>',
            id: 'fluig-modalMit',
            size: 'large',
            actions: [{
                'label': 'Gráficos',
                'bind': 'data-open-modal',
            },{
                'label': 'Fechar',
                'autoClose': true
            }]
        }, function(err, data) {
            if(err) {
                // do error handling
            } else {
                
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
            }
        });        
    },

    // Modal Graficos 
    modal: function() {
        
        var myModal = FLUIGC.modal({
            title: 'Gráficos',
            content: '<div id="MY_SELECTOR">'+
                     '<canvas id="set_an_id_for_my_chart"  width="700" height="200"></canvas>'+
                     '</div>',
            id: 'fluig-modal',
            size: 'large',
            actions: [{
                'label': 'Fechar',
                'autoClose': true
            }]
        }, function(err, data) {
            if(err) {
                // do error handling
            } else {
                
                var ctx = document.getElementById("set_an_id_for_my_chart");
                var ds = DatasetFactory.getDataset("ds_testeGraficos",null,null,null);
                var arrValores = [];
                var arrLabels = [];
                var arrCores = [];

                //Cria cores aleatórias
                var randomColorGenerator = function () { 
                    return '#' + (Math.random().toString(16) + '0000000').slice(2, 8); 
                };

                for (x = 0; x < ds.values.length; x++){
                    arrValores[x] = ds.values[x].QUANTIDADE;
                    arrLabels[x] = ds.values[x].MIT;
                    arrCores[x] = randomColorGenerator();
                }
                
                var dados = {
                    datasets: [{
                        data: arrValores,
                        backgroundColor: arrCores
                    }],
                    labels: arrLabels
                };

                var opcoes = {
                    cutoutPercentage: 70
                };

                var meuDonutChart = new Chart(ctx, {
                    type: 'doughnut',
                    data: dados,
                    options: opcoes
                });
            }
        });
    },

    //Tabela de dados principal
    getArrayProject: function (){
        
        var html = "";
        var codCliente = "";
        var nomCliente = "";
    
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
                '<td><button type="button" id="btLinkMIT" class="btn btn-link" value="' + dsProjetosProtheus.values[i].projeto +'"data-documento>MIT P</button></td>' +
                "<td><input type='number' id='horasPrevistas' class='form-control'data-horas/></td>" +
                "<td><input type='number' id='horasRalizadas' class='form-control'data-horas/></td>" +
                "<td>Progresso</td>" +
                "</tr>";
            
        }

        document.getElementById("arrayProj").innerHTML = html;
       
    },
    
    fnRefresh: function (){
        console.log('REFRESH')
        var myLoading1 = FLUIGC.loading('#tnProjClient');
        myLoading1.show();
        myLoading1.hide();
    },

    calculoHoras: function (){

        var num1 = $("#horasPrevistas").val();
        num1 = parseInt(num1);
        var num2 = $("#horasRalizadas").val();;
        num2 = parseInt(num2);
    
        var sub  = num1-num2;

        console.log('SUB: ' + sub)
    
    },

    salvar: function(){
        console.log('SALVEI');
        localStorage.setItem("horasPrevistas",document.getElementById("horasPrevistas").value);
        localStorage.setItem("horasRalizadas",document.getElementById("horasRalizadas").value);

    },

    carregar: function(){

        document.getElementById("horasPrevistas").value = localStorage.getItem("horasPrevistas");
        document.getElementById("horasRalizadas").value = localStorage.getItem("horasRalizadas");
        
     }
});




