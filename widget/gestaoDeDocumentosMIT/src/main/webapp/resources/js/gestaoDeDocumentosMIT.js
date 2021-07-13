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
        
            'adicionar': ['click_modal'],
            'excluir': ['click_delRow']            
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

        var myModal = FLUIGC.modal({
            title: 'Incluir MIT',
            content: '<div id="modal-body">'+
                      '<div class="panel panel-primary">'+
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
                      '<label for="nomDocum">Status</label>'+
                      '<input type="text" id="status" name="status" class="form-control">'+
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
                      '</div>',
            id: 'fluig-modalMit',
            size: 'full',
            actions: [{
                'label': 'Salvar',
                'bind': 'data-add-modal',
                'autoClose': true
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
                    var c5 = $('#inFile').val()
                    var c6 = $('#status').val()
                    var c7 = $('#emailTotvsSign').val()

                    var item = {

                        cod_projeto: c1,
                        nome_projeto: c2,
                        cliente: c3,
                        responsavel: c4,
                        documento: c5,
                        status: c6,
                        email: c7

                    }
                    
                    var template = $('.template_datatable').html();
                    var output = Mustache.render(template, item);
                    $(".table > tbody:first").append(output);
                })

            }
        });
    },

    delRow: function(el, ev) {
       
        var itemsToRemove = this.myTable.selectedRows();
     
        if (itemsToRemove.length > 0) {
            for (var i = 0; i <= itemsToRemove.length; i++) {
                this.myTable.removeRow(this.myTable.selectedRows()[0]);
            }
        }
     
        FLUIGC.toast({
            title: '',
            message: "Removed element",
            type: 'success'
        });
     
    }

});