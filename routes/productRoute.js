const express = require('express')

const productRoute = express.Router()

const {
    Products
  } = require('../db')

productRoute.get('/', async (req, res) => {
    const products = await Products.findAll()
    res.send(products)
  })
  
productRoute.post('/', async (req, res) => {
    console.log(req.body);
    try {
      const result1 = await Products.create({
        productName: req.body.name,
        productPrice: req.body.price,
        productQuantity: req.body.quantity,
        vendorId: req.body.vendorId
      })
      res.send({ success: true })
    } catch (e) {
      res.send({ success: false, err: e.message })
    }
  })

  module.exports = productRoute