//window.location.protocol + "//" + window.location.hostname
var BearerToken = "";
var idDocumPubl = "";
var MyWidget = SuperWidget.extend({
    //variáveis da widget
    variavelNumerica: null,
    variavelCaracter: null,

    //método iniciado quando a widget é carregada
    init: function () {
        fnTokenBearer();
        fnDadosMIT();

        (function () {
            $('#btBusca').click(function () {
                alert('Cliquei')
            });
            var $rows = $('.table tr');
            $('#campFiltro').keyup(function () {
                var val = $.trim($(this).val()).replace(/ +/g, ' ').toLowerCase();

                $rows.show().filter(function () {
                    var text = $(this).text().replace(/\s+/g, ' ').toLowerCase();
                    return !~text.indexOf(val);
                }).hide();
            });
        })();
    },

    //BIND de eventos
    bindings: {
        local: {
            'execute': ['click_executeAction']
        },
        global: {}
    },

    executeAction: function (htmlElement, event) {
    }
});

function fnSelectAll(){
    var sel = document.getElementsByClassName('cbxSelect');
    if (document.getElementById('lblPrinc').checked == true) {
        for (var i = 0; i < sel.length; i++) {
            sel[i].checked = true;
        }
    }
    else {
        for (var i = 0; i < sel.length; i++) {
            sel[i].checked = false;
        }
    }
}

function fnTokenBearer() {
    var c1 = DatasetFactory.createConstraint('userName', "ataide.carlos+service@totvs.com.br", "ataide.carlos+service@totvs.com.br", ConstraintType.MUST);
    var c2 = DatasetFactory.createConstraint('password', "Hapkido@56", "Hapkido@56", ConstraintType.MUST);
    var c3 = DatasetFactory.createConstraint('userType', "1", "1", ConstraintType.MUST);
    var dsPostTokenBearer = DatasetFactory.getDataset('dsPostTokenBearer', null, new Array(c1, c2, c3), null);

    BearerToken = dsPostTokenBearer.values[0].Bearer1 +
        dsPostTokenBearer.values[0].Bearer2 +
        dsPostTokenBearer.values[0].Bearer3 +
        dsPostTokenBearer.values[0].Bearer4 +
        dsPostTokenBearer.values[0].Bearer5 +
        dsPostTokenBearer.values[0].Bearer6;
}

