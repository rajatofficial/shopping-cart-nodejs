


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
      
        for (let item of data) {
          $('#cartTable').append(
            `
            <tr>
            <td>item: ${item.product.productName}</td>
            <td>vendor: ${item.product.vendor.name}</td>
            <td>qty: ${item.productQuantity}</td>
            </tr>
            `
          )
        }
      }
    })
  }
  cartFunction()
  
   



})