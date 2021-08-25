$(document).ready(function(){

     //Filtar tabela
     var $rows = $('#tabela1 tr');
     $('#campFiltro').keyup(function() {
         var val = $.trim($(this).val()).replace(/ +/g, ' ').toLowerCase();
         
         $rows.show().filter(function() {
             var text = $(this).text().replace(/\s+/g, ' ').toLowerCase();
             return !~text.indexOf(val);
         }).hide();
     });

    // selaciona todos o checkbox
    $("#chk_tabela1").on("click", function(){
        let sel = document.getElementsByClassName('cbxSelect');
        if (document.getElementById('chk_tabela1').checked == true) {
            for (var i = 0; i < sel.length; i++) {
                sel[i].checked = true;
            }
        }
        else {
            for (let i = 0; i < sel.length; i++) {
                sel[i].checked = false;
            }
        }
    })

    // checbox botão excluir
    $('input[type="checkbox"]').on('click touchstart', function(){
        let quantCheck = $('input[type="checkbox"]:checked').length;
        if(quantCheck != 0) {
            $('#btExcluir').css('display', 'inline')
        } 
        else {
            $('#btExcluir').css('display', 'none')
        }
    });
    
})

function msgValidar(){
   FLUIGC.message.alert({
        message: 'Selecione ou preencha o campo indicado e tente enviar novamente.',
        title: 'Campo não preenchido ou selecionado',
        label: 'OK'
    });
}

function bordas(){
    
    $("#codigo").css({"border-color" : "#CCCCCC", "padding": "2px"})
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
}

function formatarMoeda(elemento){

    let valor = elemento.value;

    valor = valor + '';
    valor = parseInt(valor.replace(/[\D]+/g, ''));
    valor = valor + '';
    valor = valor.replace(/([0-9]{2})$/g, ",$1");

    if (valor.length > 6) {
        valor = valor.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
    }

    elemento.value = valor;
    if(valor == 'NaN') elemento.value = '';

}

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

  