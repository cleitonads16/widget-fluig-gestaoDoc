<div id="HelloWorld_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide"
     data-params="HelloWorld.instance({})">

    <!-- efetua a tradução do texto do objeto i18n -->	
    
    <div class="panel panel-primary">
		<div class="panel-heading">
			<label for="panel-1">${i18n.getTranslation('Coordenador de Projetos')}</label>
		</div>
		<div class="panel-body">
			<div class="row">
				<div class="col-md-8">
					<label for="respNome">${i18n.getTranslation('Nome')}</label>
					<input type="text" class="form-control" name="respNome" id="respNome_${instanceId}"/>
				</div>
				<div class="col-md-4">
					<label for="codigoProjeto">${i18n.getTranslation('Data')}</label>
					<input class="form-control" name="codigoProjeto" id="codigoProjeto_${instanceId}"/>
				</div>									
			</div>
		</div>
	</div>
    <div class="panel panel-primary">
		<div class="panel-heading">
			<label for="panel-2">${i18n.getTranslation('Projetos')}</label>
		</div>
		<div class="panel-body">
			<div class="row">
				<div class="col-md-3">
					<button type="button" class="btn btn-primary" data-adicionar>${i18n.getTranslation('Adicionar')}</button>
					<button type="button" class="btn btn-primary" data-editar>${i18n.getTranslation('Editar')}</button>
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
				<table id="tb_documento_${instanceId}" class="table table-condensed"></table>
			</div>
		</div>
	</div>
</div>
<script type="text/template" class="template_datatable" id="template">
	<tr>
        <td>{{cod_projeto}}</td>
        <td>{{nome_projeto}}</td>
        <td>{{cliente}}</td>
        <td>{{responsavel}}</td>
        <td>{{documento}}</td>
        <td>{{status}}</td>
        <td>{{email}}</td>
        <td></td>
    </tr>
</script>
<script type="text/javascript" src="/webdesk/vcXMLRPC.js"></script>

