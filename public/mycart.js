


$(() => {
  
  function cartFunction() {
    $.get('/mycart', (data) => {

      $('#cartlist').empty()
      if (data.success == false) {
        console.log(data)
        alert(data.error)
      }
      else {
        console.log("hellossss");
        console.log(data)
        var net=0;
        var sum=0;
        for (let item of data) {
          net = item.product.productPrice*item.productQuantity;
          sum=item.product.productPrice*item.productQuantity+sum;
          $('#cartTable').append(
            `
            <tr>
            <td> ${item.product.productName}</td>
            <td> ${item.product.vendor.name}</td>
            <td> ${item.productQuantity}</td>
            <td>${net}</td>
            </tr>
            `
          )
          
        }
        $('#sum').append(`<h3>Total: ${sum}</h3>`)
      }
    })
  }
  cartFunction()
  
   



})