function fnDadosMIT() {
    var today = new Date();
    document.getElementById('codMatricula').value = WCMAPI.userCode;
    var c1 = DatasetFactory.createConstraint('colleaguePK.colleagueId', WCMAPI.userCode, WCMAPI.userCode, ConstraintType.MUST);
    var dsColleague = DatasetFactory.getDataset('colleague', null, new Array(c1), null);

    document.getElementById('nomCoord').value = dsColleague.values[0].colleagueName;
    document.getElementById('dtToday').value = setConvDataPT(today);

    var c1 = DatasetFactory.createConstraint('codMatricula', WCMAPI.userCode, WCMAPI.userCode, ConstraintType.MUST);
    var dsFormControleMits = DatasetFactory.getDataset('formControleMits', null, new Array(c1), null);

    var html = "";
    var codCliente = "";
    var nomCliente = "";

    for (var i = 0; i < dsFormControleMits.values.length; i++) {
        var c1 = DatasetFactory.createConstraint('codigo', dsFormControleMits.values[i].cod_client, dsFormControleMits.values[i].cod_client, ConstraintType.MUST);
        var c2 = DatasetFactory.createConstraint('loja', dsFormControleMits.values[i].loja, dsFormControleMits.values[i].loja, ConstraintType.MUST);
        var dsClienteProtheus = DatasetFactory.getDataset('dsClienteProtheus', null, new Array(c1, c2), null);

        /*var c1 = DatasetFactory.createConstraint('codigo_cliente', dsClienteProtheus.values[0].codigo, dsClienteProtheus.values[0].codigo, ConstraintType.MUST);
        var dsProjetosProtheus = DatasetFactory.getDataset('dsProjetosProtheus', null, new Array(c1), null);*/

        if (dsClienteProtheus.values.length > 0) {
            codCliente = dsClienteProtheus.values[0].codigo;
            nomCliente = dsClienteProtheus.values[0].nome;
        }

        var status = "Disponível";
        /*var c1 = DatasetFactory.createConstraint('id', dsFormControleMits.values[i].IdDocumSign, dsFormControleMits.values[i].IdDocumSign, ConstraintType.MUST);
        var dsIDStatusDocument = DatasetFactory.getDataset('dsIDStatusDocument', null, new Array(c1), null);

        if (dsIDStatusDocument.values.length > 0) {
            if (dsIDStatusDocument.values[0].status == "0")
                status = "Publicado";
            else if (dsIDStatusDocument.values[0].status == "1")
                status = "Pendente";
            else if (dsIDStatusDocument.values[0].status == "2")
                status = "Homologado";
            else
                status = "Disponível";
        }*/

        html += '<tr>' +
            '<td><input type="checkbox" class="cbxSelect" id="cbxSelect" name="cbxSelect___' + i + '" value="' + dsFormControleMits.values[i].documentid + '"></td>' +
            '<td>' + dsFormControleMits.values[i].projeto + '</td>' +
            '<td>' + dsFormControleMits.values[i].nm_projeto + '</td>' +
            '<td>' + codCliente + ' - ' + nomCliente + '</td>' +
            '<td>' + dsFormControleMits.values[i].nm_responsavel + '</td>' +
            '<td><button type="button" id="btLinkMIT___' + i + '" class="btn btn-link" onClick="fnListCliente(this);" value="' + dsFormControleMits.values[i].documentid + '">' + dsFormControleMits.values[i].controlMIT + '</button></td>' +
            '<td>' + status + '</td>' +
            '<td>' + dsFormControleMits.values[i].emailCliente + '</td>' +
            '</tr>';
    }
    document.getElementById("tbDadosMIT").innerHTML = html;
}

// Cadastro de MIT
function fnCloseOk() {
    var modal = document.getElementById('mdDocumMIT');
    setIncMIT();
    modal.style.display = "none";
    getEmpty();
    fnDadosMIT();
}

function fnCadMIT() {
    var modal = document.getElementById('mdDocumMIT');
    //alert(campoID.value);
    modal.style.display = "block";
}

function fnCloseDocumMIT() {
    var modal = document.getElementById('mdDocumMIT');
    modal.style.display = "none";
}

function fnListCliente(campo) {
    var mdTable = document.getElementById('mdTableTotvsSign');
    mdTable.style.display = "block";
    document.getElementById('codDocumID').value = campo.value;
}

function fnCloseMITTable() {
    var mdTable = document.getElementById('mdTableTotvsSign');
    mdTable.style.display = "none";
    fnCloseEmpty();
}

function fnCloseDocumSign() {
    var mdTotvsSign = document.getElementById('mdTotvsSign');
    mdTotvsSign.style.display = "none";
}

function fnCadCliente() {
    var mdTotvsSign = document.getElementById('mdTotvsSign');
    mdTotvsSign.style.display = "block";
}

function fnAdd() {
    var mdTotvsSign = document.getElementById('mdTotvsSign');
    var email = document.getElementById('emailTotvsSign').value;
    var nome = document.getElementById('nomeTotvsSign').value;
    var cpf = document.getElementById('cpfTotvsSign').value;
    var tel = document.getElementById('telTotvsSign').value;
    var pos = document.getElementById('posTotvsSign').value;
    var html = '<tr id="linha_' + email + '">' +
        '<td><button id="btDelLinha" class="btn btn-danger" value="' + email +'" onClick="fnDelEMail(this);">X</button></td>' +
        '<td><input type="text" class="emailTS" id="emailTS" name="emailTS" value="' + email + '" readonly></td>' +
        '<td><input type="text" class="nomeTS" id="nomeTS" name="nomeTS" value="' + nome + '" readonly></td>' +
        '<td><input type="text" class="cpfTS" id="cpfTS" name="cpfTS" value="' + cpf + '" readonly></td>' +
        '<td><input type="text" class="telTS" id="telTS" name="cpfTS" value="' + tel + '" readonly></td>' +
        '<td><input type="text" class="posTS" id="posTS" name="posTS" value="' + pos + '" readonly></td>' +
        '</tr>';
    document.getElementById("tbUserTotvsSign").innerHTML += html;
    mdTotvsSign.style.display = "none";
}

