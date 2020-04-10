const jwt = require('jsonwebtoken');

module.exports={
    verify: (req,res,next)=> {
        const token = req.headers['x-access-token']
        console.log(token)

        try {
            var docoded = jwt.verify(token, process.env.SECRET_KEY)
            console.log('decoded:', docoded)
            next()
        }catch(err) {
            res.json({
                msg: 'invailid token'
            })
        }
    }

}