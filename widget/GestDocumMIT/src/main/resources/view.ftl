<div id="MyWidget_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide" data-params="MyWidget.instance({})">
	<div class="container-fluid"><br>
        <form>
            <div class="panel panel-primary">
                <div class="panel-heading">Lista de Atividades</div>
                <div class="panel-body">
                    <div class="row">
                        <div class="col-xs-12 col-sm-6 col-md-8">
                            <label for="nomCoord">Nome:</label>
                            <input type="text" id="nomCoord" name="nomCoord" class="form-control" readonly>
                        </div>
                        <div class="col-xs-6 col-md-4">
                            <label for="nomCoord">Data:</label>
                            <input type="text" id="nomCoord" name="nomCoord" class="form-control" readonly>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-6 col-md-4">
                            <br>
                            <input type="text" id="campFiltro" name="campFiltro" class="form-control" placeholder="Responsável">
                        </div>
                        <div class="col-xs-6 col-md-2">
                            <br>
                            <input type="text" id="campFiltro" name="campFiltro" class="form-control" placeholder="Código do Projeto">
                        </div>
                        <div class="col-xs-6 col-md-2">
                            <br>
                            <button type="button" id="btBusca" class="btn btn-default">Buscar</button>
                            <button type="button" id="btRefresh" onclick="fnRefresh();" class="btn btn-default">Atualizar</button>
                        </div>
                    </div><br></br>
                    <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12" id="divLoading">
                            <table class="table table-striped table-bordered table-responsive" id="tnProjClient">
                                <thead class="scroll-thead">
                                    <tr class="info">
                                        <td><b>C&oacute;digo do Projeto</b></td>
                                        <td><b>Nome do Projeto</b></td>
                                        <td><b>Nome do Cliente</b></td>
                                        <td><b>Respons&aacute;vel</b></td>
                                        <td><b>Documento</b></td>
                                        <td><b>Horas Previstas</b></td>
                                        <td><b>Horas Realizadas</b></td>
                                        <td><b>Progresso</b></td>
                                    </tr>
                                </thead>
                                <tbody id="arrayProj" class="scroll-tbody-y table-body">
                                    <!-- tr>
                                        <td>1520025</td>
                                        <td>Projeto Zeta</td>
                                        <td>OCP (Omni Corp. Project)</td>
                                        <td>Lucas Braga Folha</td>
                                        <td><button type="button" id="btLinkMIT" class="btn btn-link" value="1520025" onclick="fnArrayMIT(this);">MIT P</button></td>
                                        <td>100.00</td>
                                        <td>25.00</td>
                                        <td>25%</td>
                                    </tr>
                                    <tr>
                                        <td>1520026</td>
                                        <td>Projeto Zeta</td>
                                        <td>OCP (Omni Corp. Project)</td>
                                        <td>Lucas Braga Folha</td>
                                        <td><button type="button" id="btLinkMIT" class="btn btn-link" value="1520026" onclick="fnArrayMIT(this);">MIT M</button></td>
                                        <td>100.00</td>
                                        <td>25.00</td>
                                        <td>25%</td>
                                    </tr>
                                    <tr>
                                        <td>1520027</td>
                                        <td>Projeto Zeta</td>
                                        <td>OCP (Omni Corp. Project)</td>
                                        <td>Lucas Braga Folha</td>
                                        <td><button type="button" id="btLinkMIT" class="btn btn-link" value="1520027" onclick="fnArrayMIT(this);">MIT G</button></td>
                                        <td>100.00</td>
                                        <td>25.00</td>
                                        <td>25%</td>
                                    </tr>
                                    <tr>
                                        <td>1520028</td>
                                        <td>Projeto Zeta</td>
                                        <td>OCP (Omni Corp. Project)</td>
                                        <td>Lucas Braga Folha</td>
                                        <td><button type="button" id="btLinkMIT" class="btn btn-link" value="1520028" onclick="fnArrayMIT(this);">MIT GG</button></td>
                                        <td>100.00</td>
                                        <td>25.00</td>
                                        <td>25%</td>
                                    </tr>
                                    <tr>
                                        <td>1520029</td>
                                        <td>Projeto Zeta</td>
                                        <td>OCP (Omni Corp. Project)</td>
                                        <td>Lucas Braga Folha</td>
                                        <td><button type="button" id="btLinkMIT" class="btn btn-link" value="1520029" onclick="fnArrayMIT(this);">MIT P</button></td>
                                        <td>100.00</td>
                                        <td>25.00</td>
                                        <td>25%</td>
                                    </tr>
                                    <tr>
                                        <td>1520030</td>
                                        <td>Projeto Zeta</td>
                                        <td>OCP (Omni Corp. Project)</td>
                                        <td>Lucas Braga Folha</td>
                                        <td><button type="button" id="btLinkMIT" class="btn btn-link" value="1520030" onclick="fnArrayMIT(this);">MIT M</button></td>
                                        <td>100.00</td>
                                        <td>25.00</td>
                                        <td>25%</td>
                                    </tr -->
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-esp" id="mdDocumMIT">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content-esp modal-dialog-centered">
                        <div class="modal-header">
                            <span class="close" onclick="fnCloseDocumMIT();">&times;</span>
                        </div>
                        <div class="modal-body">
                            <div class="panel panel-info">
                                <div class="panel-heading">MIT</div>
                                <div class="panel-body">
                                    <div class="row">
                                        <div class="col-xs-6 col-sm-4">
                                            <table class="table table-striped table-bordered table-responsive">
                                                <thead>
                                                    <tr class="info">
                                                        <td><b>Sequ&ecirc;ncia</b></td>
                                                        <td><b>Documento</b></td>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>1</td>
                                                        <td><button type="button" id="btLinkMIT" class="btn btn-link">MIT040 - Engenharia de Processo</button></td>
                                                    </tr>
                                                    <tr>
                                                        <td>2</td>
                                                        <td><button type="button" id="btLinkMIT" class="btn btn-link">MIT040 - Engenharia de Processo</button></td>
                                                    </tr>
                                                    <tr>
                                                        <td>3</td>
                                                        <td><button type="button" id="btLinkMIT" class="btn btn-link">MIT040 - Engenharia de Processo</button></td>
                                                    </tr>
                                                    <tr>
                                                        <td>4</td>
                                                        <td><button type="button" id="btLinkMIT" class="btn btn-link">MIT040 - Engenharia de Processo</button></td>
                                                    </tr>
                                                    <tr>
                                                        <td>5</td>
                                                        <td><button type="button" id="btLinkMIT" class="btn btn-link">MIT040 - Engenharia de Processo</button></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" id="btGraphic" class="btn btn-primary" onclick="fnGraphic();">Gr&aacute;fico de Doughnuts</button>
                            <button type="button" id="btCadMIT" class="btn btn-primary" onclick="fnCloseOk();">Ok</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-esp" id="mdGraphicPerc">
                <div class="modal-dialog modal-dialog-centered" style="width: 1000px;">
                    <div class="modal-content modal-dialog-centered">
                        <div class="modal-header">
                            <span class="close" onclick="fnCloseSpanGraphic()">&times;</span>
                        </div>
                        <div class="modal-body">
                            <canvas id="myChart" height="90"></canvas>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</div>