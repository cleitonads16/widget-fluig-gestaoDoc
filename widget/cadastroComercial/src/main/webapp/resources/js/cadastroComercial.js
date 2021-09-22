var MyWidget = SuperWidget.extend({
    //variáveis da widget
    variavelNumerica: null,
    variavelCaracter: null,

    //método iniciado quando a widget é carregada
    init: function() {

        this.tabelaDeDados()
    	let data = $.datepicker.formatDate('dd/mm/yy', new Date());
        $('#nomeUsuario_'+this.instanceId).val(WCMAPI.getUser());
        $('#data_'+this.instanceId).val(data);
        // datas
        var mySimpleCalendar = FLUIGC.calendar('#dataPrevisao');

        // ocultos e desabilitados
        $("#divFormulario").hide()
        $("#btEditar").hide()
        $("#h3Editar").hide()
        $("#RESERVA").hide()
        $("#PIPELINE").hide()
        $("#FORECAST").hide()
        $("#FECHADA").hide()
        $("#outros").prop('disabled', true);
        $("#estagioStatus1").prop('disabled', true)
        $("#mensalidade").prop('disabled', true)

        // mascaras
        let moeda = $(".dinheiro").val()
        moeda.toLocaleString("pt-BR",{style: 'currency', currency: 'BRL' });

        // adicionar cadastro
        $("#btAdd").on("click", function(){
            $("#divFormulario").show()
            $("#btEnviar").show()
            $("#h3Inserir").show()
            $("#h3Editar").hide()
            $("#btEditar").hide()
            $("#divTabela").hide()
            $("#divBotaoAdd").hide()
        })

        // editar
        $(".icone").on("click", function(){
            $("#divFormulario").show()
            $("#btEditar").show()
            $("#h3Editar").show()
            $("#h3Inserir").hide()
            $("#btEnviar").hide()
            $("#divTabela").hide()
            $("#divBotaoAdd").hide()
        })

        // voltar a tabela
        $("#btSair").on("click", function(){
            $("#divFormulario").hide()
            $("#divTabela").show()
            $("#divBotaoAdd").show()
            clearValue()
            window.location.reload()
        })

        // habilitar campos
        $("#solucoes").change(function(){
            let limpar = ""
            if(this.value == "OUTROS"){
                $("#outros").prop('disabled', false)
            }else{
                $("#outros").prop('disabled', true).val(limpar)
            }
        })

        $("#estagio").change(function(){
            let valorEstagio = this.value

            switch(valorEstagio){
                case "SELECIONE":
                    $("#estagioStatus1").prop('disabled', true).val("SELECIONE")
                    break;
                case "PRIMEIRAVISITA":
                    $("#estagioStatus1").prop('disabled', false).val("SELECIONE")
                    $("#RESERVA").show()
                    $("#PIPELINE").show()
                    $("#FORECAST").hide()
                    $("#FECHADA").hide()
                    break;
                case "DEMONSTRACAO":
                    $("#estagioStatus1").prop('disabled', false).val("SELECIONE")
                    $("#PIPELINE").show()
                    $("#FORECAST").show()
                    $("#RESERVA").hide()
                    break;
                case "ELABORACAODEPROPOSTA":
                    $("#estagioStatus1").prop('disabled', false).val("SELECIONE")
                    $("#PIPELINE").show()
                    $("#FORECAST").show()
                    $("#RESERVA").hide()
                    break;
                case "NEGOCIACAO":
                    $("#estagioStatus1").val($('option:contains("FORECAST")').val()).prop('disabled', true)
                    break;
                case "FECHADA":
                    $("#estagioStatus1").val($('option:contains("FECHADA")').val()).prop('disabled', true)
                    break;
                    default:
            }
        })

        $("#saas").change(function(){
            let limparMens = ""
            if(this.value == "SIM"){
                $("#mensalidade").prop('disabled', false)
            }else{
                $("#mensalidade").prop('disabled', true).val(limparMens)
            }
        })
        
        //Filtar tabela
        let $rows = $('#tbodyTabela1 tr');
        $('#campFiltro').keyup(function() {
            let val = $.trim($(this).val()).replace(/ +/g, ' ').toLowerCase();
            
            $rows.show().filter(function() {
                let text = $(this).text().replace(/\s+/g, ' ').toLowerCase();
                return !~text.indexOf(val);
            }).hide();
        })

        // selaciona todos o checkbox
        $("#chk_tabela1").on("click", function(){
            let sel = document.getElementsByClassName('cbxSelect');
            if (document.getElementById('chk_tabela1').checked == true) {
                for (var i = 0; i < sel.length; i++) {
                    sel[i].checked = true;
                }
            }
            else {
                for (let i = 0; i < sel.length; i++) {
                    sel[i].checked = false;
                }
            }
        })

        // checbox botão excluir
        $('input[type="checkbox"]').on('click touchstart', function(){
            let quantCheck = $('input[type="checkbox"]:checked').length;
            if(quantCheck != 0) {
                $('#btExcluir').css('display', 'inline')
            } 
            else {
                $('#btExcluir').css('display', 'none')
            }
        })

        $(document).on('click', '.icone', function(e) {
            e.preventDefault;
            tdobj = $(this).closest('tr').find('td');          
            var dataset = DatasetFactory.getDataset("formGestaoProspects", null, null, null);
            var idDocTabela = $($(e.currentTarget).parent().parent().parent().find("td")[0]).find('input[class^="id_documento"]').val();
          
            for(var i=0; i<dataset.values.length; i++){
        
                var campo1 = dataset.values[i]['documentid'];
        
                if(campo1 == idDocTabela){
        
                    var campo2 = dataset.values[i]['unidade'];
                    var campo3 = dataset.values[i]['codProspct'];
                    var campo4 = dataset.values[i]['cnpj'];
                    var campo5 = dataset.values[i]['empresa'];
                    var campo6 = dataset.values[i]['telProspect'];
                    var campo7 = dataset.values[i]['contatoProspect'];
                    var campo8 = dataset.values[i]['setorProspect'];
                    var campo9 = dataset.values[i]['emailProsprect'];
                    var campo10 = dataset.values[i]['entidade'];
                    var campo11 = dataset.values[i]['origem'];
                    var campo12 = dataset.values[i]['cidade'];
                    var campo13 = dataset.values[i]['segmento'];
                    var campo14 = dataset.values[i]['esn'];
                    var campo15 = dataset.values[i]['workArea'];
                    var campo16 = dataset.values[i]['produto'];
                    var campo17 = dataset.values[i]['modalidade'];
                    var campo18 = dataset.values[i]['solucoes'];
                    var campo19 = dataset.values[i]['estagio'];
                    var campo20 = dataset.values[i]['status'];
                    var campo21 = dataset.values[i]['previVenda'];
                    var campo22 = dataset.values[i]['valorCdu'];
                    var campo23 = dataset.values[i]['saas'];
                    var campo24 = dataset.values[i]['mensalidade'];
                    var campo25 = dataset.values[i]['servico'];
                    var campo26 = dataset.values[i]['obs'];
                    var campo27 = dataset.values[i]['outros'];
                    var campo28 = dataset.values[i]['documentid'];
                    var campo29 = dataset.values[i]['qtdHoras'];
                    var campo30 = dataset.values[i]['valHora'];
                    var campo31 = dataset.values[i]['totalServicos'];
                   
                }    
        
            }
                                 
            $("#unidade").val(campo2)
            // $("#codigo").val(campo3)
            $("#cnpj").val(campo4)
            $("#empresa").val(campo5)
            $("#telefone").val(campo6)
            $("#contato").val(campo7)
            $("#setor").val(campo8)
            $("#email").val(campo9)
            $("#entidade").val(campo10)
            $("#origem").val(campo11)
            $("#cidade").val(campo12)
            $("#segmento").val(campo13)
            $("#esn").val(campo14)
            $("#workArea").val(campo15)  
            $("#produto").val(campo16)  
            $("#modalidade").val(campo17)  
            $("#solucoes").val(campo18)  
            $("#estagio").val(campo19)  
            $("#estagioStatus1").val(campo20)  
            $("#dataPrevisao").val(campo21)  
            $("#cduAdesao").val(campo22)  
            $("#saas").val(campo23)  
            $("#mensalidade").val(campo24)  
            $("#servico").val(campo25)  
            $("#observacoes").val(campo26)  
            $("#outros").val(campo27)  
            $("#id_editar").val(campo28) 
            $("#quantHoras").val(campo29)  
            $("#valorHora").val(campo30)  
            $("#totalServico").val(campo31)   
                          
        })

        // Edita os campos do Formuloario
        $("button[data-editar]").on("click", function(){

            let dsEditar = DatasetFactory.getDataset("formGestaoProspects", null, null, null);
            let idEditar = $("#id_editar").val();

            for(let i=0; i<dsEditar.values.length; i++){
                let idFormEditar = dsEditar.values[i]['documentid'];
                if(idFormEditar == idEditar){
                    
                    let _xml3 = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.dm.ecm.technology.totvs.com/">'+
                                '<soapenv:Header/>'+
                                '<soapenv:Body>'+
                                '<ws:updateCardData>'+
                                    '<companyId>1</companyId>'+
                                    '<username>admin</username>' +
                                    '<password>!Senha@2020!</password>' +
                                    // '<username>academy.aluno</username>'+
                                    // '<password>academy.aluno</password>'+
                                    '<cardId>'+ idFormEditar +'</cardId>'+
                                    '<cardData>'+
                                        '<item>'+                                     
                                            '<field>unidade</field>'+                                       
                                            '<value>' + $("#unidade").val() + '</value>'+
                                        '</item>'+
                                        // '<item>'+            
                                        //     '<field>codProspct</field>'+             
                                        //     '<value>' + $("#codigo").val() + '</value>'+
                                        // '</item>'+
                                        '<item>'+            
                                            '<field>cnpj</field>'+             
                                            '<value>' + $("#cnpj").val() + '</value>'+
                                        '</item>'+
                                        '<item>'+            
                                            '<field>empresa</field>'+             
                                            '<value>' + $("#empresa").val() + '</value>'+
                                        '</item>'+
                                        '<item>'+            
                                            '<field>telProspect</field>'+             
                                            '<value>' + $("#telefone").val() + '</value>'+
                                        '</item>'+
                                        '<item>'+            
                                            '<field>contatoProspect</field>'+             
                                            '<value>' + $("#contato").val() + '</value>'+
                                        '</item>'+
                                        '<item>'+            
                                            '<field>setorProspect</field>'+             
                                            '<value>' + $("#setor").val() + '</value>'+
                                        '</item>'+
                                        '<item>'+            
                                            '<field>emailProsprect</field>'+             
                                            '<value>' + $("#email").val() + '</value>'+
                                        '</item>'+
                                        '<item>'+            
                                            '<field>entidade</field>'+             
                                            '<value>' + $("#entidade").val() + '</value>'+
                                        '</item>'+
                                        '<item>'+            
                                            '<field>origem</field>'+             
                                            '<value>' + $("#origem").val() + '</value>'+
                                        '</item>'+
                                        '<item>'+            
                                            '<field>cidade</field>'+             
                                            '<value>' + $("#cidade").val() + '</value>'+
                                        '</item>'+
                                        '<item>'+            
                                            '<field>segmento</field>'+             
                                            '<value>' + $("#segmento").val() + '</value>'+
                                        '</item>'+
                                        '<item>'+            
                                            '<field>esn</field>'+             
                                            '<value>' + $("#esn").val() + '</value>'+
                                        '</item>'+
                                        '<item>'+            
                                            '<field>workArea</field>'+             
                                            '<value>' + $("#workArea").val() + '</value>'+
                                        '</item>'+
                                        '<item>'+            
                                            '<field>produto</field>'+             
                                            '<value>' + $("#produto").val() + '</value>'+
                                        '</item>'+
                                        '<item>'+            
                                            '<field>modalidade</field>'+             
                                            '<value>' + $("#modalidade").val() + '</value>'+
                                        '</item>'+
                                        '<item>'+            
                                            '<field>solucoes</field>'+             
                                            '<value>' + $("#solucoes").val() + '</value>'+
                                        '</item>'+
                                        '<item>'+            
                                            '<field>outros</field>'+             
                                            '<value>' + $("#outros").val() + '</value>'+
                                        '</item>'+
                                        '<item>'+            
                                            '<field>estagio</field>'+             
                                            '<value>' + $("#estagio").val() + '</value>'+
                                        '</item>'+
                                        '<item>'+            
                                            '<field>status</field>'+             
                                            '<value>' + $("#estagioStatus1").val() + '</value>'+
                                        '</item>'+
                                        '<item>'+            
                                            '<field>previVenda</field>'+             
                                            '<value>' + $("#dataPrevisao").val() + '</value>'+
                                        '</item>'+
                                        '<item>'+            
                                            '<field>valorCdu</field>'+             
                                            '<value>' + $("#cduAdesao").val() + '</value>'+
                                        '</item>'+
                                        '<item>'+            
                                            '<field>saas</field>'+             
                                            '<value>' + $("#saas").val() + '</value>'+
                                        '</item>'+
                                        '<item>'+            
                                            '<field>mensalidade</field>'+             
                                            '<value>' + $("#mensalidade").val() + '</value>'+
                                        '</item>'+
                                        '<item>'+            
                                            '<field>servico</field>'+             
                                            '<value>' + $("#servico").val() + '</value>'+
                                        '</item>'+
                                        '<item>'+            
                                            '<field>qtdHoras</field>'+             
                                            '<value>' + $("#quantHoras").val() + '</value>'+
                                        '</item>'+
                                        '<item>'+            
                                            '<field>valHora</field>'+             
                                            '<value>' + $("#valorHora").val() + '</value>'+
                                        '</item>'+
                                        '<item>'+            
                                            '<field>totalServicos</field>'+             
                                            '<value>' + $("#totalServico").val() + '</value>'+
                                        '</item>'+
                                        '<item>'+            
                                            '<field>obs</field>'+             
                                            '<value>' + $("#observacoes").val() + '</value>'+
                                        '</item>'+
                                    '</cardData>'+
                                '</ws:updateCardData>'+
                                '</soapenv:Body>'+
                            '</soapenv:Envelope>';

                    let urlWsEditar = WCMAPI.getServerURL() + '/webdesk/ECMCardService?wsdl'

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

                            $("#divFormulario").hide()
                            $("#divTabela").show()
                            
                        },
                        error: function (error) {
                            FLUIGC.toast({
                                title: "Erro",
                                message: error + ' ao tentar editar o cadastro, entre em contato com suporte Fluig',
                                type: 'danger',
                            });
                        }
                    }); 
                }
            }

            setTimeout(function(){ window.location.reload(); }, 1000);
            
        })
    },
  
    //BIND de eventos
    bindings: {
        local: {
            'enviar'  : ['click_validarCampos'],
            'excluir' : ['click_excluirProjetos'],
            'esn'     : ['keypress_autoCompletar']
            // 'sair'    : ['click_atualizarDiv']
            }
        },
        global: {
            
    },

    // atualizarDiv: function(){
    //     console.log("ATUALIZA DIV")
    //     var myLoading1 = FLUIGC.loading('#divTabela');
    //     // We can show the message of loading
    //     myLoading1.show();
    //     this.tabelaDeDados()
    //     myLoading1.hide();
    // },

    // tabela de dados tela principal
    tabelaDeDados: function() {
        console.log('TABELA DE DADOS')
        let ds = DatasetFactory.getDataset('formGestaoProspects', null, null, null);
        let html = "";

        for (let i = 0; i < ds.values.length; i++){
            let id = ds.values[i]['documentid'];
            let cnpj = ds.values[i]['cnpj'];
            let empresa = ds.values[i]['empresa'];
            let esn = ds.values[i]['esn'];
            let status = ds.values[i]['status'];
           
            html += "<tr class='tr_class'>"+
                '<td><input type="checkbox" name="checkExcuir" class="cbxSelect" value="'+ id +'" data-checkboxTb/><input type="hidden" class="id_documento" value="' + id + '"/></td>'+
                "<td>" + cnpj + "</td>"+
                "<td>" + empresa +"</td>" +
                "<td>" + esn +"</td>" +
                '<td>' + status +'</td>' +
                '<td><button type="button" class="btn-link"><i class="fluigicon fluigicon-community-edit icon-md icone" data-editarProj></i></button></td>' +
                "</tr>";
            
        }

        document.getElementById("tbodyTabela1").innerHTML = html

    },

    validarCampos: function (){
   
        if($("#unidade").val() == "SELECIONE"){
            $("#unidade").css({"border-color" : "#F00", "padding": "2px"})
            msgValidar()
        }/*else if($("#codigo").val() == ""){
            $("#codigo").css({"border-color" : "#F00", "padding": "2px"})
            msgValidar()
        }*/else if($("#cnpj").val() == ""){
            $("#cnpj").css({"border-color" : "#F00", "padding": "2px"})
            msgValidar()
        }else if($("#empresa").val() == ""){
            $("#empresa").css({"border-color" : "#F00", "padding": "2px"})
            msgValidar()
        }else if($("#telefone").val() == ""){
            $("#telefone").css({"border-color" : "#F00", "padding": "2px"})
            msgValidar()
        }else if($("#contato").val() == ""){
            $("#contato").css({"border-color" : "#F00", "padding": "2px"})
            msgValidar()
        }else if($("#setor").val() == ""){
            $("#setor").css({"border-color" : "#F00", "padding": "2px"})
            msgValidar()
        }else if($("#email").val() == ""){
            $("#email").css({"border-color" : "#F00", "padding": "2px"})
            msgValidar()
        }else if($("#entidade").val() == "SELECIONE"){
            $("#entidade").css({"border-color" : "#F00", "padding": "2px"})
            msgValidar()
        }else if($("#origem").val() == "SELECIONE"){
            $("#origem").css({"border-color" : "#F00", "padding": "2px"})
            msgValidar()
        }else if($("#cidade").val() == "SELECIONE"){
            $("#cidade").css({"border-color" : "#F00", "padding": "2px"})
            msgValidar()
        }else if( $("#segmento").val() == "SELECIONE"){
           $("#segmento").css({"border-color" : "#F00", "padding": "2px"})
            msgValidar() 
        }else if($("#esn").val() == ""){
            $("#esn").css({"border-color" : "#F00", "padding": "2px"})
            msgValidar() 
        }else if($("#workArea").val() == ""){
            $("#workArea").css({"border-color" : "#F00", "padding": "2px"})
            msgValidar() 
        }else if($("#produto").val() == "SELECIONE"){
            $("#produto").css({"border-color" : "#F00", "padding": "2px"})
            msgValidar() 
        }else if($("#modalidade").val() == "SELECIONE"){
            $("#modalidade").css({"border-color" : "#F00", "padding": "2px"})
            msgValidar() 
        }else if($("#solucoes").val() == "SELECIONE"){
           $("#solucoes").css({"border-color" : "#F00", "padding": "2px"})
            msgValidar()  
        }else if($("#solucoes").val() == "OUTROS" && $("#outros").val() == ""){
           $("#outros").css({"border-color" : "#F00", "padding": "2px"})
            msgValidar()  
        }else if($("#estagio").val() == "SELECIONE"){
           $("#estagio").css({"border-color" : "#F00", "padding": "2px"})
            msgValidar()  
        }else if(($("#estagio").val() != "SELECIONE" || $("#estagio").val() != "FECHADA") && $("#estagioStatus1").val() == "SELECIONE"){
            $("#estagioStatus1").css({"border-color" : "#F00", "padding": "2px"})
            msgValidar()  
        }else if($("#dataPrevisao").val() == ""){
            $("#dataPrevisao").css({"border-color" : "#F00", "padding": "2px"})
            msgValidar() 
        }else if($("#cduAdesao").val() == ""){
            $("#cduAdesao").css({"border-color" : "#F00", "padding": "2px"})
            msgValidar()
        }else if($("#saas").val() == "SELECIONE"){
            $("#saas").css({"border-color" : "#F00", "padding": "2px"})
            msgValidar()
        }else if($("#saas").val() == "SIM" && $("#mensalidade").val() == ""){
            $("#mensalidade").css({"border-color" : "#F00", "padding": "2px"})
            msgValidar()
        }else if($("#servico").val() == ""){
           $("#servico").css({"border-color" : "#F00", "padding": "2px"})
            msgValidar() 
        }else if($("#quantHoras").val() == ""){
            $("#quantHoras").css({"border-color" : "#F00", "padding": "2px"})
             msgValidar() 
         }else if($("#valorHora").val() == ""){
            $("#valorHora").css({"border-color" : "#F00", "padding": "2px"})
             msgValidar() 
         }else if($("#totalServico").val() == ""){
            $("#totalServico").css({"border-color" : "#F00", "padding": "2px"})
             msgValidar() 
         }else{
            bordas()
            this.inserirDados()
        }
    },

    inserirDados: function(){
        
        let _xml = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.dm.ecm.technology.totvs.com/">'+
        '<soapenv:Header></soapenv:Header>'+
        '<soapenv:Body>'+
        '<ws:create>'+
            '<companyId>1</companyId>'+
            '<username>admin</username>' +
            '<password>!Senha@2020!</password>' +
            // '<username>academy.aluno</username>'+
            // '<password>academy.aluno</password>'+
            '<card>'+         
                '<item>'+
                    '<attachs></attachs>'+            
                    '<cardData>'+
                    '<field>unidade</field>'+
                    '<value>' + $("#unidade").val() + '</value>'+
                    '</cardData>'+
                    // '<cardData>'+
                    // '<field>codProspct</field>'+
                    // '<value>' + $("#codigo").val() + '</value>'+
                    // '</cardData>'+
                    '<cardData>'+
                    '<field>cnpj</field>'+
                    '<value>' + $("#cnpj").val() + '</value>'+
                    '</cardData>'+
                    '<cardData>'+
                    '<field>empresa</field>'+
                    '<value>' + $("#empresa").val() + '</value>'+
                    '</cardData>'+
                    '<cardData>'+
                    '<field>telProspect</field>'+
                    '<value>'+ $("#telefone").val() +'</value>'+
                    '</cardData>'+
                    '<cardData>'+
                    '<field>contatoProspect</field>'+
                    '<value>' + $("#contato").val() + '</value>'+
                    '</cardData>'+
                    '<cardData>'+
                    '<field>setorProspect</field>'+
                    '<value>' + $("#setor").val() + '</value>'+
                    '</cardData>'+
                    '<cardData>'+
                    '<field>emailProsprect</field>'+
                    '<value>'+ $("#email").val() +'</value>'+
                    '</cardData>'+
                    '<cardData>'+
                    '<field>entidade</field>'+
                    '<value>' + $("#entidade").val() + '</value>'+
                    '</cardData>'+
                    '<cardData>'+
                    '<field>origem</field>'+
                    '<value>'+ $("#origem").val() +'</value>'+
                    '</cardData>'+
                    '<cardData>'+
                    '<field>cidade</field>'+
                    '<value>' + $("#cidade").val() + '</value>'+
                    '</cardData>'+ 
                    '<cardData>'+
                    '<field>segmento</field>'+
                    '<value>' + $("#segmento").val() + '</value>'+
                    '</cardData>'+ 
                    '<cardData>'+
                    '<field>esn</field>'+
                    '<value>' + $("#esn").val() + '</value>'+
                    '</cardData>'+
                    '<cardData>'+
                    '<field>workArea</field>'+
                    '<value>'+ $("#workArea").val() +'</value>'+
                    '</cardData>'+
                    '<cardData>'+
                    '<field>produto</field>'+
                    '<value>'+ $("#produto").val() +'</value>'+
                    '</cardData>'+
                    '<cardData>'+
                    '<field>modalidade</field>'+
                    '<value>' + $("#modalidade").val() + '</value>'+
                    '</cardData>'+
                    '<cardData>'+
                    '<field>solucoes</field>'+
                    '<value>' + $("#solucoes").val() + '</value>'+
                    '</cardData>'+
                    '<cardData>'+
                    '<field>outros</field>'+
                    '<value>' + $("#outros").val() + '</value>'+
                    '</cardData>'+
                    '<cardData>'+
                    '<field>estagio</field>'+
                    '<value>' + $("#estagio").val() + '</value>'+
                    '</cardData>'+
                    '<cardData>'+
                    '<field>status</field>'+
                    '<value>' + $("#estagioStatus1").val() + '</value>'+
                    '</cardData>'+ 
                    '<cardData>'+
                    '<field>previVenda</field>'+
                    '<value>' + $("#dataPrevisao").val() + '</value>'+
                    '</cardData>'+ 
                    '<cardData>'+
                    '<field>valorCdu</field>'+
                    '<value>' + $("#cduAdesao").val() + '</value>'+
                    '</cardData>'+ 
                    '<cardData>'+
                    '<field>saas</field>'+
                    '<value>' + $("#saas").val() + '</value>'+
                    '</cardData>'+ 
                    '<cardData>'+
                    '<field>mensalidade</field>'+
                    '<value>' + $("#mensalidade").val() + '</value>'+
                    '</cardData>'+ 
                    '<cardData>'+
                    '<field>servico</field>'+
                    '<value>' + $("#servico").val() + '</value>'+
                    '</cardData>'+ 
                    '<cardData>'+
                    '<field>qtdHoras</field>'+
                    '<value>' + $("#quantHoras").val() + '</value>'+
                    '</cardData>'+
                    '<cardData>'+
                    '<field>valHora</field>'+
                    '<value>' + $("#valorHora").val() + '</value>'+
                    '</cardData>'+
                    '<cardData>'+
                    '<field>totalServicos</field>'+
                    '<value>' + $("#totalServico").val() + '</value>'+
                    '</cardData>'+
                    '<cardData>'+
                    '<field>obs</field>'+
                    '<value>' + $("#observacoes").val() + '</value>'+
                    '</cardData>'+
                    '<colleagueId>' + WCMAPI.userCode + '</colleagueId>'+ 
                    // '<colleagueId>cleitonads</colleagueId>'+
                    '<docapprovers></docapprovers>'+                                         
                    '<docsecurity></docsecurity>'+                        
                    '<expires>false</expires>'+            
                    // '<parentDocumentId>7</parentDocumentId>'+
                    '<parentDocumentId>204900</parentDocumentId>'+
                    '<reldocs></reldocs>'+
                '</item>'+
            '</card>'+
        '</ws:create>'+
        '</soapenv:Body>'+
        '</soapenv:Envelope>';

        let urlWs = WCMAPI.getServerURL() + '/webdesk/ECMCardService?wsdl'

        $.ajax({
            type: "POST",
            dataType: "xml",
            url: urlWs,
            data: _xml,
            crossDomain: true,
            success: function (data) {
              
                FLUIGC.toast({
                    title: "Sucesso",
                    message: 'Prospect cadastrado com sucesso.',
                    type: 'success',
                });
                
                clearValue()
            },
            error: function (error) {
                
                FLUIGC.toast({
                    title: "Erro ao adicionar cadastro",
                    message: 'Verificar o problema na integração do ECMCardService.',
                    type: 'danger',
                });
                console.log("Resultado com erro da Aplicação = " + error);
            }
        });

    },

    // excluir dados
    excluirProjetos: function(){
        
        const check = document.querySelectorAll('td [type="checkbox"]:checked')

        for(let i = 0; i < check.length; i++){
            if(check[i].checked == true){
                
                let urlWsDelet = WCMAPI.getServerURL() + '/webdesk/ECMCardService?wsdl'
                let _xml2 = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.dm.ecm.technology.totvs.com/">'+
                                '<soapenv:Header/>'+
                                '<soapenv:Body>'+
                                '<ws:deleteCard>'+
                                    '<companyId>1</companyId>'+
                                    '<username>admin</username>' +
                                    '<password>!Senha@2020!</password>' +
                                    // '<username>academy.aluno</username>'+
                                    // '<password>academy.aluno</password>'+
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

                        FLUIGC.toast({
                            title: 'Sucesso, ',
                            message: " item excluído",
                            type: 'success',
                        });
                        
                        
                    },
                    error: function (error) {

                        FLUIGC.toast({
                            title: 'Erro',
                            message: error + ' ao tentar excluír o cadastro, entre em contato com suporte Fluig',
                            type: 'danger'
                        });
                    }
                });

            }

            check[i].parentNode.parentNode.remove()
        }
        
        $('#btExcluir').css('display', 'none')
  
    },

    // Autocompletar campo ESN
    autoCompletar: function(){
        
        let c1 = DatasetFactory.createConstraint('colleagueGroupPK.groupId', 'ESN', 'ESN', ConstraintType.MUST)
        let dsGroup = DatasetFactory.getDataset('colleagueGroup', null, new Array(c1), null)
        let arrGroup = [];

        for (let i = 0; i < dsGroup.values.length; i++){
            let group = dsGroup.values[i]['colleagueGroupPK.colleagueId']
            arrGroup.push(group)
        }

        $("#esn" ).autocomplete({
            source: arrGroup
          });
    }   

});
