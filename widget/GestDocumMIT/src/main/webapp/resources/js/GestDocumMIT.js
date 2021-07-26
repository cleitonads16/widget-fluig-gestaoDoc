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
            'horas': ['blur_calculoHoras'],
            'refresh': ['click_fnRefresh'],
            'documento': ['click_tabModal'],
            // 'testEditForm': ['click_editarForm']
        },
        global: {
            'open-modal': ['click_modal'],
            'visualizarDoc': ['click_visualizar']
        }
    },

    // Modal Documentos
    tabModal: function (){

        var myModal = FLUIGC.modal({
            title: 'MIT',
            content: '<div class="tabModal" id="tabModal">'+
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
                    url : '/api/public/ecm/document/listDocumentWithChildren/203444', 
                    success: function(retorno) {
                        $.each(retorno.content,function(k,v){ 
                            var objeto = new Object(); objeto = v.children; 
                            for(var x = 0; x < objeto.length; x++){ 
                                
                                html += "<tr>"+
                                        "<td>"+ x +"</td>" +
                                        '<td><button type="button" class="btn btn-link" data-visualizarDoc>'+ objeto[x].description +'</button></td>' +
                                        "</tr>";
                            } 
            
                        })

                        document.getElementById('tbodyModal').innerHTML = html;
                    } 
                });
            }
        });        
    },

    //Visualizacao de documentos
    visualizar: function(){
        
        var modal = document.getElementById("tabModal")
            var docId = "23149"
            var docVersion = "1000"
            var parentOBJ;

            if (modal.opener) {
                parentOBJ = modal.opener.parent;
            } else {
                parentOBJ = parent;
            }
        
            var cfg = {
                url : "/ecm_documentview/documentView.ftl",
                maximized : true,
                title : "Visualizador de Documentos",
                callBack : function() {
                    parentOBJ.ECM.documentView.getDocument(docId, docVersion);
                },
                customButtons : []
            };

            parentOBJ.WCMC.panel(cfg);
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

    // Modal Visualizar documentos
    /*modalVisuDoc: function (){
        console.log('CLIQUEI EM VISUALIZAR DOC')
        var myModalVisuDoc = FLUIGC.modal({
            title: 'Visualizar Documento',
            content: '<div id="divContratoAss" class="row">'+
                     '<div id="divContratoAss" class="panel panel-primary">'+
                     '<div class="panel-heading">'+
                     '<h3><b><i class="fluigicon fluigicon-file-approval icon-md"></i>MIT</b>'+
                     '</h3>'+
                     '</div>'+
                     '<div class="panel-body">'+
                     '<div class="row">'+
                     '<div class="col-xs-5 col-sm-3">'+
                     '<button type="button" class="btn btn-primary" id="contratoTotvsSign">'+
                     '<i class="fluigicon fluigicon-download icon-xl"></i>'+
                     '</button>'+
                     '</div>'+
                     '</div>'+
                     '<br>'+
                     '<div class="row">'+
                     '<div class="col-xs-12 col-sm-12">'+
                     '<iframe id="downPDF" height="500px" class="col-xs-12 col-sm-12"></iframe>'+
                     '</div>'+
                     '</div>'+
                     '</div>'+
                     '</div>'+
                     '</div>',
            id: 'fluig-modalVisuDoc',
            size: 'large',
            actions: [/*{
                'label': 'Salvar',
                'bind': 'data-open-modalVisuDoc',
            },{
                'label': 'Fechar',
                'autoClose': true
            }]
        }, function(err, data) {
            if(err) {
                // do error handling
            } else {
                
                
            }
        });        
    },*/

    //Tabela de dados principal
    getArrayProject: function (){
        
        var html = "";
        var ds = DatasetFactory.getDataset('ds_controleMits', null, null, null);
    
        for (var i = 0; i < ds.values.length; i++){
            
            var id = ds.values[i]['metadata#id'];
            var codCliente = ds.values[i]['cod_client'];
            var nomeProjeto = ds.values[i]['nm_projeto'];
            var nomeCliente = ds.values[i]['nm_client'];
            var nomeResponsavel = ds.values[i]['nm_responsavel'];
            var documento = ds.values[i]['controlMIT'];
            var horasPrevistas = ds.values[i]['hr_previstas'];
            var horasRealizadas = ds.values[i]['hr_realizadas'];
            var progresso = ds.values[i]['progresso'];
    
            html += "<tr>"+
                "<td>" + codCliente +"</td>"+
                "<td>" + nomeProjeto +"</td>" +
                "<td>" + nomeCliente +"</td>" +
                "<td>" + nomeResponsavel +"</td>" +
                '<td><button type="button" class="btn btn-link" data-documento>' + documento +'</button></td>' +
                "<td><input type='number' class='form-control horasPrevistas'data-horas value='"+ horasPrevistas +"'/></td>" +
                "<td><input type='number' class='form-control horasRalizadas'data-horas value='"+ horasRealizadas +"'/></td>" +
                "<td><button type='button' class='btn btn-link testeEditar' data-testEditForm>" + progresso + " <input type='hidden' class='id"+i+"' value='"+ id +"'</td>" +
                "</tr>";

            // caLcula a porcentagem
            parseInt(horasPrevistas)
            parseInt(horasRealizadas)

            var perc = "";

            if (isNaN(horasRealizadas) || isNaN(horasPrevistas)) {
                    perc = " ";
                } else {
                    perc =  (horasRealizadas/horasPrevistas) * 100;
                    parseFloat(perc);
                }
                    
                var n = perc.toFixed(1);
                if(isNaN(n)){
                    n = "";
                }else{
                        console.log('Progresso: ' + n.replace(".", ",") + '%');
                }

                    
            
        }

        document.getElementById("arrayProj").innerHTML = html; 
        
        $(".testeEditar").click(function(){
            console.log($('.id2').val())
        })
       
    },
    
    fnRefresh: function (){

        var myLoading1 = FLUIGC.loading('#tnProjClient');
        myLoading1.show();
        myLoading1.hide();
    },

    calculoHoras: function (){

        var campo1 = parseInt($('.horasPrevistas').val());
        var campo2 = parseInt($('.horasRalizadas').val());
        var perc = "";

        if (isNaN(campo1) || isNaN(campo2)) {
            perc = " ";
        } else {
            perc =  (campo2/campo1) * 100;
            parseFloat(perc);
        } 
            
        var n = perc.toFixed(1);
            
        // $('#campo3').val(n.replace(".", ",") + '%');
   
        console.log('Progresso: ' + n.replace(".", ",") + '%')
    
    },

    // editarForm: function(){

    //     console.log('CLIQUEI EM EDITAR FORM')
    //     var dataset = DatasetFactory.getDataset('ds_controleMits', null, null, null);

    //     for (var i = 0; i < dataset.values.length; i++){
          
    //         var id = dataset.values[i]['metadata#id'];
    //         var versao = dataset.values[i]['metadata#version'];

    //     }

    //     var modal = document.getElementById("divLoading")
    //     var docId = "204133"
    //     var docVersion = "1000"
    //     var parentOBJ;

    //     if (modal.opener) {
    //         parentOBJ = modal.opener.parent;
    //     } else {
    //         parentOBJ = parent;
    //     }
    
    //     var cfg = {
    //         url : "/ecm_documentview/documentView.ftl",
    //         maximized : true,
    //         title : "Visualizador de Documentos",
    //         callBack : function() {
    //             parentOBJ.ECM.documentView.getDocument(docId, docVersion);
    //         },
    //         customButtons : []
    //     };

    //     parentOBJ.WCMC.panel(cfg); 
    // }
    
});




