var MyWidget = SuperWidget.extend({
	//variáveis da widget
    variavelNumerica: null,
    variavelCaracter: null,

    //método iniciado quando a widget é carregada
    init: function() {
        
        var data = $.datepicker.formatDate('dd/mm/yy', new Date());
        $('#nomCoord_'+this.instanceId).val(WCMAPI.getUser());
        $('#data_'+this.instanceId).val(data);

        $("#controlMIT").prop('disabled', true);
        $("#tipoProjeto").change(function(){
            if(this.value == "MIT"){
                $("#controlMIT").prop('disabled', false);
            }else{
                $("#controlMIT").prop('disabled', true);
            }
        })
    },

     //BIND de eventos
     bindings: {
        local: {
            
            'visualizar' : ['click_visualizarProjetos'],
            'adicionar'  : ['click_inserirProjeto'/*,'click_getEmpty'*/],
        },
        global: {
            'documento'  : ['click_modal'],
            'visualizarDoc': ['click_visualizar'],
            'editarProj'   : ['click_modalEditar'],
        }
    },

    // Modal visualizar projeto
    visualizarProjetos: function (){

        var myModal = FLUIGC.modal({
            title: 'Projetos Inseridos',
            content: '<div class="divLoading" id="divLoading">'+
                    '<div class="col-md-12">'+
                        '<div class="form-group has-feedback">'+
                            '<input type="text" id="campFiltro" name="campFiltro" class="form-control" placeholder="Digite o dado da tabela que deseja filtrar">'+
                            '<i class="fluigicon fluigicon-search form-control-feedback"></i>'+
                        '</div>'+
                    '</div>'+
                    '<div class="row">'+
                        '<div class="col-md-12">'+
                            '<table class="table table-bordered table-responsive" id="tnProjClient">'+
                                '<thead class="scroll-thead">'+
                                    '<tr class="info">'+
                                        '<td><b><input type="checkbox" id="lblPrinc" data-checkboxTb></b></td>'+
                                        '<th><b>Cliente</b></th>'+
                                        '<th><b>Código Projeto</b></th>'+
                                        '<th><b>Nome do Projeto</b></th>'+
                                        '<th><b>Respons&aacute;vel</b></th>'+
                                        '<th><b>Status</b></th>'+
                                        '<th><b>Editar</b></th>'+
                                    '</tr>'+
                                '</thead>'+
                                '<tbody id="arrayProj" class="scroll-tbody-y table-body"></tbody>'+
                            '</table>'+
                        '</div>'+
                    '</div>'+
                '</div>',
            id: 'fluig-modal',
            size: 'full',
            actions: [{
                'label': 'Excluir',
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
               
                // carrega dados de projetos inseridos tela
                var ds = DatasetFactory.getDataset('ds_formDemoTesteLab', null, null, null);
                var arr = [];

                for (var i = 0; i < ds.values.length; i++){
                    
                    var docId = ds.values[i]['documentid'];
                    var codClient = ds.values[i]['cod_client'];
                    var codProjeto = ds.values[i]['projeto'];
                    var nomeProjeto = ds.values[i]['nm_projeto'];
                    var nomeResponsavel = ds.values[i]['nm_responsavel'];
                    var status = ds.values[i]['st_projeto'];

                    // Insere dados em nova array
                    arr.push({
                        id: docId,
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
                        var c6 = item.id;

                        var html = "";

                        html += "<tr class='tr_class'>"+
                        '<td><input type="checkbox" class="cbxSelect" data-checkboxTb><input type="hidden" class="id_documento" value="' + c6 + '"/></td>'+
                        "<td>" + c1 + "</td>"+
                        "<td>" + c2 +"</td>" +
                        "<td class='btnProjeto'><abbr title='Gráfico'><button type='button' class='btn-link tabDoc' data-documento>" + c3 +"</button></abbr><input type='hidden' class='btnProjeto' value='" + c3 +"'/></td>" +
                        "<td>" + c4 +"</td>" +
                        '<td>' + c5 +'</td>' +
                        '<td><button type="button" class="btn-link"><i class="fluigicon fluigicon-community-edit icon-md icone" data-editarProj></i></button></td>' +
                        "</tr>";

                        return html 
            
                    });
                    
                }

                document.getElementById("arrayProj").innerHTML = tabMap.join('');

                //Filtar tabela
                var $rows = $('#tnProjClient tr');
                $('#campFiltro').keyup(function() {
                    var val = $.trim($(this).val()).replace(/ +/g, ' ').toLowerCase();
                    
                    $rows.show().filter(function() {
                        var text = $(this).text().replace(/\s+/g, ' ').toLowerCase();
                        return !~text.indexOf(val);
                    }).hide();
                });

                // Seleciona checkebox
                $("#lblPrinc").on("click", function(){
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
                })
                
            }
        });        
    },

    getEmpty: function() {

        var clearInput = ""
        var clearSelect = "selecione"

        $('#cod_client').val(clearInput)
        $('#nm_client').val(clearInput)
        $('#projeto').val(clearInput)
        $('#nm_projeto').val(clearInput)
        $('#nm_responsavel').val(clearInput)
        $('#emailCliente').val(clearInput)
        $('#loja').val(clearInput)
        $('#tipoProjeto').val(clearSelect)
        $('#controlMIT').val(clearInput) 
        $("#hr_previstas").val(clearInput)
        $("#hr_realizadas").val(clearInput)
        $("#codMatricula").val(clearInput)
        $("#st_projeto").val(clearSelect)

    },

    inserirProjeto: function(){
    // adicionar formulário
                    
        var codigo = $("#cod_client").val()
        var cliente = $("#nm_client").val()
        var projeto = $("#projeto").val()
        var mn_projeto = $("#nm_projeto").val()
        var responsavel = $("#nm_responsavel").val()
        var email = $("#emailCliente").val()
        var loja = $("#loja").val()
        var status = $("#st_projeto").val()
        var horasPrev = $("#hr_previstas").val()
        var horasRealiz = $("#hr_realizadas").val()
        var matricula = $("#codMatricula").val()
        var usuario = "cleitonads"

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
        var dimencProjeto = $("#tipoProjeto").val()

        switch (dimencProjeto) {
            case 'P':
                qtProjeto = mitP.length;
                tipo = dimencProjeto;
                break;
            case 'M':
                qtProjeto = mitM.length;
                tipo = dimencProjeto;
                break;
            case 'G':
                qtProjeto = mitG.length;
                tipo = dimencProjeto;
                break;
            case 'MIT':
                qtProjeto = 1;
                tipo = dimencProjeto;
                break;
            default:
        }
    
        for (var i = 0; i < qtProjeto; i++) {

            switch (tipo) {

                case 'MIT':
                    mitDocum = $('#controlMIT').val();
                    break;
                case 'P':
                    mitDocum = mitP[i];
                    break;
                case 'M':
                    mitDocum = mitM[i];
                    break;
                case 'G':
                    mitDocum = mitG[i];
                    break;
                default:
            }
    
            console.log("PROJETO INSERIDO:  " + qtProjeto)

            var $xml = null
            $.ajax({
                url: "WCM/wcm/widget/demo_teste_lab/src/main/webapp/resources/js/xmls/ECMCardServiceCreate.xml",
                async: false,
                type: "get",
                datetype: "xml",
                success: function (xml){
                    $xml = $(xml)
                }
            })

           
            // Altera os valores recuperados nas variaveis
            $xml.find("companyId").text(1)
            $xml.find("username").text("academy.aluno")
            $xml.find("password").text("academy.aluno")

            // Campos
            $xml.find("[name='cod_client']").text(codigo)
            $xml.find("[name='nm_client']").text(cliente)
            $xml.find("[name='projeto']").text(projeto)
            $xml.find("[name='nm_projeto']").text(mn_projeto)
            $xml.find("[name='nm_responsavel']").text(responsavel)
            $xml.find("[name='emailCliente']").text(email)
            $xml.find("[name='loja']").text(loja)
            $xml.find("[name='st_projeto']").text(status)
            $xml.find("[name='hr_previstas']").text(horasPrev)
            $xml.find("[name='hr_realizadas']").text(horasRealiz)
            $xml.find("[name='codMatricula']").text(matricula)
            
            console.log("XML" + $xml)
            console.log($xml[0])
            console.log(WCMAPI.getServerURL() + '/webdesk/ECMCardService?wsdl')

            WCMAPI.Create({
                url: '/webdesk/ECMCardService?wsdl',
                contentType: "text/xml",
                dataType: "xml",
                data: $xml[0],
                success: function(data){
                    console.log("CHAMOU O SERVIÇO COM SUCESSO")
                }
            });
            
        }
    
    },


    // Modal editar projetos
    modalEditar: function(){
        var myModalEditar = FLUIGC.modal({
            title: 'Editar Projeto',
            content: '<div class="divModalEditar" id="divModalEditar">'+
                    '<div class="panel panel-info">'+
                        '<div class="panel-body">'+
                            '<div class="row">'+
                                '<div class="col-md-4">'+
                                '<label for="cod_client">C&oacute;digo do Cliente: </label>'+
                                '<input type="text" id="cod_client_editar" name="cod_client_editar" class="form-control" readonly/>'+
                                '<input type="hidden" id="idDocModal" name="idDocModal">'+
                                '</div>'+
                                '<div class="col-md-4">'+
                                '<label for="loja">Loja: </label>'+
                                '<input type="text" id="loja_editar" name="loja_editar" class="form-control" readonly/>'+
                                '</div>'+
                                '<div class="col-md-4">'+
                                '<label for="nm_client">Nome do Cliente: </label>'+
                                '<input type="text" id="nm_client_editar" name="nm_client_editar" class="form-control" readonly/>'+
                                '</div>'+
                            '</div>'+
                            '<div class="row">'+
                                '<div class="col-md-4">'+
                                '<label for="projeto">C&oacute;digo do Projeto: </label>'+
                                '<input type="text" id="projeto_editar" name="projeto_editar" class="form-control" readonly/>'+
                                '</div>'+
                                '<div class="col-md-4">'+
                                '<label for="nm_projeto">Nome do Projeto: </label>'+
                                '<input type="text" id="nm_projeto_editar" name="nm_projeto_editar" class="form-control"readonly/>'+
                                '</div>'+
                                '<div class="col-md-4">'+
                                '<label for="codMatricula">Matr&iacute;cula: </label>'+
                                '<input type="text" id="codMatricula_editar" name="codMatricula_editar" class="form-control" readonly/>'+
                                '</div>'+
                            '</div>'+
                            '<div class="row">'+
                                '<div class="col-sm-4">'+
                                '<label for="nm_responsavel">Respons&aacute;vel: </label>'+
                                '<input type="text" id="nm_responsavel_editar" name="nm_responsavel_editar" class="form-control" readonly/>'+
                                '</div>'+
                                '<div class="col-sm-4">'+
                                '<label for="emailCliente">E-Mail do Cliente: </label>'+
                                '<input type="email" id="emailCliente_editar" name="emailCliente_editar" class="form-control" readonly/>'+
                                '</div>'+
                                '<div class="col-md-4">'+
                                '<label class="tProjeto">Tipo de projeto: </label>'+
                                '<input type="text" name="tipo_projeto" id="tipo_projeto" class="form-control" readonly/>'+
                                '</div>'+   
                            '</div>'+
                            '<div class="row">'+
                                '<div class="col-md-4">'+
                                '<label for="horasPrev">Horas Previstas: </label>'+
                                '<input type="number" id="horasPrev_editar" name="horasPrev_editar" class="form-control">'+
                                '</div>'+
                                '<div class="col-md-4">'+
                                '<label for="horasPrev">Horas Realizadas: </label>'+
                                '<input type="number" id="horasRealiz_editar" name="horasRealiz_editar" class="form-control">'+
                                '</div>'+
                                '<div class="col-md-4">'+
                                '<label for="status">Status: </label>'+                               
                                '<select id="st_projeto_editar" class="form-control">'+
                                '<option value="Ativo">Ativo</option>'+
                                '<option value="Suspenso">Suspenso</option>'+
                                '<option value="Encerrado">Encerrado</option>'+
                                '</select>'+
                                '</div>'+                              
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</div>',
            id: 'fluig-modaEditar',
            size: 'large',
            actions: [{
                'label': 'Projeto Editado',
                'bind': 'data-editarProjeto',
                'autoClose': true
            },{
                'label': 'Fechar',
                'autoClose': true
            }]
        }, function(err, data) {
            if(err) {
                // do error handling
            } else {

                $(document).on('click', '.icone', function(e) {
                    e.preventDefault;
                    tdobj = $(this).closest('tr').find('td');          
                
                    var dataset = DatasetFactory.getDataset("ds_formDemoTesteLab", null, null, null);
                    var idDocTabela = $($(e.currentTarget).parent().parent().parent().find("td")[0]).find('input[class^="id_documento"]').val();
                  
                    for(var i=0; i<dataset.values.length; i++){

                        var campo1 = dataset.values[i]['documentid'];

                        if(campo1 == idDocTabela){

                            var campo2 = dataset.values[i]['cod_client'];
                            var campo3 = dataset.values[i]['projeto'];
                            var campo4 = dataset.values[i]['nm_projeto'];
                            var campo5 = dataset.values[i]['nm_responsavel'];
                            var campo6 = dataset.values[i]['emailCliente'];
                            var campo7 = dataset.values[i]['st_projeto'];
                            var campo8 = dataset.values[i]['loja'];
                            var campo9 = dataset.values[i]['tipoProjeto'];
                            var campo10 = dataset.values[i]['codMatricula'];
                            var campo11 = dataset.values[i]['hr_previstas'];
                            var campo12 = dataset.values[i]['hr_realizadas'];
                            var campo13 = dataset.values[i]['nm_client'];
                           
                        }    

                    }
                                         
                        $("#cod_client_editar").val(campo2)
                        $("#projeto_editar").val(campo3)
                        $("#nm_projeto_editar").val(campo4)
                        $("#nm_responsavel_editar").val(campo5)
                        $("#emailCliente_editar").val(campo6)
                        $("#st_projeto_editar").val(campo7)
                        $("#loja_editar").val(campo8)
                        $("#codMatricula_editar").val(campo10)
                        $("#horasPrev_editar").val(campo11)
                        $("#horasRealiz_editar").val(campo12)
                        $("#nm_client_editar").val(campo12)
                        $("#tipo_projeto").val(campo9)
                        $("#nm_client_editar").val(campo13)
                        $("#idDocModal").val(campo1)

                        $("button[data-editarProjeto]").on("click", function(){

                            //Campos do Modal editar
                            // var obj1 = $("#horasPrev_editar").val();
                            // var obj2 = $("#horasRealiz_editar").val();
                            // var obj3 = $("#st_projeto_editar").val();
                            
                            var idForm = $("#idDocModal").val();
                            idForm = parseInt(idForm)

                            console.log('ID do Documento    -  ' + idForm)

                            //Propriedade Nome: Formulario de cadastro e valor do Modal Editar
                            var tok = [{ "field": "hr_previstas", "value": $("#horasPrev_editar").val()},
                                       { "field": "hr_realizadas", "value": $("#horasRealiz_editar").val()},
                                       { "field": "st_projeto", "value": $("#st_projeto_editar").val()}];

                            var c1 = DatasetFactory.createConstraint('cardId',idForm, idForm, ConstraintType.MUST);
                            var c2 = DatasetFactory.createConstraint('cardData', JSON.stringify(tok), JSON.stringify(tok), ConstraintType.MUST);
                            var dsUpdateProjetos = DatasetFactory.getDataset('ds_editarForm', null, new Array(c1, c2), null);
        
                            FLUIGC.toast({
                                title: "Sucesso",
                                message: 'Ajuste realizado com sucesso.',
                                type: 'success',
                                timeout: 10000
                            });
                        })
              
                });

                
            }
        });        
    },


    // Modal Documentos
    tabModal: function (){

        var myModalDoc = FLUIGC.modal({
            title: 'MIT',
            content: '<div class="tabModal" id="tabModal">'+
                     '<input type="hidden" id="filtrar_tabela" name="filtrar_tabela"/>'+
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
                $(document).on('click', '.tabDoc', function(e) {
                    e.preventDefault;
                    tdobj = $(this).closest('tr').find('td'); 

                    var htmlTab2 = "";
                    var ds2 = DatasetFactory.getDataset('ds_formDemoTesteLab', null, null, null);
                    var idTabDoc = $($(e.currentTarget).parent().parent().find("td")[2]).find('input[class^="btnProjeto"]').val();

                    for (var i = 0; i < ds2.values.length; i++){

                        var resp = ds2.values[i]['nm_projeto'];
                        
                        if(resp == idTabDoc){
                            
                            var id = ds2.values[i]['documentid'];
                            var mit = ds2.values[i]['controlMIT'];

                            htmlTab2 += "<tr>"+
                            '<td><input type="checkbox" class="cbxSelect" name="cbxSelect" value="' + id + '"></td>' +
                            "<td><button type='button' class='btn-link' data-visualizarDoc>" + mit +"</td>" +
                            "<td>" + resp +"</td>"+
                            "</tr>";
                            
                        }

                    }

                    document.getElementById("tbodyModal").innerHTML = htmlTab2;
                });

                $("button[data-excluir]").on("click", function(){

                    var classCkbSelect = document.getElementsByClassName('cbxSelect');
                    
                    for (var i = 0; i < classCkbSelect.length; i++) {

                        if (classCkbSelect[i].checked == true) {
                            
                            var c1 = DatasetFactory.createConstraint('documentid', classCkbSelect[i].value, classCkbSelect[i].value, ConstraintType.MUST);
                            var datasetds_formDemoTesteLab = DatasetFactory.getDataset('ds_formDemoTesteLab', null, new Array(c1), null);

                            if (datasetds_formDemoTesteLab.values[0].IdDocumSign == "0") {
    
                                var c1 = DatasetFactory.createConstraint('cardId', classCkbSelect[i].value, classCkbSelect[i].value, ConstraintType.MUST);
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
        
        var myModalGraf = FLUIGC.modal({
            title: 'Gráficos',
            content: '<div id="MY_SELECTOR">'+
                     '<canvas id="set_an_id_for_my_chart"  width="700" height="200"></canvas>'+
                     '<div id="divProgresso"'+
                     '<div class="col-md-4">'+
                     '<label for="hPrevistas">Horas Previstas;</label>'+
                     '<input type="number" id="horasPrevistas" class="form-control"/>'+
                     '</div>'+
                     '<div class="col-md-4">'+
                     '<label for="hPrevistas">Horas Realizadas:</label>'+
                     '<input type="number" id="horasRalizadas" class="form-control"/>'+
                     '</div>'+
                     '<div class="col-md-4">'+
                     '<label for="hPrevistas">Progresso:</label>'+
                     '<input type="text" id="progresso" class="form-control"/>'+
                     '</div>'+
                     '</div>'+
                     '</div>',
            id: 'fluig-modalGraficos',
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

    
    
    fnRefresh: function (){

        var myLoading1 = FLUIGC.loading('#tnProjClient');
        myLoading1.show();
        myLoading1.hide();
    }


});

