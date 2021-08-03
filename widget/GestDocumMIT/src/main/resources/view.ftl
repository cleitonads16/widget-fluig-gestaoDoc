<div id="MyWidget_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide" data-params="MyWidget.instance({})">
	<div class="container-fluid"><br>
        <form>
            <div class="panel panel-primary">
                <div class="panel-heading">
                    <label for="listaAtividades">Lista de Atividades</label>
                </div>
                <div class="panel-body">
                    <div class="row">
                        <div class="col-xs-12 col-sm-6 col-md-8">
                            <label for="nomCoord">Nome:</label>
                            <input type="text" id="nomCoord_${instanceId}" name="nomCoord" class="form-control" readonly>
                        </div>
                        <div class="col-xs-6 col-md-4">
                            <label for="nomCoord">Data:</label>
                            <input type="text" id="data_${instanceId}" name="nomCoord" class="form-control" readonly>
                        </div>
                    </div><br>
                    <div class="row">
                        <div class="col-md-3" style="width: -5px">
                            <button type="button" id="btAdd" class="btn btn-success" data-adicionar>Adicionar Novo Projeto</button>&nbsp;&nbsp;&nbsp;
                            <button type="button" id="btRefresh" class="btn btn-default" data-refresh>Atualizar</button>
                        </div>
                        <div class="col-md-9">
                            <div class="form-group has-feedback">
                                <input type="text" id="campFiltro" name="campFiltro" class="form-control" placeholder="Digite o dado da tabela que deseja filtrar">
                                <i class="fluigicon fluigicon-search form-control-feedback"></i>
                            </div>
                        </div>
                    </div><br>
                    <div class="row">
                        <div class="divLoading" id="divLoading">
                            <table class="table table-striped table-bordered table-responsive" id="tnProjClient">
                                <thead class="scroll-thead">
                                    <tr class="info">
                                        <#--  <td><b><input type="checkbox" id="lblPrinc" data-checkboxTb></b></td>  -->

                                        <th><b>Cliente</b></th>
                                        <th><b>Código Projeto</b></th>
                                        <th><b>Nome do Projeto</b></th>
                                        <th><b>Respons&aacute;vel</b></th>
                                        <th><b>Status</b></th>
                                        <th><b>Editar</b></th>
                                    </tr>
                                </thead>
                                <tbody id="arrayProj" class="scroll-tbody-y table-body"></tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</div>