function fnDelEMail(campo){
    document.getElementById("linha_" + campo.value).innerHTML = "";
}

function fnCloseEmpty() {
    document.getElementById("tbUserTotvsSign").innerHTML = "";
}

function fnAddTotvsSign() {
    var classEMail = document.getElementsByClassName('emailTS');
    var classFullName = document.getElementsByClassName('nomeTS');
    var classCpf = document.getElementsByClassName('cpfTS');
    var classTel = document.getElementsByClassName('telTS');
    var classPos = document.getElementsByClassName('posTS');

    for (var i = 0; i < classEMail.length; i++) {
        fnRegistrar(classEMail[i].value,
            classFullName[i].value,
            classCpf[i].value,
            classTel[i].value,
            classPos[i].value);
    }
    fnUploadPDF();
    var mdTable = document.getElementById('mdTableTotvsSign');
    mdTable.style.display = "none";
}

function fnDel() {
    var classCkbSelect = document.getElementsByClassName('cbxSelect');

    for (var i = 0; i < classCkbSelect.length; i++) {
        if (classCkbSelect[i].checked == true) {
            var c1 = DatasetFactory.createConstraint('documentid', classCkbSelect[i].value, classCkbSelect[i].value, ConstraintType.MUST);
            var datasetFormControleMits = DatasetFactory.getDataset('formControleMits', null, new Array(c1), null);

            if (datasetFormControleMits.values[0].IdDocumSign == "0") {
                //fnDelete(classCkbSelect[i].value);
                var c1 = DatasetFactory.createConstraint('cardId', classCkbSelect[i].value, classCkbSelect[i].value, ConstraintType.MUST);
                var dsDeleteCard = DatasetFactory.getDataset('dsDeleteCard', null, new Array(c1), null);

                FLUIGC.toast({
                    title: "Sucesso",
                    message: 'Registro eliminado com sucesso.',
                    type: 'success',
                    timeout: 10000
                });
            }
            else {
                FLUIGC.toast({
                    title: "Erro",
                    message: 'O documento já foi para o Totvs Sign.',
                    type: 'danger',
                    timeout: 50000
                });
            }
        }
    }
    fnDadosMIT();
}

function fnDelete(idDocument) {
    var xml = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.dm.ecm.technology.totvs.com/">' +
        '<soapenv:Header />' +
        '<soapenv:Body>' +
        '<ws:deleteCard>' +
        '<companyId>1</companyId>' +
        '<username>admin</username>' +
        '<password>admin</password>' +
        '<cardId>' + idDocument + '</cardId>' +
        '</ws:deleteCard>' +
        '</soapenv:Body>' +
        '</soapenv:Envelope>';

    var wsUrl = WCMAPI.getServerURL() + "/webdesk/ECMCardService?wsdl";
    $.ajax({
        type: "POST",
        dataType: "xml",
        url: wsUrl,
        data: xml,
        crossDomain: true,
        success: function (data) {
            FLUIGC.toast({
                title: "Sucesso",
                message: 'Registro eliminado com sucesso.',
                type: 'success',
                timeout: 10000
            });
        },
        error: function (error) {
            FLUIGC.toast({
                title: "Erro na atualização",
                message: 'Verificar o problema na integração do ECMCardService.',
                type: 'danger',
                timeout: 50000
            });
            console.log("Resultado com erro da Aplicação = " + error);
        }
    });
}

