const express = require('express')
const vendor = express.Router()

const {
    Vendors
  } = require('../db')
  
vendor.get('/', async (req, res) => {
    const vendors = await Vendors.findAll()
    res.send(vendors)
  })

  vendor.post('/', async (req, res) => {
    try {
      const result = await Vendors.create({
        name: req.body.name
      })
      res.send({ success: true })
    } catch (e) {
      res.send({ success: false, err: e.message })
    }

  })

  vendor.delete('/:id', async (req, res) => {
    console.log("entered into delete");
    //console.log(body.req.id);
    try {
      Vendors.destroy({
        where: {
          id: req.params.id
        }
      })
      res.send({ success: true })
    }
    catch (e) {
      res.send({ success: false, err: e.message })
    }

  })

  module.exports = vendor