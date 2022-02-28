// init library
const express = require('express')
const app = express()

app.use(express.json())

// import cors
const cors = require('cors')
app.use(cors())

// import routers
const authenticRouter = require('./routers/authenticRouter')
const productRouter = require('./routers/productRouter')

app.use('/authentic', authenticRouter)
app.use('/product', productRouter)

const port = 9000
app.listen(port, () => console.log('API RUNNING ON PORT '+ port))