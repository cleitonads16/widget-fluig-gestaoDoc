<div id="MyWidget_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide" data-params="MyWidget.instance()">
	<div id="div_principal" class="container-fluid">
		<form>
			<h3 for="listaAtividades">Cadastrar Novo Projeto</h3>
            <div class="panel panel-default">
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
                    <div class="divCadastro" id="divCadastro">
                        <div class="panel panel-default">
                            <div class="panel-body">
                                <div class="row">
                                    <div class="col-md-4">
                                        <label for="cod_client">C&oacute;digo do Cliente:</label>
                                        <input type="text" id="cod_client" name="cod_client" class="form-control"/>
                                    </div>
                                    <div class="col-md-6">
                                        <label for="nm_client">Nome do Cliente:</label>
                                        <input type="text" id="nm_client" name="nm_client" class="form-control"/>
                                    </div>
                                    <div class="clearfix visible-xs-block"></div>
                                    <div class="col-md-2">
                                        <label for="projeto">C&oacute;digo do Projeto:</label>
                                        <input type="text" id="projeto" name="projeto" class="form-control"/>
                                    </div>
                                </div>
                                <div class="row space">
                                    <div class="col-md-4">
                                        <label for="nm_projeto">Nome do Projeto:</label>
                                        <input type="text" id="nm_projeto" name="nm_projeto" class="form-control"/>
                                    </div>
                                    <div class="col-md-4">
                                        <label for="nm_responsavel">Respons&aacute;vel:</label>
                                        <input type="text" id="nm_responsavel" name="nm_responsavel" class="form-control"/>
                                    </div>
                                    <div class="clearfix visible-xs-block"></div>
                                    <div class="col-md-4">
                                        <label for="emailCliente">E-Mail do Cliente:</label>
                                        <input type="email" id="emailCliente" name="emailCliente" class="form-control"/>
                                    </div>
                                </div>
                                <div class="row space">
                                    <div class="col-md-2">
                                        <label for="stProjeto">Status do Projeto:</label>
                                        <select id="st_projeto" class="form-control">
                                            <option value="selecione">Selecione</option>
                                            <option value="Ativo">Ativo</option>
                                            <option value="Suspenso">Suspenso</option>
                                            <option value="Encerrado">Encerrado</option>
                                        </select>
                                    </div>
                                    <div class="col-md-2">
                                        <label for="loja">Loja:</label>
                                        <input type="text" id="loja" name="loja" class="form-control"/>
                                    </div>
                                    <div class="col-md-4">
                                        <label for="dimenc">Selecione o Dimencionamento do Projeto:</label>
                                        <select id="tipoProjeto" class="form-control">
                                            <option value="selecione">Selecione</option>
                                            <option value="P">Pequeno</option>
                                            <option value="M">Médio</option>
                                            <option value="G">Grande</option>
                                            <option value="MIT">MIT</option>
                                        </select>
                                    </div>
                                    <div class="col-md-4">
                                        <label for="controlMIT">MIT:</label>
                                        <input type="text" id="controlMIT" name="controlMIT" class="form-control"/>
                                    </div>
                                </div>
                                <div class="row space">
                                    <div class="col-md-4">
                                        <label for="codMatricula">Matr&iacute;cula:</label>
                                        <input type="text" id="codMatricula" name="codMatricula" class="form-control"/>
                                    </div>
                                    <div class="col-md-4">
                                        <label for="horasPrev">Horas Previstas:</label>
                                        <input type="text" name="hr_previstas" id="hr_previstas" class="form-control"/>
                                    </div>
                                    <div class="col-md-4">
                                        <label for="horasPrev">Horas Realizadas:</label>
                                        <input type="text" name="hr_realizadas" id="hr_realizadas" class="form-control"/>
                                    </div>
                                </div><br>
                                <div class="row space">
                                    <div class="col-md-12">
                                        <button type="button" id="btAdd" class="btn btn-success" data-adicionar>Adicionar Novo Projeto</button>&nbsp;&nbsp;&nbsp;
                                        <button type="button" id="btVisu" class="btn btn-info" data-visualizar>Visualizar Projetos Inseridos</button>
                                    </div>
                                </div>
                            </div>
                        </div>       
                    </div>
                </div>
            </div>
        </form>
	</div>
</div>

