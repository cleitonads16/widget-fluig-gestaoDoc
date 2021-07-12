<div id="HelloWorld_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide"
     data-params="HelloWorld.instance({})">

    <!-- efetua a tradução do texto do objeto i18n -->	
    
    <div class="panel panel-primary">
		<div class="panel-heading">
			<label for="panel-1">${i18n.getTranslation('Coordenador de Projetos')}</label>
		</div>
		<div class="panel-body">
			<div class="row">
				<div class="col-md-6">
					<label for="respNome">${i18n.getTranslation('Nome')}</label>
					<input type="text" class="form-control" name="respNome" id="respNome_${instanceId}"/>
				</div>
				<div class="col-md-6">
					<label for="codigoProjeto">${i18n.getTranslation('Código do Projeto')}</label>
					<input class="form-control" name="codigoProjeto" id="codigoProjeto_${instanceId}"/>
				</div>									
			</div>
		</div>
	</div>
    <div class="panel panel-primary">
		<div class="panel-heading">
			<label for="panel-2">${i18n.getTranslation('Documentos')}</label>
		</div>
		<div class="panel-body">
			<div class="row">
				<div class="col-md-3">
					<button type="button" class="btn btn-primary" data-adicionar>${i18n.getTranslation('Adicionar')}</button>
					<button type="button" class="btn btn-primary" data-adicionar>${i18n.getTranslation('Editar')}</button>
					<button type="button" class="btn btn-default" data-excluir>${i18n.getTranslation('Remover')}</button>
				</div>
				<div class="col-md-3">
					<select class="form-control selectFiltro" name="selectFiltro" id="selectFiltro_${instanceId}">
						<option value="0"selected>${i18n.getTranslation('Selecione o Filtro')}</option>
						<option value="1">${i18n.getTranslation('Tudo')}</option>
                    	<option value="2">${i18n.getTranslation('Códico do Projeto')}</option>
                    	<option value="3">${i18n.getTranslation('Nome do Projeto')}</option>
                    	<option value="4">${i18n.getTranslation('Cliente')}</option>
                    	<option value="5">${i18n.getTranslation('Responsável')}</option>
                    	<option value="6">${i18n.getTranslation('Documento')}</option>
                    	<option value="7">${i18n.getTranslation('Status')}</option>
                    	<option value="8">${i18n.getTranslation('E-Mail')}</option>	
					</select>
				</div>
				<div class="col-md-5">
					<input type="text" class="form-control" name="filtroDescricao" id="filtroDescricao_${instanceId}" placeholder="Descreva o Filtro"/>
				</div>
				<div class="col-md-1">
					<button type="buton" class="btn btn-default" data-filter-buscar>${i18n.getTranslation('Buscar')}</button>
				</div>
			</div>
			<div class="table-responsive space">
				<table id="tb_documento_${instanceId}" class="table"></table>
				<#--  <div class="row">
					<table tablename="tb_documento" id="tb_documento_${instanceId}" class="table">
						<thead>
							<tr>
								<td><b><input type="checkbox" id="lblPrinc" data-checkboxSeleciona></b></td>
								<td><b>${i18n.getTranslation('Código do Projeto')}</b></td>
								<td><b>${i18n.getTranslation('Nome do Projeto')}</b></td>
								<td><b>${i18n.getTranslation('Cliente')}</b></td>
								<td><b>${i18n.getTranslation('Responsável')}</b></td>
								<td><b>${i18n.getTranslation('Documento')}</b></td>
								<td><b>${i18n.getTranslation('Status')}</b></td>
								<td><b>${i18n.getTranslation('E-Mail')}</b></td>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>
									<input type="checkbox" id="cbxSelect_${instanceId}" name="cbxSelect" class="form-control" value="3256565"/>
								</td>
								<td>
									<input type="text" id="tbCodicoProjeto_${instanceId}" name="tbCodicoProjeto" class="form-control"/>
								</td>
								<td> 
									<input type="text" id="tbNomeProjeto_${instanceId}" name="tbNomeProjeto" class="form-control"/>
								</td>
								<td>
									<input type="text" id="tbCliente_${instanceId}" name="tbCliente" class="form-control"/>
								</td>
								<td>
									<input type="text" id="tbRenponsavel_${instanceId}" name="tbRenponsavel" class="form-control"/>
								</td>
								<td>
									<input type="text" id="tbDocumento_${instanceId}" name="tbDocumento" class="form-control"/>
								</td>
								<td>
									<input type="text" id="tbStatus_${instanceId}" name="tbStatus" class="form-control"/>
								</td>
								<td>
									<input type="text" id="tbEmail_${instanceId}" name="tbEmail" class="form-control"/>
								</td>
							</tr>
						</tbody>
					</table>
				</div>  -->
			</div>
			<#--  <div class="row">
				<div id="modal-body_${instanceId}">
                    <div class="panel panel-primary">
                        <div class="panel-heading">
							<label for="panel-3">${i18n.getTranslation('Incluir MIT')}</label>
						</div>
                        <div class="panel-body">
                            <div class="row">
                                <div class="col-xs-6 col-sm-4">
                                    <label for="codProjeto"><td><b>${i18n.getTranslation('Código do Projeto')}</b></td></label>
                                    <input type="text" id="codProjeto" name="codProjeto" class="form-control">
                                </div>
                                <div class="col-xs-6 col-sm-4">
                                    <label for="nomProjeto"><td><b>${i18n.getTranslation('Nome do Projeto')}</b></td></label>
                                    <input type="text" id="nomProjeto" name="nomProjeto" class="form-control">
                                </div>

                                <div class="clearfix visible-xs-block"></div>
                                <div class="col-xs-6 col-sm-4">
                                    <label for="cliente">${i18n.getTranslation('Cliente')}</label>
                                     <input type="text" id="cliente" name="cliente" class="form-control">
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-xs-6 col-sm-4">
                                    <label for="responsavel">${i18n.getTranslation('Responsável')}</label>
                                    <input type="text" id="responsavel" name="responsavel" class="form-control">
                                </div>
                                <div class="col-xs-6 col-sm-4">
                                    <label for="nomDocum">${i18n.getTranslation('Documento')}</label>
                                    <input type="text" id="nomDocum" name="nomDocum" class="form-control">
                                </div>
                                <div class="col-xs-6 col-sm-4">
                                    <label for="emailTotvsSign">${i18n.getTranslation('E-Mail Totvs Sign')}</label>
                                    <input type="email" id="emailTotvsSign" name="emailTotvsSign" class="form-control">
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-xs-6 col-sm-4">
                                    <label for="inFile">${i18n.getTranslation('Upload MIT')}</label>
                                    <input type="file" id="inFile" name="inFile" class="form-control">
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-primary" data-cadastrar-mit>${i18n.getTranslation('Cadastrar MIT')}</button>
                                <button type="button" class="btn btn-default" data-fechar>${i18n.getTranslation('Fechar')}</button>
                            </div>
                        </div>

                    </div>
                </div>

			</div>  -->

		</div>
	</div>