function fnPublicTotvsSign() {
    var objJSON = JSON.parse(idDocumPubl);

    var tok = [{ "field": "IdDocumSign", "value": String(objJSON.data) }];
    var c1 = DatasetFactory.createConstraint('cardId', document.getElementById('codDocumID').value, document.getElementById('codDocumID').value, ConstraintType.MUST);
    var c2 = DatasetFactory.createConstraint('cardData', JSON.stringify(tok), JSON.stringify(tok), ConstraintType.MUST);
    var dsUpdateCardData = DatasetFactory.getDataset('dsUpdateCardData', null, new Array(c1, c2), null);

    FLUIGC.toast({
        title: "Sucesso",
        message: 'Ajuste realizado com sucesso.',
        type: 'success',
        timeout: 10000
    });

    fnCloseEmpty();
    fnDadosMIT();

    /*
    var xml = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.dm.ecm.technology.totvs.com/">' +
        '<soapenv:Header/>' +
        '<soapenv:Body>' +
        '<ws:updateCardData>' +
        '<companyId>1</companyId>' +
        '<username>admin</username>' +
        '<password>admin</password>' +
        '<cardId>' + document.getElementById('codDocumID').value + '</cardId>' +
        '<cardData>' +
        '<item>' +
        '<field>IdDocumSign</field>' +
        '<value>' + objJSON.data + '</value>' +
        '</item>' +
        '</cardData>' +
        '</ws:updateCardData>' +
        '</soapenv:Body>' +
        '</soapenv:Envelope>';

    var wsUrl = WCMAPI.getServerURL() + "/webdesk/ECMCardService?wsdl";
    $.ajax({
        type: "POST",
        dataType: "xml",
        url: wsUrl,
        data: xml,
        crossDomain: true,
        success: function (data) {
            FLUIGC.toast({
                title: "Sucesso",
                message: 'Ajuste realizado com sucesso.',
                type: 'success',
                timeout: 10000
            });
        },
        error: function (error) {
            FLUIGC.toast({
                title: "Erro na atualização",
                message: 'Verificar o problema na integração do ECMCardService.',
                type: 'danger',
                timeout: 50000
            });
            console.log("Resultado com erro da Aplicação = " + error);
        }
    });
    */
    getEmpty();
}

window.onclick = function (event) {
    var modal = document.getElementById('mdDocumMIT');
    var mdSign = document.getElementById('mdTotvsSign');

    if (event.target == modal) {
        modal.style.display = 'none';
    }
    if (event.target == mdSign) {
        mdSign.style.display = 'none';
    }
}

function fnMIT(value) {
    if (value == "MIT") {
        document.getElementById('devControlMIT').style.display = "inline";
    }
    else {
        document.getElementById('devControlMIT').style.display = "none";
    }
}

function getEmpty() {
    document.getElementById('cod_client').value = "";
    document.getElementById('nm_client').value = "";
    document.getElementById('projeto').value = "";
    document.getElementById('nm_projeto').value = "";
    document.getElementById('nm_responsavel').value = "";
    document.getElementById('emailCliente').value = "";
    document.getElementById('loja').value = "";
    document.getElementById('tipoProjetoP').checked = true;
    document.getElementById('controlMIT').value = "";

    document.getElementById('emailTotvsSign').value = "";
    document.getElementById('nomeTotvsSign').value = "";
    document.getElementById('cpfTotvsSign').value = "";
    document.getElementById('telTotvsSign').value = "";
    document.getElementById('posTotvsSign').value = "";
    document.getElementById('codDocumID').value = "";
}

