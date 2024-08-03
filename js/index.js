async function getData(id) {
  const baseUrl = `http://localhost:8001/api/v1/coin?id=${id}`;
  try {
      let res = await fetch(baseUrl);
      if (!res.ok) {
          throw new Error(res.statusText || res.status);
      }
      let data = await res.json();
      return data;
  } catch (err) {
      console.error(err);
      alert("Произошла ошибка...");
  }
}

$(document).ready(function () {
  const minAmount = 50
  let currencyId = 0

  async function calc (amount, currencyId) {
    const cryptoCurrency = { id: 0, price: 0, proccent: 1.3};
    const cryptoData = await getData(currencyId);
    cryptoCurrency.price = cryptoData.data[0].price

    const totalPrice = amount * (cryptoCurrency.price * cryptoCurrency.proccent)

    $("#amount-send").val(amount);
    $("#amount-receive").val(Number((totalPrice).toFixed(1)));
  }

  $(".currency__item-block").click(function () {
    currencyId = $(this).data("id");

    calc(minAmount, currencyId)
  });

  $('#amount-send').on('input', function () {
    let curVal = parseFloat($(this).val())
    if (curVal > 0) {
      calc (curVal, currencyId)
    } else {
      console.log ("Input error")
    }
  })


  $('._currency-active').first().trigger('click')

});
