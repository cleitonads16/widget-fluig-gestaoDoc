var HelloWorld = SuperWidget.extend({
    myTable: null,
    tableData: null,
    dataInit: null,

    init: function () {
        
        $('#modal-body_' + this.instanceId).hide()

        this.loadTable()
    },

    bindings: {
        local: {
            // 'adicionar': ['click_btnAdicionar'],
            // 'cadastrar-mit': ['click_btnAddMit'],
            // 'adicionar': ['click_AddTableRow'],
            // 'fechar': ['click_btnFechar'],
            // 'excluir': ['click_excluirLinha'],
            // 'checkboxSeleciona': ['click_selecionarTodosChecks']
            'adicionar': ['click_modal']
            
    
            
        }
    },

    loadTable: function() {
        var that = this;
        that.myTable = FLUIGC.datatable('#tb_documento' + "_" + that.instanceId, {
            dataRequest: DatasetFactory.getDataset('ds_tabelaDocumentos', null,null,null).values,
            renderContent: ['cod_projeto', 'nome_projeto', 'cliente', 'responsavel','documento','status','email'],
            header: [
                {'title': 'Código do Projeto'},
                {'title': 'Nome do Projeto'},
                {'title': 'Cliente'},
                {'title': 'Responsável'},
                {'title': 'Documento'},
                {'title': 'Status'},
                {'title': 'E-Mail'}
            ],
            search: {
                enabled: false,
                onlyEnterkey: false,
                onSearch: function(res) {
                    if (!res) {
                        that.myTable.reload(dataInit);
                    }
                    var dataAll = that.myTable.getData();
                    var search = dataAll.filter(function(el) {
                        return el.cod_projeto.toUpperCase().indexOf(res.toUpperCase()) >= 0
                            || el.nome_projeto.toUpperCase().indexOf(res.toUpperCase()) >= 0
                            || el.email.toUpperCase().indexOf(res.toUpperCase()) >= 0;
                    });
                    if (search && search.length) {
                        that.myTable.reload(search);
                    } else {
                        FLUIGC.toast({
                            title: 'Searching: ',
                            message: 'No results',
                            type: 'success'
                        });
                    }
                }
            },
            navButtons: {
                enabled: false,
            },
        }, function(err, data) {
            if(data) {
                dataInit = data;
            }
            else if (err) {
                FLUIGC.toast({
                    message: err,
                    type: 'danger'
                });
            }
        });
    },


    modal: function() {

        // var item = {

        //     cod_projeto: '98565665',
        //     nome_projeto: 'No registro',
        //     cliente: 'Novo Cliente',
        //     responsavel: 'Responsavel Novo',
        //     documento: 'MIT789',
        //     status: 'Pendente',
        //     email: 'email@email.com'
        // }

       
        // $("#mytable").append(output);

        // var divModal = $("#modal-body_"+this.instanceId)
        // console.log('template:   ' + template)

        // var template = $('.template_datatable').html();
        // var output = Mustache.render(template, item);
       

        var myModal = FLUIGC.modal({
            title: 'Incluir MIT',
            content: '<div id="modal-body">'+
                      '<div class="panel panel-primary">'+
                      '<div class="panel-heading">'+
                      '<label for="panel-3">Incluir MIT</label>'+
                      '</div>'+ 
                      '<div class="panel-body">'+
                      '<div class="row">'+
                      '<div class="col-xs-6 col-sm-4">'+
                      '<label for="codProjeto">Código do Projeto</label>'+
                      '<input type="text" id="codProjeto" name="codProjeto" class="form-control">'+
                      '</div>'+
                      '<div class="col-xs-6 col-sm-4">'+
                      '<label for="nomProjeto">Nome do Projeto</label>'+
                      '<input type="text" id="nomProjeto" name="nomProjeto" class="form-control">'+
                      '</div>'+
                      '<div class="clearfix visible-xs-block"></div>'+
                      '<div class="col-xs-6 col-sm-4">'+
                      '<label for="cliente">Cliente</label>'+
                      '<input type="text" id="cliente" name="cliente" class="form-control">'+
                      '</div>'+
                      '</div>'+
                      '<div class="row">'+
                      '<div class="col-xs-6 col-sm-4">'+
                      '<label for="responsavel">Responsável</label>'+
                      '<input type="text" id="responsavel" name="responsavel" class="form-control">'+
                      '</div>'+
                      '<div class="col-xs-6 col-sm-4">'+
                      '<label for="nomDocum">Documento</label>'+
                      '<input type="text" id="nomDocum" name="nomDocum" class="form-control">'+
                      '</div>'+
                      '<div class="col-xs-6 col-sm-4">'+
                      '<label for="emailTotvsSign">E-Mail Totvs Sign</label>'+
                      '<input type="email" id="emailTotvsSign" name="emailTotvsSign" class="form-control">'+
                      '</div>'+
                      '</div>'+
                      '<div class="row">'+
                      '<div class="col-xs-6 col-sm-4">'+
                      '<label for="inFile">Upload MIT</label>'+
                      '<input type="file" id="inFile" name="inFile" class="form-control">'+
                      '</div>'+
                      '</div>'+
                      '</div>'+
                      '</div>'+
                    //   '<div class="modal-footer">'+
                    //   '<button type="button" class="btn btn-primary" id="btnSalvar" data-cadastrar-mit>Cadastrar MIT</button>'+
                    //   '<button type="button" class="btn btn-default" data-fechar>Fechar</button>'+
                    //   '</div>'+
                      '</div>',
            id: 'fluig-modalMit',
            size: 'full',
            actions: [{
                'label': 'Salvar',
                'bind': 'data-add-modal',
            },{
                'label': 'Fechar',
                'autoClose': true
            }]
        }, function(err, data) {
            if(err) {
                // do error handling
            } else {
                // do something with data
                $("button[data-add-modal]").click(function(){
                    
                    var c1 = $('#codProjeto').val()
                    var c2 = $('#nomProjeto').val()
                    var c3 = $('#cliente').val()
                    var c4 = $('#responsavel').val()
                    var c5 = $('#emailTotvsSign').val()
                    var c6 = $('#inFile').val()

                    var item = {

                        cod_projeto: c1,
                        nome_projeto: c2,
                        cliente: c3,
                        responsavel: c4,
                        documento: c5,
                        email: c6
                    }
                
                    console.log('ITEM:  '+ item)
                    console.log('ITEM VALUE:  '+ Object.values(item))
                })
            }
        });
    },

    // btnAdicionar: function () {

    //     $('#modal-body_' + this.instanceId).show()
    // },

    // btnAddMit: function () {

    //     $('#modal-body_' + this.instanceId).hide()
    // },

    // btnFechar: function () {

    //     $('#modal-body_' + this.instanceId).hide()
    // },

    // AddTableRow: function() {
    //     console.log('CLIQUEI EM AddTableRow');
    //     var newRow = $("<tr>");
    //     var cols = ""
    
    //     cols += '<td>&nbsp;<input type="checkbox" id="cbxSelect" name="cbxSelect" class="form-control"/></td>';
    //     cols += '<td>&nbsp;<input type="text" id="tbCodicoProjeto_${instanceId}" name="tbCodicoProjeto" class="form-control" value="3256565"/></td>';
    //     cols += '<td>&nbsp;<input type="text" id="tbNomeProjeto_${instanceId}" name="tbNomeProjeto" class="form-control"/></td>';
    //     cols += '<td>&nbsp;<input type="text" id="tbCliente_${instanceId}" name="tbCliente" class="form-control"/></td>';
    //     cols += '<td>&nbsp;<input type="text" id="tbRenponsavel_${instanceId}" name="tbRenponsavel" class="form-control"/></td>';
    //     cols += '<td>&nbsp;<input type="text" id="tbDocumento_${instanceId}" name="tbDocumento" class="form-control"/></td>';
    //     cols += '<td>&nbsp;<input type="text" id="tbStatus_${instanceId}" name="tbStatus" class="form-control"/></td>';
    //     cols += '<td>&nbsp;<input type="text" id="tbEmail_${instanceId}" name="tbEmail" class="form-control"/></td>';
    
    //     newRow.append(cols);
    //     $("#tb_documento_"+this.instanceId).append(newRow);
    
    //     return false;
    //   }

    // excluirLinha: function () {

    //     var $selecionados = document.querySelectorAll('td [type="checkbox"]:checked:not([id=lblPrinc])') 
    //     for(let i = 0; i < $selecionados.length; i++) {
    //         $selecionados[i].parentNode.parentNode.remove()
    //     }
    // },

    // selecionarTodosChecks: function(){
    //     console.log('FUNÇAO SELECIONA TODOS:  ')

    //     checkBoxs = document.querySelectorAll('input[type="checkbox"]:not([id=lblPrinc])');
    //     [].forEach.call(checkBoxs, function(checkbox) {
    //         checkbox.checked = checkbox.checked ? false : true;
    //     });
    // }

});