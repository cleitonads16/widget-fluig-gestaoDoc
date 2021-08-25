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

        // ocultos e desabilitados
        $("#divFormulario").hide()
        $("#estagioStatus2").hide()
        // $("#btExcluir").hide()
        $("#outros").prop('disabled', true);
        $("#estagioStatus1").prop('disabled', true)
        $("#mensalidade").prop('disabled', true)

        // mascaras
        let moeda = $(".dinheiro").val()
        moeda.toLocaleString("pt-BR",{style: 'currency', currency: 'BRL' });
        // $(".dinheiro").mask('000.000.000.000.000,00' , { reverse : true});        
        
        // adicionar cadastro
        $("#btAdd").on("click", function(){
            $("#divFormulario").show()
            $("#divTabela").hide()
            $("#divBotaoAdd").hide()
        })

        // voltar a tabela
        $("#btSair").on("click", function(){
            $("#divFormulario").hide()
            $("#divTabela").show()
            $("#divBotaoAdd").show()
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
            let limparOpcao = "SELECIONE"
            let valorEstagio = this.value

            switch(valorEstagio){
                case "PRIMEIRAVISITA":
                    $("#estagioStatus1").prop('disabled', false).show()
                    break;
                case "NEGOCIACAO":
                    $("#estagioStatus1").show().val($('option:contains("FORECAST")').val()).prop('disabled', true)
                    break;
                case "FECHADA":
                    $("#estagioStatus1").prop('disabled', true).val(limparOpcao)
                    $("#estagioStatus2").prop('disabled', true).val(limparOpcao)
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
        
        // datas
        var mySimpleCalendar = FLUIGC.calendar('#dataPrevisao');

    },
  
    //BIND de eventos
    bindings: {
        local: {
            'enviar'     : ['click_validarCampos'],
            'excluir'    : ['click_excluirProjetos'],
            // 'checkboxTb' : ['click_botaoExcluir']
        }
        },
        global: {
            
    },
 
    // tabela de dados tela principal
    tabelaDeDados: function() {
        let ds = DatasetFactory.getDataset('formGestaoProspects', null, null, null);
        let html = "";

        for (let i = 0; i < ds.values.length; i++){
            
            let id = ds.values[i]['documentid'];
            let codigo = ds.values[i]['codProspct'];
            let empresa = ds.values[i]['empresa'];
            let esn = ds.values[i]['esn'];
            let status = ds.values[i]['status'];
           
            html += "<tr class='tr_class'>"+
                '<td><input type="checkbox" name="checkExcuir" class="cbxSelect" value="'+ id +'" data-checkboxTb/><input type="hidden" class="id_documento" value="' + id + '"/></td>'+
                "<td>" + codigo + "</td>"+
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
        }else if($("#codigo").val() == ""){
            $("#codigo").css({"border-color" : "#F00", "padding": "2px"})
            msgValidar()
        }else if($("#cnpj").val() == ""){
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
        }else if($("#esn").val() == "SELECIONE"){
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
        }else if($("#estagio").val() != "SELECIONE" && $("#estagioStatus1").val() == "SELECIONE"){
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
        }else{
            bordas()
            this.inserirDados()
        }
    },

    inserirDados: function(){
        console.log("INSERIU DADOS")
        var _xml = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.dm.ecm.technology.totvs.com/">'+
        '<soapenv:Header></soapenv:Header>'+
        '<soapenv:Body>'+
        '<ws:create>'+
            '<companyId>1</companyId>'+
            // '<username>admin</username>' +
            // '<password>!Senha@2020!</password>' +
            '<username>academy.aluno</username>'+
            '<password>academy.aluno</password>'+
            '<card>'+         
                '<item>'+
                    '<attachs></attachs>'+            
                    '<cardData>'+
                    '<field>unidade</field>'+
                    '<value>' + $("#unidade").val() + '</value>'+
                    '</cardData>'+
                    '<cardData>'+
                    '<field>codProspct</field>'+
                    '<value>' + $("#codigo").val() + '</value>'+
                    '</cardData>'+
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
                    '<field>solucoes</field>'+
                    '<value>' + $("#outros").val() + '</value>'+
                    '</cardData>'+
                    '<cardData>'+
                    '<field>estagio</field>'+
                    '<value>' + $("#estagioStatus1").val() + '</value>'+
                    '</cardData>'+
                    '<cardData>'+
                    '<field>status</field>'+
                    '<value>' + $("#estagioStatus2").val() + '</value>'+
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
                    '<field>obs</field>'+
                    '<value>' + $("#observacoes").val() + '</value>'+
                    '</cardData>'+
                    '<colleagueId>' + WCMAPI.userCode + '</colleagueId>'+ 
                    // '<colleagueId>cleitonads</colleagueId>'+
                    '<docapprovers></docapprovers>'+                                         
                    '<docsecurity></docsecurity>'+                        
                    '<expires>false</expires>'+            
                    '<parentDocumentId>7</parentDocumentId>'+
                    // '<parentDocumentId>204900</parentDocumentId>'+
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
                // if(mitDocum != "" && i == 0){
                //     FLUIGC.toast({
                //         title: "Sucesso",
                //         message: 'Projeto cadastrado com sucesso. Relação das MITs de acordo com o tamanho do projeto selecionado.',
                //         type: 'success',
                //         timeout: 10000
                //     });
                // }
            },
            error: function (error) {
                // if(mitDocum != "" && i == 0){
                //     FLUIGC.toast({
                //         title: "Erro ao adicionar a documentação",
                //         message: 'Verificar o problema na integração do ECMCardService.',
                //         type: 'danger',
                //         timeout: 50000
                //     });
                //     console.log("Resultado com erro da Aplicação = " + error);
                // }
               
            }
        });

    },

    // excluir dados
    excluirProjetos: function(){
        
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
  
    }

});
