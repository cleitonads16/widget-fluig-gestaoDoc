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
        // $("#divBtnExcluir").hide()
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
                    $("#estagioStatus2").hide()
                    break;
                case "DEMONSTRACAO":
                    $("#estagioStatus2").show().prop('disabled', false)
                    $("#estagioStatus1").prop('disabled', true).val(limparOpcao).hide()
                    break;
                case "ELABORACAODEPROPOSTA":
                    $("#estagioStatus2").show().prop('disabled', false)
                    $("#estagioStatus1").prop('disabled', true).val(limparOpcao).hide()
                    break;
                case "NEGOCIACAO":
                    $("#estagioStatus2").show().val($('option:contains("FORECAST")').val()).prop('disabled', true)
                    $("#estagioStatus1").prop('disabled', true).val(limparOpcao).hide()
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
            'execute': ['click_executeAction']
        },
        global: {}
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
                '<td><input type="checkbox" class="cbxSelect" value="'+ id +'" data-checkboxTb><input type="hidden" class="id_documento" value="' + id + '"/></td>'+
                "<td>" + codigo + "</td>"+
                "<td>" + empresa +"</td>" +
                "<td>" + esn +"</td>" +
                '<td>' + status +'</td>' +
                '<td><button type="button" class="btn-link"><i class="fluigicon fluigicon-community-edit icon-md icone" data-editarProj></i></button></td>' +
                "</tr>";
            
        }

        document.getElementById("tbodyTabela1").innerHTML = html
    }

});
