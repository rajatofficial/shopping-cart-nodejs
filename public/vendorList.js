$(() => {
    function refreshList() {
      $.get('/vendors', (data) => {
        $('#vendorlist').empty()

        console.log(1);
        for (let vendor of data) {
          $('#vendorlist').append(
            `<li> Vendor: ${vendor.name} <button onclick="$.ajax({  
              url: '/vendors/${vendor.id}',  
              type: 'DELETE',
              success: function (data) {  
                  console.log(data.success)
              } 
          });window.location.reload()">Delete</button></li>`
          )
 // console.log(1);
        }
      })
    }
  
    refreshList()
    // $('#ProductButton').click(() => 
    // {
    //   window.location.href(__dirname+'/product.html')
    // })
    $('#AddVendor').click(() => {
      $.post(
        '/vendors',
        {
          name: $('#vendorName').val()
        },
        (data) => {
          if (data.success) {
            console.log(data.success)
            refreshList()
          }
        }
      )
    })

  

  })
  