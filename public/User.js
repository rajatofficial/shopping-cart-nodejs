$(() => {
    function refreshList() {
      $.get('/products', (data) => {
        $('#uproductlist').empty()

        for(let product of data) {
          $('#uproductlist').append(
            ` <li> Product: ${product.productName}
             Price: ${product.productPrice} 
             Quantity: ${product.productQuantity} <button onclick="
             $.post('/cart',{
                quantity:${1},
                productId:${product.id}
            })
             ">Add To Cart</button></li ><br>`
          )
        }
      }
    )
    }
    refreshList()

    $('#loginButton').click(() => {
        $.post(
          '/users',
          {
            name: $('#username').val()
          },
          (data) => {
            if (data.success) {
              console.log(data.success)
            }
          }
        )
      })
      $('#myCart').click(() => {
        console.log("my cart is clciked");
        console.log("localhost:8811/myCart.html");
        window.location.href = "//localhost:8811/myCart.html";
      })
})