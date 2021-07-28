<div id="MyWidget_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide" data-params="MyWidget.instance()">
    <div class="panel panel-primary">
        <div class="panel-heading">Lista de Atividades</div>
        <div class="panel-body">
            <div class="panel panel-primary">
                <div class="panel-heading">Usu&aacute;rio</div>
                <div class="panel-body">
                    <div class="row">
                        <div class="col-xs-12 col-sm-6 col-md-8">
                            <label for="nomCoord">Nome do Coordenador de Projetos:</label>
                            <input type="text" id="nomCoord" name="nomCoord" class="form-control" readonly>
                        </div>
                        <div class="col-xs-6 col-md-4">
                            <label for="dtToday">Data:</label>
                            <input type="text" id="dtToday" name="dtToday" class="form-control" readonly>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-5 col-md-3">
                    <br>
                    <div class="btn-group" role="group" aria-label="...">
                        <button type="button" id="btAdd" class="btn btn-success" onClick="fnCadMIT();">Adicionar</button>
                        <button type="button" id="btDel" class="btn btn-danger" onClick="fnDel();">Excluir</button>
                        <button type="button" id="btAtualiza" class="btn btn-default" onClick="fnDadosMIT();">Atualizar</button>
                    </div>
                </div>
                <div class="col-xs-8 col-md-6">
                    <br>
                    <input type="text" id="campFiltro" name="campFiltro" class="form-control">
                </div>
            </div>
            <div class="row">
                <div id="divLoading" class="col-xs-12 col-sm-12 col-md-12">
                    <table class="table table-striped table-bordered table-responsive">
                        <thead>
                            <tr class="info">
                                <td><b><input type="checkbox" id="lblPrinc" onChange="fnSelectAll();"></b></td>
                                <td><b>C&oacute;digo do Projeto</b></td>
                                <td><b>Nome do Projeto</b></td>
                                <td><b>Cliente</b></td>
                                <td><b>Respons&aacute;vel</b></td>
                                <td><b>Documento</b></td>
                                <td><b>Status</b></td>
                                <td><b>E-Mail</b></td>
                            </tr>
                        </thead>
                        <tbody id="tbDadosMIT"></tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    <div class="modal-esp" id="mdDocumMIT">
        <div class="modal-dialog modal-dialog-centered" style="width: 1200px;">
            <div class="modal-content-esp modal-dialog-centered">
                <div class="modal-header">
                    <span class="close" onClick="fnCloseDocumMIT();">&times;</span>
                </div>
                <div class="modal-body">
                    <div class="panel panel-info">
                        <div class="panel-heading">Incluir MIT</div>
                        <div class="panel-body">
                            <div class="row">
                                <div class="col-xs-6 col-sm-4">
                                    <label for="cod_client">C&oacute;digo do Cliente:</label>
                                    <input type="text" id="cod_client" name="cod_client" class="form-control">
                                </div>
                                <div class="col-xs-6 col-sm-4">
                                    <label for="nm_client">Nome do Cliente:</label>
                                    <input type="text" id="nm_client" name="nm_client" class="form-control">
                                </div>
                                <div class="clearfix visible-xs-block"></div>
                                <div class="col-xs-6 col-sm-4">
                                    <label for="projeto">C&oacute;digo do Projeto:</label>
                                    <input type="text" id="projeto" name="projeto" class="form-control">
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-xs-6 col-sm-4">
                                    <label for="nm_projeto">Nome do Projeto:</label>
                                    <input type="text" id="nm_projeto" name="nm_projeto" class="form-control">
                                </div>
                                <div class="col-xs-6 col-sm-4">
                                    <label for="nm_responsavel">Respons&aacute;vel:</label>
                                    <input type="text" id="nm_responsavel" name="nm_responsavel" class="form-control">
                                </div>
                                <div class="clearfix visible-xs-block"></div>
                                <div class="col-xs-6 col-sm-4">
                                    <label for="emailCliente">E-Mail do Cliente:</label>
                                    <input type="email" id="emailCliente" name="emailCliente" class="form-control">
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-xs-6 col-sm-4">
                                    <label for="loja">Loja:</label>
                                    <input type="text" id="loja" name="loja" class="form-control">
                                </div>
                                <div class="form-group col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                    <label class="control-label" style="margin-bottom: 10px;">Selecione o tipo de projeto:</label>
                                    <div class="div_margin">
                                        <label class="radio-inline">
                                            <input type="radio" name="tipoProjeto" id="tipoProjetoP" value="P" onClick="fnMIT(this.value);">P
                                        </label>
                                        <label class="radio-inline">
                                            <input type="radio" name="tipoProjeto" id="tipoProjetoM" value="M" onClick="fnMIT(this.value);">M
                                        </label>
                                        <label class="radio-inline">
                                            <input type="radio" name="tipoProjeto" id="tipoProjetoG" value="G" onClick="fnMIT(this.value);">G
                                        </label>
                                        <label class="radio-inline">
                                            <input type="radio" name="tipoProjeto" id="tipoProjetoMIT" value="MIT" onClick="fnMIT(this.value);">MIT
                                        </label>
                                    </div>
							    </div>
                                <div class="clearfix visible-xs-block"></div>
                                <div id="devControlMIT" class="form-group col-xs-4 col-sm-4 col-md-4 col-lg-4" style="display: none;">
                                    <label for="controlMIT">MIT:</label>
                                    <input type="text" id="controlMIT" name="controlMIT" class="form-control">
                                </div>
                            </div>
                            <div class="row">
                                <div class="form-group col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                    <label for="codMatricula">Matr&iacute;cula:</label>
                                    <input type="text" id="codMatricula" name="codMatricula" class="form-control" readonly>
                                </div>
                            </div>
                            <br>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" id="btCadMIT" class="btn btn-primary" onClick="fnCloseOk();">Cadastrar MIT</button>
                    <button type="button" id="btClosed" class="btn btn-default" onClick="fnCloseDocumMIT();">Fechar</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal-esp" id="mdTableTotvsSign">
        <div class="modal-dialog modal-dialog-centered" style="width: 1000px;">
            <div class="modal-content-esp modal-dialog-centered">
                <div class="modal-header">
                    <span class="close" onClick="fnCloseMITTable();">&times;</span>
                </div>
                <div class="modal-body">
                    <div class="panel panel-info">
                        <div class="panel-heading">(Dados do Cliente) Incluir MIT</div>
                        <div class="panel-body">
                            <form id="formPDF">
                                <div class="row">
                                    <div class="col-xs-6 col-md-4">
                                        <br>
                                        <div class="btn-group" role="group" aria-label="...">
                                            <button type="button" id="btAddUser" class="btn btn-success" onClick="fnCadCliente();">Adicionar</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-xs-12 col-sm-12 col-md-12">
                                        <table class="table table-striped table-bordered table-responsive">
                                            <thead>
                                                <tr class="info">
                                                    <td><b><input type="checkbox" id="lblPrinc"></b></td>
                                                    <td><b>E-Mail do Cliente</b></td>
                                                    <td><b>Nome do Cliente</b></td>
                                                    <td><b>CPF do Cliente</b></td>
                                                    <td><b>Telefone do Cliente</b></td>
                                                    <td><b>Cargo do Cliente</b></td>
                                                </tr>
                                            </thead>
                                            <tbody id="tbUserTotvsSign"></tbody>
                                        </table>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                        <label for="fileMIT">Publicar MIT:</label>
                                        <input type="file" id="fileMIT" name="fileMIT" class="form-control">
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <input type="hidden" id="codDocumID" name="codDocumID">
                </div>
                <div class="modal-footer">
                    <button type="button" id="btCadTotvsSign" class="btn btn-primary" onClick="fnAddTotvsSign();">Publicar MIT</button>
                    <button type="button" id="btClosSign" class="btn btn-default" onClick="fnCloseMITTable();">Fechar</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal-esp" id="mdTotvsSign">
        <div class="modal-dialog modal-dialog-centered" style="width: 800px;">
            <div class="modal-content-esp modal-dialog-centered">
                <div class="modal-header">
                    <span class="close" onClick="fnCloseDocumMIT();">&times;</span>
                </div>
                <div class="modal-body">
                    <div class="panel panel-info">
                        <div class="panel-heading">(Dados do Cliente) Totvs Sign</div>
                        <div class="panel-body">
                            <div class="row">
                                <div class="col-xs-6 col-sm-4">
                                    <label for="emailTotvsSign">E-Mail do Cliente:</label>
                                    <input type="email" id="emailTotvsSign" name="emailTotvsSign" class="form-control">
                                </div>
                                <div class="col-xs-6 col-sm-4">
                                    <label for="nomeTotvsSign">Nome do Cliente:</label>
                                    <input type="text" id="nomeTotvsSign" name="nomeTotvsSign" class="form-control">
                                </div>
                                <div class="clearfix visible-xs-block"></div>
                                <div class="col-xs-6 col-sm-4">
                                    <label for="cpfTotvsSign">CPF do Cliente:</label>
                                    <input type="text" id="cpfTotvsSign" name="cpfTotvsSign" class="form-control">
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-xs-6 col-sm-4">
                                    <label for="telTotvsSign">Telefone do Cliente:</label>
                                    <input type="text" id="telTotvsSign" name="telTotvsSign" class="form-control">
                                </div>
                                <div class="col-xs-6 col-sm-4">
                                    <label for="posTotvsSign">Cargo do Cliente:</label>
                                    <input type="text" id="posTotvsSign" name="posTotvsSign" class="form-control">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" id="btCadTotvsSign" class="btn btn-primary" onClick="fnAdd();">Ok</button>
                    <button type="button" id="btClosSign" class="btn btn-default" onClick="fnCloseDocumSign();">Fechar</button>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script -->
<script type="text/javascript" src="/webdesk/vcXMLRPC.js"></script>