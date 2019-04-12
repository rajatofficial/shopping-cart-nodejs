$(() => {
  
  function selectList() {
    $.get('/vendors', (data) => {
      console.log("vendors")
      
      for(let dt of data)
      {
        //console.log(dt.vendorId)
        $('#vendors').append(`<option value="${dt.id}">
        ${dt.name}
        </option>`);
      }
      })
  }
selectList()

 
    function refreshList() {
      $.get('/products', (data) => {
        $('#productlist').empty()

        // console.log(1);
        for (let product of data) {
          $('#productTable').append(
            ` <tr> 
            <td>Product: ${product.productName}</td>
            <td> Price: ${product.productPrice}</td>
             <td>Quantity: ${product.productQuantity}</td>
             </tr>`
          )
        }
      })
    }

    refreshList()
    $('#AddProduct').click(() => {
     // console.log("vendor id is : " + $('#vendors :selected').val());
      $.post(
        '/products',
        {
          name: $('#productName').val(),
          price: $('#productPrice').val(),
          quantity: $('#productQuantity').val(),
          vendorId:$('#vendors').val()
        },
        (data) => {
          console.log(data)
          if (data.success) {
            console.log(data.success)
            refreshList()
          }
        }
      )
    })
  })