function setIncMIT() {
    var mitDocum = "";
    var mitP = new Array();
    mitP[0] = "MIT032 - CRONOGRAMA DO PROJETO";
    mitP[1] = "MIT005 - ATA DE REUNIAO";
    mitP[2] = "MIT041 - ESPECIFICACAO DE PROCESSOS";
    mitP[3] = "MIT008 - STATUS REPORT";
    mitP[4] = "MIT010 - VALIDACAO DE PROCESSOS";
    mitP[5] = "MIT062 - CERTIFICADO DE CONCLUSÃO";

    var mitM = new Array();
    mitM[0] = "MIT032 - CRONOGRAMA DO PROJETO";
    mitM[1] = "MIT021 - TERMO DE ABERTURA";
    mitM[2] = "MIT005 - ATA DE REUNIAO";
    mitM[3] = "MIT025 - CHECK LIST SIZING";
    mitM[4] = "MIT041 - ESPECIFICACAO DE PROCESSOS";
    mitM[5] = "MIT042 - FLUXOGRAMA DO PROCESSO";
    mitM[6] = "MIT008 - STATUS REPORT";
    mitM[7] = "MIT010 - VALIDACAO DE PROCESSOS";
    mitM[8] = "MIT061 - AUTORIZAÇÃO PARA GO LIVE";
    mitM[9] = "MIT046 - ANALISE DE GAP";
    mitM[10] = "MIT044 - ESPECIFICACAO DE PERSONALIZACAO";

    var mitG = new Array();
    mitG[0] = "MIT032 - CRONOGRAMA DO PROJETO";
    mitG[1] = "MIT021 - TERMO DE ABERTURA";
    mitG[2] = "MIT024 - APRESENTACAO ABERTURA DO PROJETO";
    mitG[3] = "MIT025 - CHECK LIST SIZING";
    mitG[4] = "MIT034 - MATRIZ DE RESPONSABILIDADE";
    mitG[5] = "MIT035 - MATRIZ DE COMUNICACAO";
    mitG[6] = "MIT036 - MATRIZ DE RISCOS";
    mitG[7] = "MIT041 - ESPECIFICACAO DE PROCESSOS";
    mitG[8] = "MIT042 - FLUXOGRAMA DO PROCESSO";
    mitG[9] = "MIT046 - ANALISE DE GAP";
    mitG[10] = "MIT005 - ATA DE REUNIAO";
    mitG[11] = "MIT008 - STATUS REPORT";
    mitG[12] = "MIT043 - ESPECIFICACAO DE PARAMETRIZACAO";
    mitG[13] = "MIT044 - ESPECIFICACAO DE PERSONALIZACAO";
    mitG[14] = "MIT010 - VALIDACAO DE PROCESSOS";
    mitG[15] = "MIT006 - LISTA DE TAREFAS E PENDENCIAS";
    mitG[16] = "MIT037 - PLANO DE TREINAMENTO";
    mitG[17] = "MIT038 - ESTRATÉGIA DE CONVERSÃO";
    mitG[18] = "MIT045 - ROTEIRO DE TESTES";
    mitG[19] = "MIT061 - AUTORIZAÇÃO PARA GO LIVE";
    mitG[20] = "MIT062 - CERTIFICADO DE CONCLUSÃO";

    var qtProjeto = 0;
    var tipo = "";
    if (document.getElementById('tipoProjetoP').checked == true) {
        qtProjeto = mitP.length;
        tipo = "P";
    }
    else if (document.getElementById('tipoProjetoM').checked == true) {
        qtProjeto = mitM.length;
        tipo = "M";
    }
    else if (document.getElementById('tipoProjetoG').checked == true) {
        qtProjeto = mitG.length;
        tipo = "G";
    }
    else {
        qtProjeto = 1;
        tipo = "MIT";
    }

    for (var i = 0; i < qtProjeto; i++) {
        if (tipo == "MIT")
            mitDocum = document.getElementById('controlMIT').value;
        else if (tipo == "P")
            mitDocum = mitP[i];
        else if (tipo == "M")
            mitDocum = mitM[i];
        else if (tipo == "G")
            mitDocum = mitG[i];

        var xml = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.dm.ecm.technology.totvs.com/">' +
            '<soapenv:Header/>' +
            '<soapenv:Body>' +
            '<ws:create>' +
            '<companyId>1</companyId>' +
            '<username>admin</username>' +
            '<password>!Senha@2020!</password>' +
            '<card>' +
            '<item>' +
            '<attachs/>' +
            '<cardData>' +
            '<field>cod_client</field>' +
            '<value>' + document.getElementById('cod_client').value + '</value>' +
            '</cardData>1' +
            '<cardData>' +
            '<field>nm_client</field>' +
            '<value>' + document.getElementById('nm_client').value + '</value>' +
            '</cardData>1' +
            '<cardData>' +
            '<field>projeto</field>' +
            '<value>' + document.getElementById('projeto').value + '</value>' +
            '</cardData>1' +
            '<cardData>' +
            '<field>nm_projeto</field>' +
            '<value>' + document.getElementById('nm_projeto').value + '</value>' +
            '</cardData>1' +
            '<cardData>' +
            '<field>nm_responsavel</field>' +
            '<value>' + document.getElementById('nm_responsavel').value + '</value>' +
            '</cardData>1' +
            '<cardData>' +
            '<field>emailCliente</field>' +
            '<value>' + document.getElementById('emailCliente').value + '</value>' +
            '</cardData>1' +
            '<cardData>' +
            '<field>controlMIT</field>' +
            '<value>' + mitDocum + '</value>' +
            '</cardData>1' +
            '<cardData>' +
            '<field>loja</field>' +
            '<value>' + document.getElementById('loja').value + '</value>' +
            '</cardData>1' +
            '<cardData>' +
            '<field>codMatricula</field>' +
            '<value>' + document.getElementById('codMatricula').value + '</value>' +
            '</cardData>1' +
            '<cardData>' +
            '<field>tipoProjeto</field>' +
            '<value>' + tipo + '</value>' +
            '</cardData>1' +
            '<cardData>' +
            '<field>IdDocumSign</field>' +
            '<value>0</value>' +
            '</cardData>1' +
            '<colleagueId>'+WCMAPI.userCode+'</colleagueId>' +
            '<docapprovers />' +
            '<docsecurity />' +
            '<expires>false</expires>' +
            '<parentDocumentId>203899</parentDocumentId>' +
            '<reldocs />' +
            '</item>' +
            '</card>' +
            '</ws:create>' +
            '</soapenv:Body>' +
            '</soapenv:Envelope>';

        var wsUrl = WCMAPI.getServerURL() + "/webdesk/ECMCardService?wsdl";
        $.ajax({
            type: "POST",
            dataType: "xml",
            url: wsUrl,
            data: xml,
            crossDomain: true,
            success: function (data) {
                FLUIGC.toast({
                    title: "Sucesso",
                    message: 'Projeto cadastrado com sucesso. Relação das MITs de acordo com o tamanho do projeto selecionado.',
                    type: 'success',
                    timeout: 10000
                });
                /*var stringXML = new XMLSerializer().serializeToString(data);
                var codProcesso = [];
                var i = 0;*/

                /*
                $(stringXML).find('item').each(function () {
                    codProcesso[i] = $(this).text();
                    console.log("Matriz cliente [" + i + "] = " + codProcesso[i]);
                    i++;
                });
                */
            },
            error: function (error) {
                FLUIGC.toast({
                    title: "Erro ao adicionar a documentação",
                    message: 'Verificar o problema na integração do ECMCardService.',
                    type: 'danger',
                    timeout: 50000
                });
                console.log("Resultado com erro da Aplicação = " + error);
            }
        });
    }
}

