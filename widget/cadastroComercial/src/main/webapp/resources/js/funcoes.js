function msgValidar(){
   FLUIGC.message.alert({
        message: 'Selecione ou preencha o campo indicado e tente enviar novamente.',
        title: 'Campo não preenchido ou selecionado',
        label: 'OK'
    });
}

function moeda(a, e, r, t) {
    let n = ""
      , h = j = 0
      , u = tamanho2 = 0
      , l = ajd2 = ""
      , o = window.Event ? t.which : t.keyCode;
    if (13 == o || 8 == o)
        return !0;
    if (n = String.fromCharCode(o),
    -1 == "0123456789".indexOf(n))
        return !1;
    for (u = a.value.length,
    h = 0; h < u && ("0" == a.value.charAt(h) || a.value.charAt(h) == r); h++)
        ;
    for (l = ""; h < u; h++)
        -1 != "0123456789".indexOf(a.value.charAt(h)) && (l += a.value.charAt(h));
    if (l += n,
    0 == (u = l.length) && (a.value = ""),
    1 == u && (a.value = "0" + r + "0" + l),
    2 == u && (a.value = "0" + r + l),
    u > 2) {
        for (ajd2 = "",
        j = 0,
        h = u - 3; h >= 0; h--)
            3 == j && (ajd2 += e,
            j = 0),
            ajd2 += l.charAt(h),
            j++;
        for (a.value = "",
        tamanho2 = ajd2.length,
        h = tamanho2 - 1; h >= 0; h--)
            a.value += ajd2.charAt(h);
        a.value += r + l.substr(u - 2, u)
    }
    return !1
}

// function formatarMoeda(elemento){

//     let valor = elemento.value;

//     valor = valor + '';
//     valor = parseInt(valor.replace(/[\D]+/g, ''));
//     valor = valor + '';
//     valor = valor.replace(/([0-9]{2})$/g, ",$1");

//     if (valor.length > 6) {
//         valor = valor.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
//     }

//     elemento.value = valor;
//     if(valor == 'NaN') elemento.value = '';

// }

function mascaraMutuario(o,f){
    v_obj=o
    v_fun=f
    setTimeout('execmascara()',1)
}
 
function execmascara(){
    v_obj.value=v_fun(v_obj.value)
}
 
function cpfCnpj(v){

    //Remove tudo o que não é dígito
    v=v.replace(/\D/g,"")
        //Coloca ponto entre o segundo e o terceiro dígitos
        v=v.replace(/^(\d{2})(\d)/,"$1.$2")
        //Coloca ponto entre o quinto e o sexto dígitos
        v=v.replace(/^(\d{2})\.(\d{3})(\d)/,"$1.$2.$3")
        //Coloca uma barra entre o oitavo e o nono dígitos
        v=v.replace(/\.(\d{3})(\d)/,".$1/$2")
        //Coloca um hífen depois do bloco de quatro dígitos
        v=v.replace(/(\d{4})(\d)/,"$1-$2")
 
    return v
}

function mask(o, f) {
    setTimeout(function() {
      let v = mphone(o.value);
      if (v != o.value) {
        o.value = v;
      }
    }, 1);
}
  
function mphone(v) {
    let r = v.replace(/\D/g, "");
    r = r.replace(/^0/, "");
    if (r.length > 10) {
        r = r.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");
    } else if (r.length > 5) {
        r = r.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, "($1) $2-$3");
    } else if (r.length > 2) {
        r = r.replace(/^(\d\d)(\d{0,5})/, "($1) $2");
    } else {
        r = r.replace(/^(\d*)/, "($1");
    }
    return r;
}

function clearValue() {

    const clearInput = ""
    const clearSelect = "SELECIONE"

    $("#unidade").val(clearSelect)
    // $("#codigo").val(clearInput)
    $("#cnpj").val(clearInput)
    $("#empresa").val(clearInput)
    $("#telefone").val(clearInput)
    $("#contato").val(clearInput)
    $("#setor").val(clearInput)
    $("#email").val(clearInput)
    $("#entidade").val(clearSelect)
    $("#origem").val(clearSelect)
    $("#cidade").val(clearInput)
    $("#segmento").val(clearSelect)
    $("#esn").val(clearInput)
    $("#workArea").val(clearInput)  
    $("#produto").val(clearSelect)  
    $("#modalidade").val(clearSelect)  
    $("#solucoes").val(clearSelect)  
    $("#estagio").val(clearSelect)  
    $("#estagioStatus1").val(clearSelect)  
    $("#dataPrevisao").val(clearInput)  
    $("#cduAdesao").val(clearInput)  
    $("#saas").val(clearSelect)  
    $("#mensalidade").val(clearInput)  
    $("#servico").val(clearInput)  
    $("#observacoes").val(clearInput) 
    $("#outros").val(clearInput)
    $("#quantHoras").val(clearInput)  
    $("#valorHora").val(clearInput) 
    $("#totalServico").val(clearInput)  

}

function bordas(){
    
    // $("#codigo").css({"border-color" : "#CCCCCC", "padding": "2px"})
    $("#cnpj").css({"border-color" : "#CCCCCC", "padding": "2px"})
    $("#empresa").css({"border-color" : "#CCCCCC", "padding": "2px"})
    $("#telefone").css({"border-color" : "#CCCCCC", "padding": "2px"})
    $("#contato").css({"border-color" : "#CCCCCC", "padding": "2px"})
    $("#setor").css({"border-color" : "#CCCCCC", "padding": "2px"})
    $("#email").css({"border-color" : "#CCCCCC", "padding": "2px"})
    $("#dataPrevisao").css({"border-color" : "#CCCCCC", "padding": "2px"})
    $("#cduAdesao").css({"border-color" : "#CCCCCC", "padding": "2px"})
    $("#servico").css({"border-color" : "#CCCCCC", "padding": "2px"})
    $("#workArea").css({"border-color" : "#CCCCCC", "padding": "2px"})
    $("#unidade").css({"border-color" : "#CCCCCC", "padding": "2px"})
    $("#entidade").css({"border-color" : "#CCCCCC", "padding": "2px"})
    $("#cidade").css({"border-color" : "#CCCCCC", "padding": "2px"})
    $("#segmento").css({"border-color" : "#CCCCCC", "padding": "2px"})
    $("#esn").css({"border-color" : "#CCCCCC", "padding": "2px"})
    $("#produto").css({"border-color" : "#CCCCCC", "padding": "2px"})
    $("#modalidade").css({"border-color" : "#CCCCCC", "padding": "2px"})
    $("#solucoes").css({"border-color" : "#CCCCCC", "padding": "2px"})
    $("#estagioStatus2").css({"border-color" : "#CCCCCC", "padding": "2px"})
    $("#saas").css({"border-color" : "#CCCCCC", "padding": "2px"})
    $("#origem").css({"border-color" : "#CCCCCC", "padding": "2px"})
    $("#outros").css({"border-color" : "#CCCCCC", "padding": "2px"})
    $("#estagioStatus1").css({"border-color" : "#CCCCCC", "padding": "2px"})
    $("#mensalidade").css({"border-color" : "#CCCCCC", "padding": "2px"})
    $("#quantHoras").css({"border-color" : "#CCCCCC", "padding": "2px"})
    $("#valorHora").css({"border-color" : "#CCCCCC", "padding": "2px"})
    $("#totalServico").css({"border-color" : "#CCCCCC", "padding": "2px"})
}



/*$(document).ready(function(){})*/