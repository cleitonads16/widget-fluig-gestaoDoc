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
            'refresh'   : ['click_fnRefresh','click_getArrayProject'],
            'documento' : ['click_tabModal', 'click_getArrayProject'],
            'adicionar' : ['click_incluirMit'],
            'excluir'   : ['click_fnDel']
        },
        global: {
            'checkboxTb': ['click_fnSelectAll'],
            'open-modal'   : ['click_modal'],
            'visualizarDoc': ['click_visualizar'],
            'cadastrar-MIT': ['click_setIncMIT','click_getEmpty']
        }
    },

     // Modal Incluir MIT
     incluirMit: function (){

        var myModalCadastrarMit = FLUIGC.modal({
            title: 'Incluir MIT',
            content: '<div class="tabModal" id="tabModal">'+
                     '<div class="panel panel-info">'+
                     '<div class="panel-body">'+
                     '<div class="row">'+
                     '<div class="col-xs-6 col-sm-4">'+
                     '<label for="cod_client">C&oacute;digo do Cliente:</label>'+
                     '<input type="text" id="cod_client" name="cod_client" class="form-control">'+
                     '</div>'+
                     '<div class="col-xs-6 col-sm-4">'+
                     '<label for="nm_client">Nome do Cliente:</label>'+
                     '<input type="text" id="nm_client" name="nm_client" class="form-control">'+
                     '</div>'+
                     '<div class="clearfix visible-xs-block"></div>'+
                     '<div class="col-xs-6 col-sm-4">'+
                     '<label for="projeto">C&oacute;digo do Projeto:</label>'+
                     '<input type="text" id="projeto" name="projeto" class="form-control">'+
                     '</div>'+
                     '</div>'+
                     '<div class="row">'+
                     '<div class="col-xs-6 col-sm-4">'+
                     '<label for="nm_projeto">Nome do Projeto:</label>'+
                     '<input type="text" id="nm_projeto" name="nm_projeto" class="form-control">'+
                     '</div>'+
                     '<div class="col-xs-6 col-sm-4">'+
                     '<label for="nm_responsavel">Respons&aacute;vel:</label>'+
                     '<input type="text" id="nm_responsavel" name="nm_responsavel" class="form-control">'+
                     '</div>'+
                     '<div class="clearfix visible-xs-block"></div>'+
                     '<div class="col-xs-6 col-sm-4">'+
                     '<label for="emailCliente">E-Mail do Cliente:</label>'+
                     '<input type="email" id="emailCliente" name="emailCliente" class="form-control">'+
                     '</div>'+
                     '</div>'+
                     '<div class="row">'+
                     '<div class="form-group col-md-4">'+
                     '<label for="stProjeto">Status do Projeto:</label>'+
                     '<select id="st_projeto" class="form-control">'+
                     '<option value="Ativo">Ativo</option>'+
                     '<option value="Suspenso">Suspenso</option>'+
                     '<option value="Encerrado">Encerrado</option>'+
                     '</select>'+
                     '</div>'+
                     '<div class="col-xs-6 col-sm-4">'+
                     '<label for="loja">Loja:</label>'+
                     '<input type="text" id="loja" name="loja" class="form-control">'+
                     '</div>'+
                     '<div class="form-group col-xs-4 col-sm-4 col-md-4 col-lg-4">'+
                     '<label class="control-label" style="margin-bottom: 10px;">Selecione o tipo de projeto:</label>'+
                     '<div class="div_margin">'+
                     '<label class="radio-inline">'+
                     '<input type="radio" name="tipoProjeto" id="tipoProjetoP" value="P" data-P>P'+
                     '</label>'+
                     '<label class="radio-inline">'+
                     '<input type="radio" name="tipoProjeto" id="tipoProjetoM" value="M" data-M>M'+
                     '</label>'+
                     '<label class="radio-inline">'+
                     '<input type="radio" name="tipoProjeto" id="tipoProjetoG" value="G" data-G>G'+
                     '</label>'+
                     '<label class="radio-inline">'+
                     '<input type="radio" name="tipoProjeto" id="tipoProjetoMIT" value="MIT" data-MIT>MIT'+
                     '</label>'+
                     '</div>'+
                     '</div>'+
                     '<div class="form-group col-xs-4 col-sm-4 col-md-4 col-lg-4">'+
                     '<label for="codMatricula">Matr&iacute;cula:</label>'+
                     '<input type="text" id="codMatricula" name="codMatricula" class="form-control">'+
                     '</div>'+
                     '<div class="clearfix visible-xs-block"></div>'+
                     '<div id="devControlMIT" class="form-group col-xs-4 col-sm-4 col-md-4 col-lg-4" style="display: none;">'+
                     '<label for="controlMIT">MIT:</label>'+
                     '<input type="text" id="controlMIT" name="controlMIT" class="form-control">'+
                     '</div>'+
                     '</div>'+
                     '</div>'+
                     '</div>'+       
                     '</div>',
            id: 'fluig-modaCadastrarMit',
            size: 'large',
            actions: [{
                'label': 'Cadastrar MIT',
                'bind': 'data-cadastrar-MIT',
                'autoClose': true
            },{
                'label': 'Fechar',
                'autoClose': true
            }]
        }, function(err, data) {
            if(err) {
                // do error handling
            } else {
                
                var dataset = DatasetFactory.getDataset('FormControleMits', null, null, null);
                var states = [];

                for (var i = 0; i < dataset.values.length; i++) {
                    states.push(dataset.values[i]['nm_responsavel'],
                                dataset.values[i]['codMatricula']);
                }

                console.table(states)

                var myAutocomplete = FLUIGC.autocomplete('#nm_responsavel', {
                    source: substringMatcher(states),
                    name: 'responsavel',
                    displayKey: 'description',
                    tagClass: 'tag-gray',
                    type: 'tagAutocomplete',
                    allowDuplicates: false,
                    highlight: true,
                    minLength: 1,
                    hint: true,
                    searchTimeout: 100,
                });

                function substringMatcher(strs) {
                    return function findMatches(q, cb) {
                        var matches, substrRegex;
                 
                        matches = [];
                 
                        substrRegex = new RegExp(q, 'i');
                 
                        $.each(strs, function (i, str) {
                            if (substrRegex.test(str)) {
                                matches.push({
                                    description: str
                                });
                            }
                        });
                        cb(matches);
                    };
                }

                // autocomplete.on("fluig.autocomplete.selected", function(event){
                //     var itemSelecionado = event.item;
                //     $("#codMatricula").val(itemSelecionado)
                // });
                
                
                /*var users = dataset.values;
     
                var settingsExampleDataset = {
                    source: users,
                    displayKey: 'codMatricula',
                    multiSelect: false,
                    style: {
                        autocompleteTagClass: 'tag-gray',
                        tableSelectedLineClass: 'info'
                    },
                    table: {
                        header: [{
                            'title': 'Matrícula',
                            'size': 'col-md-4',
                            'dataorder': 'matricula',
                            'standard': true
                        }],
                        renderContent: ['codMatricula']
                    }
                };
            
                var filter = FLUIGC.filter('#codMatricula', settingsExampleDataset);
                */
            }
        });        
    },

    // Modal Documentos
    tabModal: function (){

        var myModalDoc = FLUIGC.modal({
            title: 'MIT',
            content: '<div class="tabModal" id="tabModal">'+
                     '<table id="tabelaModal" class="table table-striped table-bordered table-responsive">'+
                     '<thead>'+
                     '<tr class="info">'+
                     '<td><b><input type="checkbox" id="lblPrinc" data-checkboxTb></b></td>'+
                     '<td><b>Documentos</b></td>'+
                     '<td><b>Projeto</b></td>'+
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
                },
                {
                    'label': 'Excluir',
                    'bind': 'data-excluir',
                },
                {
                    'label': 'Fechar',
                    'autoClose': true
                }]
        }, function(err, data) {
            if(err) {
                // do error handling
            } else {

                var htmlTab2 = "";
                var ds2 = DatasetFactory.getDataset('FormControleMits', null, null, null);

                for (var i = 0; i < ds2.values.length; i++){

                    var id = ds2.values[i]['documentid'];
                    var resp = ds2.values[i]['nm_projeto'];
                    var mit = ds2.values[i]['controlMIT'];

                    htmlTab2 += "<tr>"+
                                '<td><input type="checkbox" class="cbxSelect" name="cbxSelect___' + i + '" value="' + id + '"></td>' +
                                "<td><button type='button' class='btn btn-link' data-visualizarDoc>" + mit +"</td>" +
                                "<td>" + resp +"</td>"+
                                "</tr>";
            
                }

                document.getElementById("tbodyModal").innerHTML = htmlTab2;

               /* var html = "";
    
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
                });*/
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
        
        var htmlTab2 = "";
        var ds = DatasetFactory.getDataset('FormControleMits', null, null, null);
        var arr = [];

        for (var i = 0; i < ds.values.length; i++){
            
            var docId = ds.values[i]['documentid'];
            var codClient = ds.values[i]['cod_client'];
            var codProjeto = ds.values[i]['projeto'];
            var nomeProjeto = ds.values[i]['nm_projeto'];
            var nomeResponsavel = ds.values[i]['nm_responsavel'];
            var status = 'Ativo'
            // var status = ds.values[i]['controlMIT'];

            // Insere dados em nova array
            arr.push({

                cliente: codClient,
                projeto: codProjeto,
                nProjeto: nomeProjeto,
                responsavel: nomeResponsavel,
                stausProjeto: status
            })

            //Filtrando os dados repetidos
            arr = arr.filter(function (a) {
                return !this[JSON.stringify(a)] && (this[JSON.stringify(a)] = true);
            }, Object.create(null))

            // Mapeia os dados filtrados e insere em tabela
            var tabMap = arr.map(function(item, indice){

                var c1 = item.cliente;
                var c2 = item.projeto;
                var c3 = item.nProjeto;
                var c4 = item.responsavel;
                var c5 = item.stausProjeto;

                var html = "";

                html += "<tr>"+
                // '<td><input type="checkbox" class="cbxSelect" name="cbxSelect___' + i + '" value="' + docId + '"></td>' +
                "<td>" + c1 +"</td>"+
                "<td>" + c2 +"</td>" +
                "<td class='btnProjeto'><button type='button' class='btn btn-link tabDoc' data-documento>" + c3 +"<input type='hidden' class='btnProjeto' value='" + c3 +"'></td>" +
                "<td>" + c4 +"</td>" +
                '<td>' + c5 +'</button></td>' +
                "</tr>";

                return html 
    
            });

            
        }

        document.getElementById("arrayProj").innerHTML = tabMap.join('');

        $('#tnProjClient tbody tr td.btnProjeto').click(function(){
            var idElemento = $(this).find("input").val() ;  
            console.log(idElemento);

            var $rows = $('#tabModal tr');
            $(idElemento).change(function() {
                var val = $.trim($(this).val()).replace(/ +/g, ' ').toLowerCase();
                
                $rows.show().filter(function() {
                    var text = $(this).text().replace(/\s+/g, ' ').toLowerCase();
                    return !~text.indexOf(val);
                }).hide();
            }); 
         });
                
    },
    
    fnRefresh: function (){

        var myLoading1 = FLUIGC.loading('#tnProjClient');
        myLoading1.show();
        myLoading1.hide();
    },

    getEmpty: function() {

        document.getElementById('cod_client').value = "";
        document.getElementById('nm_client').value = "";
        document.getElementById('projeto').value = "";
        document.getElementById('nm_projeto').value = "";
        document.getElementById('nm_responsavel').value = "";
        document.getElementById('emailCliente').value = "";
        document.getElementById('loja').value = "";
        document.getElementById('tipoProjetoP').checked = true;
        document.getElementById('controlMIT').value = "";
        document.getElementById('st_projeto').value = "0";
        myTagAutocomplete.remove(states);

        // document.getElementById('emailTotvsSign').value = "";
        // document.getElementById('nomeTotvsSign').value = "";
        // document.getElementById('cpfTotvsSign').value = "";
        // document.getElementById('telTotvsSign').value = "";
        // document.getElementById('posTotvsSign').value = "";
        // document.getElementById('codDocumID').value = "";
    },

    setIncMIT: function(){
        
        var mitDocum = "";
        var mitP = new Array();
        mitP[0] = "MIT032 - CRONOGRAMA DO PROJETO";
        mitP[1] = "MIT005 - ATA DE REUNIAO";
        mitP[2] = "MIT041 - ESPECIFICACAO DE PROCESSOS";
        mitP[3] = "MIT008 - STATUS REPORT";
        mitP[4] = "MIT010 - VALIDACAO DE PROCESSOS";
        mitP[5] = "MIT062 - CERTIFICADO DE CONCLUSÃO";
    
        var mitM = new Array();
        mitM[0] = "MIT032 - CRONOGRAMA DO PROJETO";
        mitM[1] = "MIT021 - TERMO DE ABERTURA";
        mitM[2] = "MIT005 - ATA DE REUNIAO";
        mitM[3] = "MIT025 - CHECK LIST SIZING";
        mitM[4] = "MIT041 - ESPECIFICACAO DE PROCESSOS";
        mitM[5] = "MIT042 - FLUXOGRAMA DO PROCESSO";
        mitM[6] = "MIT008 - STATUS REPORT";
        mitM[7] = "MIT010 - VALIDACAO DE PROCESSOS";
        mitM[8] = "MIT061 - AUTORIZAÇÃO PARA GO LIVE";
        mitM[9] = "MIT046 - ANALISE DE GAP";
        mitM[10] = "MIT044 - ESPECIFICACAO DE PERSONALIZACAO";
    
        var mitG = new Array();
        mitG[0] = "MIT032 - CRONOGRAMA DO PROJETO";
        mitG[1] = "MIT021 - TERMO DE ABERTURA";
        mitG[2] = "MIT024 - APRESENTACAO ABERTURA DO PROJETO";
        mitG[3] = "MIT025 - CHECK LIST SIZING";
        mitG[4] = "MIT034 - MATRIZ DE RESPONSABILIDADE";
        mitG[5] = "MIT035 - MATRIZ DE COMUNICACAO";
        mitG[6] = "MIT036 - MATRIZ DE RISCOS";
        mitG[7] = "MIT041 - ESPECIFICACAO DE PROCESSOS";
        mitG[8] = "MIT042 - FLUXOGRAMA DO PROCESSO";
        mitG[9] = "MIT046 - ANALISE DE GAP";
        mitG[10] = "MIT005 - ATA DE REUNIAO";
        mitG[11] = "MIT008 - STATUS REPORT";
        mitG[12] = "MIT043 - ESPECIFICACAO DE PARAMETRIZACAO";
        mitG[13] = "MIT044 - ESPECIFICACAO DE PERSONALIZACAO";
        mitG[14] = "MIT010 - VALIDACAO DE PROCESSOS";
        mitG[15] = "MIT006 - LISTA DE TAREFAS E PENDENCIAS";
        mitG[16] = "MIT037 - PLANO DE TREINAMENTO";
        mitG[17] = "MIT038 - ESTRATÉGIA DE CONVERSÃO";
        mitG[18] = "MIT045 - ROTEIRO DE TESTES";
        mitG[19] = "MIT061 - AUTORIZAÇÃO PARA GO LIVE";
        mitG[20] = "MIT062 - CERTIFICADO DE CONCLUSÃO";
    
        var qtProjeto = 0;
        var tipo = "";
        if (document.getElementById('tipoProjetoP').checked == true) {
            qtProjeto = mitP.length;
            tipo = "P";
        }
        else if (document.getElementById('tipoProjetoM').checked == true) {
            qtProjeto = mitM.length;
            tipo = "M";
        }
        else if (document.getElementById('tipoProjetoG').checked == true) {
            qtProjeto = mitG.length;
            tipo = "G";
        }
        else {
            qtProjeto = 1;
            tipo = "MIT";
        }
    
        for (var i = 0; i < qtProjeto; i++) {
            if (tipo == "MIT")
                mitDocum = document.getElementById('controlMIT').value;
            else if (tipo == "P")
                mitDocum = mitP[i];
            else if (tipo == "M")
                mitDocum = mitM[i];
            else if (tipo == "G")
                mitDocum = mitG[i];
    
            var xml = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.dm.ecm.technology.totvs.com/">' +
                '<soapenv:Header/>' +
                '<soapenv:Body>' +
                '<ws:create>' +
                '<companyId>1</companyId>' +
                '<username>admin</username>' +
                '<password>!Senha@2020!</password>' +
                '<card>' +
                '<item>' +
                '<attachs/>' +
                '<cardData>' +
                '<field>cod_client</field>' +
                '<value>' + document.getElementById('cod_client').value + '</value>' +
                '</cardData>1' +
                '<cardData>' +
                '<field>nm_client</field>' +
                '<value>' + document.getElementById('nm_client').value + '</value>' +
                '</cardData>1' +
                '<cardData>' +
                '<field>projeto</field>' +
                '<value>' + document.getElementById('projeto').value + '</value>' +
                '</cardData>1' +
                '<cardData>' +
                '<field>nm_projeto</field>' +
                '<value>' + document.getElementById('nm_projeto').value + '</value>' +
                '</cardData>1' +
                '<cardData>' +
                '<field>nm_responsavel</field>' +
                '<value>' + document.getElementById('nm_responsavel').value + '</value>' +
                '</cardData>1' +
                '<cardData>' +
                '<field>emailCliente</field>' +
                '<value>' + document.getElementById('emailCliente').value + '</value>' +
                '</cardData>1' +
                '<cardData>' +
                '<field>controlMIT</field>' +
                '<value>' + mitDocum + '</value>' +
                '</cardData>1' +
                '<cardData>' +
                '<field>loja</field>' +
                '<value>' + document.getElementById('loja').value + '</value>' +
                '</cardData>1' +
                '<cardData>' +
                '<field>Status</field>' +
                '<value>' + document.getElementById('st_projeto').value + '</value>' +
                '</cardData>1' +
                '<cardData>' +
                '<field>codMatricula</field>' +
                '<value>' + document.getElementById('codMatricula').value + '</value>' +
                '</cardData>1' +
                '<cardData>' +
                '<field>tipoProjeto</field>' +
                '<value>' + tipo + '</value>' +
                '</cardData>1' +
                '<cardData>' +
                '<field>IdDocumSign</field>' +
                '<value>0</value>' +
                '</cardData>1' +
                '<colleagueId>'+WCMAPI.userCode+'</colleagueId>' +
                '<docapprovers />' +
                '<docsecurity />' +
                '<expires>false</expires>' +
                '<parentDocumentId>203899</parentDocumentId>' +
                '<reldocs />' +
                '</item>' +
                '</card>' +
                '</ws:create>' +
                '</soapenv:Body>' +
                '</soapenv:Envelope>';
    
            var wsUrl = WCMAPI.getServerURL() + "/webdesk/ECMCardService?wsdl";
            $.ajax({
                type: "POST",
                dataType: "xml",
                url: wsUrl,
                data: xml,
                crossDomain: true,
                success: function (data) {
                    FLUIGC.toast({
                        title: "Sucesso",
                        message: 'Projeto cadastrado com sucesso. Relação das MITs de acordo com o tamanho do projeto selecionado.',
                        type: 'success',
                        timeout: 10000
                    });
                },
                error: function (error) {
                    FLUIGC.toast({
                        title: "Erro ao adicionar a documentação",
                        message: 'Verificar o problema na integração do ECMCardService.',
                        type: 'danger',
                        timeout: 50000
                    });
                    console.log("Resultado com erro da Aplicação = " + error);
                }
            });
        }
    },

    fnSelectAll: function (){
        var sel = document.getElementsByClassName('cbxSelect');
        if (document.getElementById('lblPrinc').checked == true) {
            for (var i = 0; i < sel.length; i++) {
                sel[i].checked = true;
            }
        }
        else {
            for (var i = 0; i < sel.length; i++) {
                sel[i].checked = false;
            }
        }
    },

    fnDel: function () {
       
        var classCkbSelect = document.getElementsByClassName('cbxSelect');
        console.log(classCkbSelect)
        for (var i = 0; i < classCkbSelect.length; i++) {
            if (classCkbSelect[i].checked == true) {
                var c1 = DatasetFactory.createConstraint('documentid', classCkbSelect[i].value, classCkbSelect[i].value, ConstraintType.MUST);
                var datasetFormControleMits = DatasetFactory.getDataset('FormControleMits', null, new Array(c1), null);
    
                if (datasetFormControleMits.values[0].IdDocumSign == "0") {
                    //fnDelete(classCkbSelect[i].value);
                    var c1 = DatasetFactory.createConstraint('cardid', classCkbSelect[i].value, classCkbSelect[i].value, ConstraintType.MUST);
                    var dsDeleteCard = DatasetFactory.getDataset('dsDeleteCard', null, new Array(c1), null);
    
                    FLUIGC.toast({
                        title: "Sucesso",
                        message: 'Registro eliminado com sucesso.',
                        type: 'success',
                        timeout: 10000
                    });
                }
                else {
                    FLUIGC.toast({
                        title: "Erro",
                        message: 'O documento já foi para o Totvs Sign.',
                        type: 'danger',
                        timeout: 50000
                    });
                }
            }
        }

        this.getArrayProject();
    },

    
});




