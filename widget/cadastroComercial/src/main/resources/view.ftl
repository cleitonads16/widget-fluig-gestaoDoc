<div id="MyWidget_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide" data-params="MyWidget.instance()">
<div id="div_principal" class="container-fluid">
		<form>					
            <div class="panel panel-default">
                <div class="panel-body">
                    <div class="row">
                        <div class="col-xs-12 col-sm-6 col-md-8">
                            <label for="nomCoord">Nome:</label>
                            <input type="text" id="nomeUsuario_${instanceId}" name="nomeUsuario" class="form-control" readonly>
                        </div>
                        <div class="col-xs-6 col-md-4">
                            <label for="nomCoord">Data:</label>
                            <input type="text" id="data_${instanceId}" name="data" class="form-control" readonly>
                        </div>
                    </div><br>
                    <div class="row" id="divBotaoAdd">
                        <div class="col-md-12">
                            <button type="button" id="btAdd" class="btn btn-info" data-novoCadastro>Novo Cadastro</button>&nbsp;&nbsp;
                            <button type="button" id="btExcluir" class="btn btn-danger" data-excluir>Excluir</button>                                 
                        </div>
                    </div><br>
                    <div id="divTabela">
                        <div class="panel panel-default">
                            <div class="panel-body">
                                <div class="row">
                                    <div class="form-group has-feedback">
                                        <input type="text" id="campFiltro" name="campFiltro" class="form-control" placeholder="Digite o dado da tabela que deseja filtrar">
                                        <i class="fluigicon fluigicon-search form-control-feedback"></i>
                                    </div>
                                </div><br>
                                <div class="row">
                                    <table class="table table-striped table-bordered table-responsive" id="tabela1">
                                        <thead class="scroll-thead">
                                            <tr class="info">
                                                <td><b><input type="checkbox" id="chk_tabela1" data-checkboxTb1></b></td>
                                                <th><b>CNPJ</b></th>
                                                <th><b>Empresa</b></th>
                                                <th><b>ESN</b></th>
                                                <th><b>Status</b></th>
                                                <th><b>Editar</b></th>
                                            </tr>
                                        </thead>
                                        <tbody id="tbodyTabela1" class="scroll-tbody-y table-body"></tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="divFormulario">
                    <h3 id="h3Inserir"><span class="fluigicon fluigicon-add-test icon-md"></span>&nbsp;INSERIR DADOS</h3>
                    <h3 id="h3Editar"><span class="fluigicon fluigicon-community-edit icon-md"></span>&nbsp;EDITAR DADOS</h3>
                        <div class="panel panel-default">
                            <div class="panel-body">
                                <div class="row">
                                    <div class="col-md-2">
                                        <label for="unidade">Unidade:</label>
                                        <select id="unidade" class="form-control">
                                            <option value="SELECIONE">SELECIONE</option>
                                            <option value="TSM">TSM</option>
                                            <option value="TSUL">TSUL</option>
                                        </select>
                                        <input type="hidden" id="id_editar" name="id_editar">
                                    </div>
                                    <#--  <div class="col-md-2">
                                        <label for="codigo">Código Prospect:</label>
                                        <input type="text" id="codigo" name="codigo" class="form-control"/>
                                    </div>  -->
                                    <div class="col-md-3">
                                        <label for="cnpj">CNPJ:</label>
                                        <input type="text" id="cnpj" name="cnpj" class="form-control" onkeypress='mascaraMutuario(this,cpfCnpj)' onblur='clearTimeout()' maxlength="18"/>
                                    </div>
                                    <div class="col-md-5">
                                        <label for="empresa">Empresa:</label>
                                        <input type="text" id="empresa" name="empresa" class="form-control"/>
                                    </div> 
                                    <div class="col-md-2">
                                        <label for="telefone">Telefone:</label>
                                        <input type="text" id="telefone" name="telefone" class="form-control" onkeypress="mask(this, mphone);" onblur="mask(this, mphone);"/>
                                    </div>
                                </div>
                                <div class="row space">
                                    <div class="col-md-2">
                                        <label for="contato">Contato:</label>
                                        <input type="text" id="contato" name="contato" class="form-control"/>
                                    </div>  
                                    <div class="col-md-2">
                                        <label for="setor">Setor:</label>
                                        <input type="text" id="setor" name="setor" class="form-control"/>
                                    </div>  
                                    <div class="col-md-4">
                                        <label for="email">E-mail:</label>
                                        <input type="text" id="email" name="email" class="form-control"/>
                                    </div>  
                                    <div class="col-md-2">
                                        <label for="entidade">Entidade:</label>
                                        <select id="entidade" class="form-control">
                                            <option value="SELECIONE">SELECIONE</option>
                                            <option value="PROSPECT">PROSPECT</option>
                                            <option value="CLIENTE">CLIENTE</option>
                                        </select>
                                    </div>
                                    <div class="col-md-2">
                                        <label for="origem">Origem:</label>
                                        <select id="origem" class="form-control">
                                            <option value="SELECIONE">SELECIONE</option>
                                            <option value="APN">APN</option>
                                            <option value="INDICACAO">INDICAÇÃO</option>
                                            <option value="0800">0800</option>
                                            <option value="ESN">ESN</option>
                                        </select>
                                    </div>
                                                              
                                </div>
                                <div class="row space">
                                    <div class="col-md-2">
                                        <label for="cidade">Cidade:</label>
                                        <input type="text" id="cidade" name="cidade" class="form-control"/>
                                        <#--  <select id="cidade" class="form-control">
                                            <option value="SELECIONE">SELECIONE</option>
                                            <option value="SP">SP</option>
                                            <option value="MG">MG</option>
                                            <option value="PE">PE</option>
                                            <option value="BA">BA</option>
                                        </select>  -->
                                    </div>          
                                    <div class="col-md-2">
                                        <label for="segmento">Segmento:</label>
                                        <select id="segmento" class="form-control">
                                            <option value="SELECIONE">SELECIONE</option>
                                            <option value="AGRO">AGRO</option>
                                            <option value="CONSTRUCAO">CONSTRUÇÃO</option>
                                            <option value="DISTRIBUICAO">DISTRIBUIÇÃO</option>
                                            <option value="EDUCACIONAL">EDUCACIONAL</option>
                                            <option value="LOGISTICA">LOGISTICA</option>
                                            <option value="MANUFATURA">MANUFATURA</option>
                                            <option value="SERVICOS">SERVIÇOS</option>
                                            <option value="VAREJO">VAREJO</option>
                                        </select>
                                    </div>        
                                	<div class="col-md-2">
                                        <label for="esn">ESN:</label>
                                        <input type="text" id="esn" name="esn" class="form-control" data-esn/>
                                        <#--  <input type="hidden" id="id_matricula " name="id_matricula ">  -->
                                        <#--  <select id="esn" class="form-control">
                                            <option value="SELECIONE">SELECIONE</option>
                                            <option value="CARLA">CARLA</option>
                                            <option value="MONICA">MONICA</option>
                                            <option value="MARYSTELLA">MARYSTELLA</option>
                                            <option value="LEILA">LEILA</option>
                                            <option value="MARCELO">MARCELO</option>
                                            <option value="MARCELA">MARCELA</option>
                                        </select>  -->
                                    </div>
                                    <div class="form-group col-md-2">
                                        <label for="workArea">WorkArea</label> 
                                        <input type="text" name="workArea" id="workArea" class="form-control"/>
                                    </div>
                                    <div class="col-md-2">
                                        <label for="produto">Produto:</label>
                                        <select id="produto" class="form-control">
                                            <option value="SELECIONE">SELECIONE</option>
                                            <option value="PROTHEUS">PROTHEUS</option>
                                            <option value="RM">RM</option>
                                            <option value="LOGIX">LOGIX</option>
                                            <option value="DATA">DATA </option>
                                            <option value="SUL">SUL </option>
                                            <option value="WINTHOR">WINTHOR</option>
                                        </select>
                                    </div> 
                                    <div class="col-md-2">
                                        <label for="modalidade">Modalidade:</label>
                                        <select id="modalidade" class="form-control">
                                            <option value="SELECIONE">SELECIONE</option>
                                            <option value="CORPORATIVO">CORPORATIVO</option>
                                            <option value="TRADICIONAL">TRADICIONAL </option>
                                            <option value="INTERA">INTERA</option>                              
                                        </select>
                                    </div> 
                                    
                                </div>                                
                                <div class="row space">
                                    <div class="col-md-3">
                                        <label for="solucoes">Soluções:</label>
                                        <select id="solucoes" class="form-control">
                                            <option value="SELECIONE">SELECIONE</option>
                                            <option value="FLUIG">FLUIG</option>
                                            <option value="GOODDATA">GOODDATA</option>
                                            <option value="APPs">APPs </option>
                                            <option value="CRM">CRM</option>
                                            <option value="TEF">TEF</option>
                                            <option value="VTEX">VTEX </option>
                                            <option value="SW">SW</option>
                                            <option value="WEBSERVICE">WEBSERVICE</option>
                                            <option value="PRIME">PRIME </option>
                                            <option value="CLOUD">CLOUD</option>
                                            <option value="WINTHOR">WINTHOR </option>
                                            <option value="EDUCACAO">EDUCAÇÃO</option> 
                                            <option value="OUTROS">OUTROS</option>                                  
                                        </select>
                                    </div>
                                    <div class="col-md-2">
                                        <label for="outros">Informe Outros:</label>
                                        <input type="text" id="outros" name="outros" class="form-control"/>
                                    </div>       
                                    <div class="col-md-3">
                                        <label for="estagio">Estágio:</label>
                                        <select id="estagio" class="form-control">
                                            <option value="SELECIONE">SELECIONE</option>
                                            <option value="PRIMEIRAVISITA">PRIMEIRA VISITA</option>
                                            <option value="DEMONSTRACAO">DEMONSTRAÇÃO </option>
                                            <option value="ELABORACAODEPROPOSTA">ELABORAÇÃO DE PROPOSTA</option>
                                            <option value="NEGOCIACAO">NEGOCIAÇÃO</option>
                                            <option value="FECHADA">FECHADA</option>                              
                                        </select>
                                    </div>
                                    <div class="col-md-2">
                                        <label for="estagioStatus">Status:</label>
                                        <select id="estagioStatus1" class="form-control"> 
                                            <option value="SELECIONE">SELECIONE</option>                                           
                                            <option id="RESERVA" value="RESERVA">RESERVA</option>
                                            <option id="PIPELINE" value="PIPELINE">PIPELINE</option> 
                                            <option id="FORECAST" value="FORECAST">FORECAST </option> 
                                            <option id="FECHADA" value="FECHADA">FECHADA</option>                              

                                        </select>
                                        <#--  <select id="estagioStatus2" class="form-control">
                                            <option value="SELECIONE">SELECIONE</option>                                           
                                            <option value="PIPELINE">PIPELINE</option>
                                            <option value="FORECAST">FORECAST </option>                                                                        
                                        </select>  -->
                                    </div>
                                     <div class="col-md-2">
                                        <label for="dataPrevisao">Previsão de Venda:</label>
                                        <div class='input-group'>
                                            <span class="input-group-addon">
                                                <i class="fluigicon fluigicon-calendar icon-sm"></i>
                                            </span>
                                            <input type="text" id="dataPrevisao" name="dataPrevisao" class="form-control"/>
                                        </div>
                                    </div>       
                                </div>
                                <div class="row space">
                                    <div class="col-md-3">
                                    <label for="cduAdesao">CDU/Adesão:</label>
                                    <div class='input-group'>
                                        <span class="input-group-addon">
                                            <i class="fluigicon fluigicon-money-circle icon-sm"></i>
                                        </span>
                                            <input type="text" id="cduAdesao" name="cduAdesao" class="form-control dinheiro" onKeyPress="return(moeda(this,'.',',',event))"/>
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <label for="saas">SAAS:</label>
                                        <select id="saas" class="form-control"> 
                                            <option value="SELECIONE">SELECIONE</option>                                           
                                            <option value="SIM">SIM</option>
                                            <option value="NAO">NÃO</option>                                                                         
                                        </select>
                                    </div>
								    <div class="col-md-3">
                                        <label for="mensalidade">Mensalidade:</label>
                                        <div class='input-group'>
                                            <span class="input-group-addon">
                                                <i class="fluigicon fluigicon-money-circle icon-sm"></i>
                                            </span>
                                            <input type="text" id="mensalidade" name="mensalidade" class="form-control dinheiro" onKeyPress="return(moeda(this,'.',',',event))"/>
                                        </div>
                                    </div> 
                                    <div class="col-md-3">
                                        <label for="servico">Serviço:</label>
                                        <div class='input-group'>
                                            <span class="input-group-addon">
                                                <i class="fluigicon fluigicon-money-circle icon-sm"></i>
                                            </span>
                                            <input type="text" id="servico" name="servico" class="form-control" onKeyPress="return(moeda(this,'.',',',event))"/>
                                        </div>
                                    </div> 
                                </div>
                                <div class="row space">
                                    <div class="col-md-4">
                                        <label for="quantHoras">Quantidade de Horas:</label>
                                        <div class='input-group'>
                                            <span class="input-group-addon">
                                                <i class="flaticon flaticon-clock icon-sm"></i>
                                            </span>
                                            <input type="text" id="quantHoras" name="quantHoras" class="form-control"/>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <label for="valorHora">Valor Hora:</label>
                                        <div class='input-group'>
                                            <span class="input-group-addon">
                                                <i class="fluigicon fluigicon-money-circle icon-sm"></i>
                                            </span>
                                            <input type="text" id="valorHora" name="valorHora" class="form-control dinheiro" onKeyPress="return(moeda(this,'.',',',event))"/>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <label for="totalServico">Total de Serviços:</label>
                                        <div class='input-group'>
                                            <span class="input-group-addon">
                                                <i class="fluigicon fluigicon-money-circle icon-sm"></i>
                                            </span>
                                            <input type="text" id="totalServico" name="totalServico" class="form-control dinheiro" onKeyPress="return(moeda(this,'.',',',event))"/>
                                        </div>
                                    </div>    
                                </div>
                                <div class="row space">
                                    <div class="col-md-12">
                                        <label for="observacoes">Observações:</label>
                                        <textarea type="text" id="observacoes" rows="3" class="form-control"></textarea>
                                    </div>                                  
                                </div>                               
                                <div class="row space">
                                    <div class="col-md-12">
                                        <button type="button" id="btEnviar" class="btn btn-success" data-enviar>Enviar</button>&nbsp;                                   
                                        <button type="button" id="btEditar" class="btn btn-warning" data-editar>Editar</button>&nbsp;                                   
                                        <button type="button" id="btSair" class="btn btn-default" data-sair>Sair</button>                                    
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

