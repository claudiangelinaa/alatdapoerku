const express = require('express')
const Router = express.Router()

// import controller
const productController = require('../controller/productController')
const { jwtVerify } = require('../middleware/jwt')

Router.get('/get-all-products', jwtVerify ,productController.getAllProducts)
Router.post('/add-product', jwtVerify, productController.addProduct)
Router.patch('/edit-product/:idProduct', jwtVerify, productController.editProduct)
Router.delete('/delete-product/:idProduct', jwtVerify, productController.deleteProduct)

module.exports = Router