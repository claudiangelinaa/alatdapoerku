// import db
const db = require('../connection/connection')

// import helper
const hashPassword = require('../helpers/hashPassword')
const jwt = require('jsonwebtoken')
const validator = require('validator')

const register = (req,res) => {
    let data = req.body
    let passwordHashed = hashPassword(data.password)

    if(!data.email || !data.password || !data.name || !data.phone_number) throw 'All fields must be filled'
    if(validator.isEmail(data.email) === false) throw 'Email format is not valid'

    let dataToSend = {
        email: data.email,
        password: passwordHashed,
        name: data.name,
        phone_number: data.phone_number
    }
    console.log('dataToSend:', dataToSend);

    // Cek email ada apa ga di db
    db.query('SELECT * FROM admin WHERE email =?', dataToSend.email, (err,result) => {
        try {
            if(err) throw err

            // console.log(result);
            if(result.length===1){
                res.status(200).send({
                    error: true,
                    message: 'Email has been registered'
                })
            }else{
                // query ke db
                db.query('INSERT INTO admin SET?', dataToSend, (err,result) => {
                    try {
                        if(err) throw err

                        res.status(200).send({
                            error: false,
                            message: 'Successfully register user'
                        })
                    } catch (error) {
                        res.status(500).send({
                            error: true,
                            message: 'Failed register'
                        })
                    }
                })
            }
        } catch (error) {
            res.status(500).send({
                error: true,
                error_message: error.message
            })
        }
    })
}

const login = (req,res) => {
    let dataToLogin = {
        email: req.body.email,
        password: hashPassword(req.body.password)
    }
    console.log('dataToLogin:', dataToLogin);

    db.query('SELECT * FROM admin WHERE email=? AND password=?', [dataToLogin.email, dataToLogin.password], (err, result) => {
        try {
            if(err) throw err
            // console.log(result);
            if(result.length === 0){
                res.status(200).send({
                    error: true,
                    message: 'Email does not exist'
                })
            }else{
                jwt.sign({id: result[0].id, email: result[0].email}, '123abc', (err,token) => {
                    try {
                        if(err) throw err

                        res.status(200).send({
                            error: false,
                            message: 'Successfully login',
                            token: token
                        })
                    } catch (error) {
                        res.status(500).send({
                            error: true,
                            message: 'Error generate token',
                            error_message: error.message
                        })
                    }
                })
            }
        } catch (error) {
            res.status(500).send({
                error: true,
                message: 'Failed to find user'
            })
        }
    })
}

module.exports = {
    register: register,
    login: login
}