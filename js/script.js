// ========== variaveis pelos campos da página ==============
const currencyEl_one = document.getElementById("currency-one");
const amountEl_one = document.getElementById("amount-one");
const currencyEl_two = document.getElementById("currency-two");
const amountEl_two = document.getElementById("amount-two");
const rateEl = document.getElementById("rate");
const swap = document.getElementById("swap");
const button = document.getElementById("send");
const name = document.getElementById("name");
const prefix_one = document.getElementById("currency-one");

// Converter a moeda
function calculate() {
  const currency_one = currencyEl_one.value;
  const currency_two = currencyEl_two.value;
  
  fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`)
    .then((res) => res.json())
    .then((data) => {
      const rate = data.rates[currency_two];
      rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;
      amountEl_two.value = ((amountEl_one.value * rate) * 1.1).toFixed(2);
    });
}

function relatorio(){
  // =========== Data atual =====================
  var data = new Date(),
      dia  = data.getDate().toString(),
      diaF = (dia.length == 1) ? '0'+dia : dia,
      mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
      mesF = (mes.length == 1) ? '0'+mes : mes,
      anoF = data.getFullYear();

  //  =========== Adicionar o prefixo ==============
  coin_one = document.getElementById("currency-one");
  coin_two = document.getElementById("currency-two");

  if(coin_one.value == "BRL"){
    var prefix_one = "R$";
  }else if(coin_one.value == "USD"){
    var prefix_one = "$";
  }

  if(coin_two.value == "BRL"){
    var prefix_two = "R$";
  }else if(coin_two.value == "USD"){
    var prefix_two = "$";
  }
  var  value_one = prefix_one.concat(amountEl_one.value);
  var value_two = prefix_two.concat(amountEl_two.value);
  const taxa = (amountEl_one.value * 0.1);
  
  var doc = new jsPDF()
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.text("Relatório", 105, 10, null, null, "center");

    //=============== Gerando o PDF =============================
  doc.setFontSize(16);
  doc.setFont("helvetica", "normal");
  doc.text("Nome: " + name.value, 10, 30);
  doc.text("Valor a ser convertido: ",  10, 50);
  doc.text(value_one, 80, 50);
  doc.text("Moeda de entrada: " + currencyEl_one.value, 145, 50);
  doc.text("Valor Após a conversão: ", 10, 70);
  doc.text(value_two, 80, 70)
  doc.text("Moeda de saída: " + currencyEl_two.value, 145, 70);
  doc.text("Taxa cobrada: " + taxa.toFixed(2), 10, 90);
  doc.text("Data da operação: " + diaF + '/'+ mesF + '/' + anoF, 10, 100);
  doc.save('A4.pdf');
  }

// Event listeners
currencyEl_one.addEventListener("change", calculate);
amountEl_one.addEventListener("input", calculate);
currencyEl_two.addEventListener("change", calculate);
amountEl_two.addEventListener("input", calculate);
if (button != null){
  button.addEventListener("click", relatorio);
}

//limitar o swap
swap.addEventListener("click", function(event){
  event.preventDefault("send");
});

// Botão swap
swap.addEventListener("click", () => {
  const temp = currencyEl_one.value;
  currencyEl_one.value = currencyEl_two.value;
  currencyEl_two.value = temp;
  calculate();
});
calculate();



