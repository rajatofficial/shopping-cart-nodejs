const express = require('express')

const productRoute = require('./routes/productRoute')
//const userRoutes = require('./routes/userRoute')
//const cartRoute = require('./routes/cartRoute')
const vendorRoutes = require('./routes/vendorRoute')


const {
  db,
  Cart,
  Products,
  Users,
  Vendors
} = require('./db')

var session = null;

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/',
  express.static(__dirname + '/public')
)

app.post('/users', async (req, res) => {
  console.log("users area intiated!!")
  try {
    console.log("user zone");
    const result1 = await Users.create({
      name: req.body.name
    })
    if (req.body.name != null) {
      session = req.body.name

    }
    res.send({ success: true })
  } catch (e) {
    res.send({ success: false, err: e.message })
  }
})

app.use('/vendors',vendorRoutes)



app.use('/products',productRoute)


// app.use('/users',userRoutes)


app.post('/cart', async (req, res) => {
  try {
    if (session == null) {
      throw new Error("User not Logged In!")
    }
    else {
      console.log("cart entered")
      // find product already exist in  cart
      const productCnt = await Cart.count({where : {productId : req.body.productId, userName:session}})
      console.log("product count is: "+productCnt)
      if (productCnt == 0) {
        console.log("product count inner is: "+productCnt)
        await Cart.create({
          productId : req.body.productId,
          productQuantity : 1,
          userName : session
        })
      } else {
        console.log("product count else is: "+productCnt)
        await Cart.increment('productQuantity',{where : {productId : req.body.productId, userName:session}})
      }

      // if exist then increament
      // else create with quanity=1

      res.send({ success: true })
    }
  } catch (e) {
    res.send({ success: false, err: e.message })
  }
})

app.get('/mycart', async (req, res) => {
  try {
    if(session == null)
    {
      throw new Error("User not Logged In!")
    }
    else {
      // const prods = await Cart.findAll({ where: { userName: session } })
      // res.send(prods)
      ; (async () => {
        console.log('cart entered hellaa')
        const products = await Cart.findAll({
          include: [
            {
              model: Products,
              include: [Vendors]
            }
          ]
        }
        )
        res.send(products)
     
      })();
    }
  } catch (e) {
    res.send({success:false, error:e.message})
  }
})


// app.use('/mycart',cartRoute)
const PORT  = process.env.PORT || 8811
db.sync()
  .then(() => {

    app.listen(PORT)
  })

