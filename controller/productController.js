// import db
const db = require('../connection/connection')

const getAllProducts = (req,res) => {
    db.query('SELECT * FROM product', (err,result) => {
        try {
            if(err) throw err

            res.status(200).send({
                error: false,
                message: 'Successfully fetch all data'
            })
        } catch (error) {
            res.status(500).send({
                error: true,
                message: 'Failed to fetch data'
            })
        }
    })
}

const addProduct = (req,res) => {
    let data = {
        name: req.body.name,
        price: req.body.price,
        brand: req.body.brand,
        color: req.body.color,
        code: req.body.code,
        image1: req.body.image1,
        image2: req.body.image2,
        image3: req.body.image3,
        stock: req.body.stock,
        weight: req.body.weight
    }

    if(!data.name || !data.price || !data.brand || !data.color || !data.code || !data.image1 || !data.image2 || !data.image3 || !data.stock || !data.weight) throw 'All field must be filled'
    console.log('data:', data);

    db.query('INSERT INTO product SET?', data, (err,result) => {
        try {
            if(err) throw err

            res.status(200).send({
                error: false,
                message: 'Successfully add product'
            })
        } catch (error) {
            res.status(500).send({
                error: true,
                message: 'Failed to add product',
                error_message: error.message
            })
        }
    })
}

const editProduct = (req, res) => {
    let idProduct = req.params.idProduct
    console.log('idProduct:', idProduct);
    let dataToUpdate = {
        name: req.body.name,
        price: req.body.price,
        brand: req.body.brand,
        color: req.body.color,
        code: req.body.code,
        image1: req.body.image1,
        image2: req.body.image2,
        image3: req.body.image3,
        stock: req.body.stock,
        weight: req.body.weight
    }

    // cek apakah id ada di db
    db.query('SELECT * FROM product WHERE id=?', idProduct, (err,result) => {
        try {
            if(err) throw err

            if(result.length === 0){
                res.status(200).send({
                    error: true,
                    message: `Product with id ${idProduct} not found`
                })
            }else{
                // query edit
                db.query('UPDATE product SET? WHERE id=?', [dataToUpdate, idProduct], (err,result) => {
                    try {
                        if(err) throw err

                        res.status(200).send({
                            error: false,
                            message: 'Successfully update data'
                        })
                    } catch (error) {
                        res.status(500).send({
                            error: true,
                            message: 'Failed to update product',
                            error_message: error.message
                        })
                    }
                })
            }
        } catch (error) {
            res.status(500).send({
                error: true,
                message: 'Failed to fetch data'
            })
        }
    })
}

const deleteProduct = (req,res) => {
    let idProduct = req.params.idProduct
    console.log(idProduct);

    // cek ada di db apa ga
    db.query('SELECT * FROM product WHERE id=?', idProduct, (err,result) => {
        try {
            if(err) throw err

            if(result.length===0){
                res.status(200).send({
                    error: true,
                    message: `Product with id ${idProduct} not found`
                })
            }else{
                // query ke db
                db.query('DELETE FROM product WHERE id=?', idProduct, (err,result)=> {
                    try {
                        if(err) throw err
                        res.status(200).send({
                            error: false,
                            message: 'Successfully delete data'
                        })
                    } catch (error) {
                        res.status(500).send({
                            error: true,
                            message: 'Failed to delete data'
                        })
                    }
                })
            }
        } catch (error) {
            res.status(500).send({
                error: true,
                message: 'Failed to fetch data'
            })
        }
    })
}

module.exports = {
    getAllProducts,
    addProduct,
    editProduct,
    deleteProduct
}