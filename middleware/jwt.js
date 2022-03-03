const jwt = require('jsonwebtoken');

const jwtVerify = (req,res,next) => {
    const token = req.headers["authorization"]
    console.log('reqheaders',req.route.path, req.headers['authorization']);

    if(!token) return res.status(406).send({error: true, message: 'Token not found'})
    
    jwt.verify(token, '123abc', (err,dataToken) => {
        try {
            if(err) throw err
            
            // console.log(dataToken);
            req.dataToken = dataToken
            if(!dataToken.id) return res.status(403).send({error: true, message: 'Forbidden'})
            next()
        } catch (error) {
            console.log("jwt:", error.message)
            res.status(500).send({
                error: true,
                message: error.message
            })
        }
    })
    // next()
}
module.exports= {
    jwtVerify
}