function fnRegistrar(email, fullName, cpf, tel, pos) {
    var c1 = DatasetFactory.createConstraint('metadata#active', 'true', 'true', ConstraintType.MUST);
    var c2 = DatasetFactory.createConstraint('ambTotvsSign', '01', '01', ConstraintType.MUST);
    var c3 = DatasetFactory.createConstraint('unidade', '01', '01', ConstraintType.MUST);
    var dsFormUsuariosTotvsSign = DatasetFactory.getDataset('formUsuariosTotvsSign', null, new Array(c1, c2, c3), null);

    var settings = {
        "url": "https://totvssign.dev.totvs.app/identityintegration/api/users/register",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json",
            "Authorization": BearerToken
        },
        "data": JSON.stringify({
            "email": email,
            "password": "Totvs@123",
            "fullName": fullName,
            "cpf": cpf,
            "userType": 1,
            "changePassword": false,
            "cnpjLicensedCompany": String(dsFormUsuariosTotvsSign.values[0].cnpjTotvsSign),
            "phoneNumber": tel,
            "position": pos,
            "acceptedTerm": true
        }),
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
        FLUIGC.toast({
            title: 'Registrar novo usuário: ',
            message: 'Dados do novo usuário cadastrado com sucesso',
            type: 'success'
        });
        //fnUploadPDF();
    }).fail(function (errMac) {
        FLUIGC.toast({
            title: 'Registrar novo usuário: ',
            message: 'Atenção! O usuário pode está registrado no Totvs Sign, o mesmo seguirá com o upload do arquivo',
            type: 'warning'
        });
        console.log("Error: " + errMac.responseText);
        //fnUploadPDF();
    }).always(function (execAll) {
        console.log("Always: " + execAll);
    });
}

