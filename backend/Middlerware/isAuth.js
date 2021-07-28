const jwt = require('jsonwebtoken');
const secret = process.env.jwtTokenSecret;

module.exports = (req ,res ,next) => {
    const authHeader = req.headers.authorization;
    if(authHeader){
        const token = authHeader.split(' ')[1];
        jwt.verify(token, secret, (err , payload) => {
            if(err){
                return res.json({Mesg : "Some Authentication Error!"}).status(403);
            }else{
                req.username = payload.username;
                req.email = payload.email;
                next();
            }
        })
    }else{
        return res.status(206).json({Mesg : "This Hosteller is Not Authenticated!!!"});
    }
}