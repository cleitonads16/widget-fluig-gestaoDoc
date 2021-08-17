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
            'adicionar'  : ['click_validarCampos' /*'click_inserirProjeto','click_getEmpty'*/],
        },
        global: {
            'documento'      : ['click_modal'],
            'visualizarDoc'  : ['click_visualizar'],
            'editarProj'     : ['click_modalEditar'],
            'excluirProjeto' : ['click_excluirProjetos']
            
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
                                        '<th><b>Documentos</b></th>'+
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
                'bind': 'data-excluirProjeto',
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
                var html = "";

                for (var i = 0; i < ds.values.length; i++){
                    
                    var docId = ds.values[i]['documentid'];
                    var codClient = ds.values[i]['cod_client'];
                    var codProjeto = ds.values[i]['projeto'];
                    var nomeProjeto = ds.values[i]['nm_projeto'];
                    var nomeResponsavel = ds.values[i]['nm_responsavel'];
                    var status = ds.values[i]['st_projeto'];
                    var documento = ds.values[i]['controlMIT'];

                    html += "<tr class='tr_class'>"+
                        '<td><input type="checkbox" class="cbxSelect" value="'+ docId +'" data-checkboxTb><input type="hidden" class="id_documento" value="' + docId + '"/></td>'+
                        "<td>" + codClient + "</td>"+
                        "<td>" + codProjeto +"</td>" +
                        "<td class='btnProjeto'><abbr title='Gráfico'><button type='button' class='btn-link tabDoc' data-documento>" + nomeProjeto +"</button></abbr><input type='hidden' class='btnProjeto' value='" + nomeProjeto +"'/></td>" +
                        "<td>" + documento +"</td>" +
                        "<td>" + nomeResponsavel +"</td>" +
                        '<td>' + status +'</td>' +
                        '<td><button type="button" class="btn-link"><i class="fluigicon fluigicon-community-edit icon-md icone" data-editarProj></i></button></td>' +
                        "</tr>";
                    
                }

                document.getElementById("arrayProj").innerHTML = html /*tabMap.join('');*/

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

    // excluir projeto
    excluirProjetos: function(){
        
        try {

            var check = document.querySelectorAll('td [type="checkbox"]:checked')
            var selecionado = document.getElementsByClassName('cbxSelect')

            for(var i = 0; i < check.length; i++){
                console.log("CHECKADO LINHA:  " + i + ' - ' + check[i].value)
                if(check[i].checked == true){
                   
                    var urlWsDelet = WCMAPI.getServerURL() + '/webdesk/ECMCardService?wsdl'
                    var _xml2 = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.dm.ecm.technology.totvs.com/">'+
                                    '<soapenv:Header/>'+
                                    '<soapenv:Body>'+
                                    '<ws:deleteCard>'+
                                        '<companyId>1</companyId>'+
                                        '<username>academy.aluno</username>'+
                                        '<password>academy.aluno</password>'+
                                        '<cardId>'+ check[i].value +'</cardId>'+
                                    '</ws:deleteCard>'+
                                    '</soapenv:Body>'+
                                '</soapenv:Envelope>';
    
                    $.ajax({
                        type: "POST",
                        dataType: "xml",
                        url: urlWsDelet,
                        data: _xml2,
                        crossDomain: true,
                        success: function (data) {
                            if(i == 0){
                                console.log(check.nodeList + " - " + i)
                            }
                           
                            // FLUIGC.toast({
                            //         title: '',
                            //         message: "Os itens selecionados foram excluídos com sucesso",
                            //         type: 'success'
                            //     });
                        },
                        error: function (error) {}
                    });

                }
    
                check[i].parentNode.parentNode.remove()
            }

            console.log("Fora do Ajax   "+selecionado[0].checked)

        } catch (error) {

            FLUIGC.toast({
                title: '',
                message: "Erro ao tentar excluír item, Tipo:  " + error + "   ,entre em contato com o suporte Fluig para resolver o problema",
                type: 'danger'
            });
        }
        
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

    // adicionar projeto
    inserirProjeto: function(){
                    
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
        var tipo = $("#tipoProjeto").val()  

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

            var _xml = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.dm.ecm.technology.totvs.com/">'+
                        '<soapenv:Header></soapenv:Header>'+
                        '<soapenv:Body>'+
                        '<ws:create>'+
                            '<companyId>1</companyId>'+
                            '<username>academy.aluno</username>'+
                            '<password>academy.aluno</password>'+
                            '<card>'+         
                                '<item>'+
                                    '<attachs></attachs>'+            
                                    '<cardData>'+
                                    '<field>cod_client</field>'+
                                    '<value>'+codigo+'</value>'+
                                    '</cardData>'+
                                    '<cardData>'+
                                    '<field>nm_client</field>'+
                                    '<value>'+cliente+'</value>'+
                                    '</cardData>'+
                                    '<cardData>'+
                                    '<field>projeto</field>'+
                                    '<value>'+projeto+'</value>'+
                                    '</cardData>'+
                                    '<cardData>'+
                                    '<field>nm_projeto</field>'+
                                    '<value>'+mn_projeto+'</value>'+
                                    '</cardData>'+
                                    '<cardData>'+
                                    '<field>nm_responsavel</field>'+
                                    '<value>'+responsavel+'</value>'+
                                    '</cardData>'+
                                    '<cardData>'+
                                    '<field>emailCliente</field>'+
                                    '<value>'+email+'</value>'+
                                    '</cardData>'+
                                    '<cardData>'+
                                    '<field>loja</field>'+
                                    '<value>'+loja+'</value>'+
                                    '</cardData>'+
                                    '<cardData>'+
                                    '<field>st_projeto</field>'+
                                    '<value>'+status+'</value>'+
                                    '</cardData>'+
                                    '<cardData>'+
                                    '<field>hr_previstas</field>'+
                                    '<value>'+horasPrev+'</value>'+
                                    '</cardData>'+
                                    '<cardData>'+
                                    '<field>hr_realizadas</field>'+
                                    '<value>'+horasRealiz+'</value>'+
                                    '</cardData>'+
                                    '<cardData>'+
                                    '<field>codMatricula</field>'+
                                    '<value>'+matricula+'</value>'+
                                    '</cardData>'+ 
                                    '<cardData>'+
                                    '<field>tipoProjeto</field>'+
                                    '<value>'+tipo+'</value>'+
                                    '</cardData>'+ 
                                    '<cardData>'+
                                    '<field>controlMIT</field>'+
                                    '<value>'+mitDocum+'</value>'+
                                    '</cardData>'+ 
                                    '<colleagueId>cleitonads</colleagueId>'+
                                    '<docapprovers></docapprovers>'+                                         
                                    '<docsecurity></docsecurity>'+                        
                                    '<expires>false</expires>'+            
                                    '<parentDocumentId>28</parentDocumentId>'+
                                    '<reldocs></reldocs>'+
                                '</item>'+
                            '</card>'+
                        '</ws:create>'+
                        '</soapenv:Body>'+
                    '</soapenv:Envelope>';

            var urlWs = WCMAPI.getServerURL() + '/webdesk/ECMCardService?wsdl'

            $.ajax({
                type: "POST",
                dataType: "xml",
                url: urlWs,
                data: _xml,
                crossDomain: true,
                success: function (data) {
                    if(mitDocum != "" && i == 0){
                        FLUIGC.toast({
                            title: "Sucesso",
                            message: 'Projeto cadastrado com sucesso. Relação das MITs de acordo com o tamanho do projeto selecionado.',
                            type: 'success',
                            timeout: 10000
                        });
                    }
                },
                error: function (error) {
                    if(mitDocum != "" && i == 0){
                        FLUIGC.toast({
                            title: "Erro ao adicionar a documentação",
                            message: 'Verificar o problema na integração do ECMCardService.',
                            type: 'danger',
                            timeout: 50000
                        });
                        console.log("Resultado com erro da Aplicação = " + error);
                    }
                   
                }
            });
            
        }
    
        this.getEmpty()

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
                // 'autoClose': true
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
                            var campo14 = dataset.values[i]['documentid'];
                           
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
                    $("#idDocModal").val(campo14)  
                                  
                });

                // Edita os campos do Formuloario
                $("button[data-editarProjeto]").on("click", function(){
                    
                    var dsEditar = DatasetFactory.getDataset("ds_formDemoTesteLab", null, null, null);
                    var idModal = $("#idDocModal").val();
                    console.log(idModal)
                    
                    for(var i=0; i<dsEditar.values.length; i++){

                        var idFormEditar = dsEditar.values[i]['documentid'];

                        if(idFormEditar == idModal){

                            var editado1 = $("#horasPrev_editar").val()
                            var editado2 = $("#horasRealiz_editar").val()
                            var editado3 =  $("#st_projeto_editar").val()

                            var _xml3 = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.dm.ecm.technology.totvs.com/">'+
                                        '<soapenv:Header/>'+
                                        '<soapenv:Body>'+
                                        '<ws:updateCardData>'+
                                            '<companyId>1</companyId>'+
                                            '<username>academy.aluno</username>'+
                                            '<password>academy.aluno</password>'+
                                            '<cardId>'+ idFormEditar +'</cardId>'+
                                            '<cardData>'+
                                                '<item>'+                                     
                                                    '<field>hr_previstas</field>'+                                       
                                                    '<value>' + editado1 + '</value>'+
                                                '</item>'+
                                                '<item>'+            
                                                    '<field>hr_realizadas</field>'+             
                                                    '<value>' + editado2 + '</value>'+
                                                '</item>'+
                                                '<item>'+            
                                                    '<field>st_projeto</field>'+             
                                                    '<value>' + editado3 + '</value>'+
                                                '</item>'+
                                            '</cardData>'+
                                        '</ws:updateCardData>'+
                                        '</soapenv:Body>'+
                                    '</soapenv:Envelope>';

                            var urlWsEditar = WCMAPI.getServerURL() + '/webdesk/ECMCardService?wsdl'

                            $.ajax({
                                type: "POST",
                                dataType: "xml",
                                url: urlWsEditar,
                                data: _xml3,
                                crossDomain: true,
                                success: function (data) {
                                    FLUIGC.toast({
                                        title: "Sucesso",
                                        message: 'Cadastro Editado.',
                                        type: 'success',
                                    });
                                },
                                error: function (error) {
                                    FLUIGC.toast({
                                        title: "Erro",
                                        message: error + ' ao tentar editar o cadastro',
                                        type: 'danger',
                                    });
                                }
                            }); 
                        }
                    }

                })
            }
        });        
    },


    // Modal Documentos
    /*tabModal: function (){

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
        
    },*/

    
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

    // valida os campos
    validarCampos: function(){
        var codCliente = $("#cod_client").val()
        var nmCliente = $("#nm_client").val()
        var codProjeto = $("#projeto").val()
        var mnProjeto = $("#nm_projeto").val()
        var mnResponsavel = $("#nm_responsavel").val()
        var emailCliente = $("#emailCliente").val()
        var statusProjeto = $("#st_projeto").val()
        var numLoja = $("#loja").val()
        var tipoProjeto = $("#tipoProjeto").val()
        var documentoMit = $("#controlMIT").val()
        var codMatricula = $("#codMatricula").val()
        var hrPrevistas = $("#hr_previstas").val()
        var hrRealizadas = $("#hr_realizadas").val()
        var validar = ""

        switch(validar){
            case codCliente:
                FLUIGC.message.alert({
                    message: 'O campo Código do Cliente está vazio, preencha o campo e tente adicionar novamente.',
                    title: 'Alerta de Campo Vazio',
                    label: 'OK'
                });
                break;
            case nmCliente:
                FLUIGC.message.alert({
                    message: 'O campo Nome do Cliente está vazio, preencha o campo e tente adicionar novamente.',
                    title: 'Alerta de Campo Vazio',
                    label: 'OK'
                });
                break;
            case codProjeto:
                FLUIGC.message.alert({
                    message: 'O campo Código do Projeto está vazio, preencha o campo e tente adicionar novamente.',
                    title: 'Alerta de Campo Vazio',
                    label: 'OK'
                });
                break;
            case mnProjeto:
                FLUIGC.message.alert({
                    message: 'O campo Nome do Projeto está vazio, preencha o campo e tente adicionar novamente.',
                    title: 'Alerta de Campo Vazio',
                    label: 'OK'
                });
                break;
            case mnResponsavel:
                FLUIGC.message.alert({
                    message: 'O campo Responsável está vazio, preencha o campo e tente adicionar novamente.',
                    title: 'Alerta de Campo Vazio',
                    label: 'OK'
                });
                break;
            case emailCliente:
                FLUIGC.message.alert({
                    message: 'O campo E-mail do Cliente está vazio, preencha o campo e tente adicionar novamente.',
                    title: 'Alerta de Campo Vazio',
                    label: 'OK'
                });
                break;
            case numLoja:
                FLUIGC.message.alert({
                    message: 'O campo Loja está vazio, preencha o campo e tente adicionar novamente.',
                    title: 'Alerta de Campo Vazio',
                    label: 'OK'
                });
                break;
            case codMatricula:
                FLUIGC.message.alert({
                    message: 'O campo Matrícula está vazio, preencha o campo e tente adicionar novamente.',
                    title: 'Alerta de Campo Vazio',
                    label: 'OK'
                });
                break;
            case hrPrevistas:
                FLUIGC.message.alert({
                    message: 'O campo Horas Previstas está vazio, preencha o campo e tente adicionar novamente.',
                    title: 'Alerta de Campo Vazio',
                    label: 'OK'
                });
                break;
            case hrRealizadas:
                FLUIGC.message.alert({
                    message: 'O campo Horas Realizadas está vazio, preencha o campo e tente adicionar novamente.',
                    title: 'Alerta de Campo Vazio',
                    label: 'OK'
                });
                break;
            default: 
            switch(statusProjeto){
                case"selecione":
                    FLUIGC.message.alert({
                        message: 'Selecione uma opção no campo Status do Projeto e tente adicionar novamente.',
                        title: 'Alerta de Campo não selecionado',
                        label: 'OK'
                    });
                    break;
                default:
                    if(tipoProjeto == "selecione"){
                        FLUIGC.message.alert({
                            message: 'Selecione uma opção no campo Dimencionamento do Projeto e tente adicionar novamente.',
                            title: 'Alerta de Campo não selecionado',
                            label: 'OK'
                        });
                    }
                    if(tipoProjeto == "MIT" && documentoMit == ""){
                        FLUIGC.message.alert({
                            message: 'O campo MIT está vazio, preencha o campo e tente adicionar novamente.',
                            title: 'Alerta de Campo Vazio',
                            label: 'OK'
                        });
                    }       
            }
            
        }

        this.inserirProjeto()
        
    }


});