</div>
<#--  <script type="text/template" class="template_datatable" id="template">
	<div id="modal-body_${instanceId}">
		<div class="panel panel-primary">
			<div class="panel-heading">
				<label for="panel-3">${i18n.getTranslation('Incluir MIT')}</label>
			</div> 
			<div class="panel-body">
				<div class="row">
					<div class="col-xs-6 col-sm-4">
						<label for="codProjeto"><td><b>${i18n.getTranslation('Código do Projeto')}</b></td></label>
						<input type="text" id="codProjeto" name="codProjeto" class="form-control">
					</div>
					<div class="col-xs-6 col-sm-4">
						<label for="nomProjeto"><td><b>${i18n.getTranslation('Nome do Projeto')}</b></td></label>
						<input type="text" id="nomProjeto" name="nomProjeto" class="form-control">
					</div>

					<div class="clearfix visible-xs-block"></div>
					<div class="col-xs-6 col-sm-4">
						<label for="cliente">${i18n.getTranslation('Cliente')}</label>
						<input type="text" id="cliente" name="cliente" class="form-control">
					</div>
				</div>
				<div class="row">
					<div class="col-xs-6 col-sm-4">
						<label for="responsavel">${i18n.getTranslation('Responsável')}</label>
						<input type="text" id="responsavel" name="responsavel" class="form-control">
					</div>
					<div class="col-xs-6 col-sm-4">
						<label for="nomDocum">${i18n.getTranslation('Documento')}</label>
						<input type="text" id="nomDocum" name="nomDocum" class="form-control">
					</div>
					<div class="col-xs-6 col-sm-4">
						<label for="emailTotvsSign">${i18n.getTranslation('E-Mail Totvs Sign')}</label>
						<input type="email" id="emailTotvsSign" name="emailTotvsSign" class="form-control">
					</div>
				</div>
				<div class="row">
					<div class="col-xs-6 col-sm-4">
						<label for="inFile">${i18n.getTranslation('Upload MIT')}</label>
						<input type="file" id="inFile" name="inFile" class="form-control">
					</div>
				</div>
			</div>
		</div>
		<div class="modal-footer">
            <button type="button" class="btn btn-primary" data-cadastrar-mit>${i18n.getTranslation('Cadastrar MIT')}</button>
            <button type="button" class="btn btn-default" data-fechar>${i18n.getTranslation('Fechar')}</button>
        </div>
	</div>
</script>  -->
<script type="text/javascript" src="/webdesk/vcXMLRPC.js"></script>