function fnUploadPDF() {
    var form = new FormData($('#formPDF').get(0));
    form.append("file", $('input[type=file]')[0].files[0], $('input[type=file]')[0].files[0].name);

    var settings = {
        "url": "https://totvssign.dev.totvs.app/storage/api/Storage",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Authorization": BearerToken
        },
        "processData": false,
        "mimeType": "multipart/form-data",
        "contentType": false,
        "data": form
    };

    $.ajax(settings).done(function (response) {
        idDocumPubl = String(response);
        FLUIGC.toast({
            title: 'Upload PDF: ',
            message: 'Upload do contrato PDF realizado com sucesso no Totvs Sign, aguarde a publicação',
            type: 'success'
        });
        fnPublicacao();
    }).fail(function (errMac) {
        FLUIGC.toast({
            title: 'Upload PDF: ',
            message: 'Erros ao realizar upload do arquivo: ' + errMac.responseText,
            type: 'danger'
        });
        console.log("Error: " + errMac.responseText);
    }).always(function (execAll) {
        console.log("fnUploadPDF(): Upload de arquivo para o Totvs Sign realizado com sucesso ! ID do documento: " + execAll);
    });
}

function fnPublicacao() {
    console.log("=========@@@@@@=#####=====> " + idDocumPubl);
    var objJSON = JSON.parse(idDocumPubl);
    var objDataJSON = getTableValue();

    var settings = {
        "url": "https://totvssign.dev.totvs.app/signintegration/v2/Publicacoes",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json",
            "Authorization": BearerToken
        },
        "data": JSON.stringify({
            "idDocumento": objJSON.data,
            "destinatarios": objDataJSON,
            "utilizaWorkflow": false,
            "responsavelAssinaDocumento": false,
            "assinaturaResponsavel": {
                "id": 0,
                "idDocumento": 0,
                "enderecoIp": "string",
                "enderecoIpV6": "string",
                "tipoDeAssinatura": 0
            },
            "enderecoIp": "string"
        }),
    };

    $.ajax(settings).done(function (response) {
        FLUIGC.toast({
            title: 'Publicação: ',
            message: 'Contrato enviado com sucesso aos seus destinatários. Aguardando assinatura!',
            type: 'success'
        });
        console.log(response);
        fnPublicTotvsSign();
    }).fail(function (errMac) {
        FLUIGC.toast({
            title: 'Publicação: ',
            message: 'Erro no envio ao destinatário: ' + errMac.responseText,
            type: 'danger'
        });
        console.log("Error: " + errMac.responseText)
    }).always(function (execAll) {
        console.log("Always: " + execAll);
    });
}

function getTableValue() {
    var strJSON = new Array();
    var classEMail = document.getElementsByClassName('emailTS');

    for (var i = 0; i < classEMail.length; i++) {
        strJSON[i] = { email: String(classEMail[i].value), acao: 0, workflow: 0 };
    }

    return strJSON;
}

function setConvDataPT(data) {
    var dtStr = new Date(data);
    var dia, mes, ano;

    dia = String(dtStr.getDate());
    if (dtStr.getDate() < 10) {
        dia = "0" + String(dtStr.getDate());
    }
    mes = String(dtStr.getMonth() + 1);
    if ((dtStr.getMonth() + 1) < 10) {
        mes = "0" + String(dtStr.getMonth() + 1);
    }
    return dia + "/" + mes + "/" + String(dtStr.getFullYear());
}