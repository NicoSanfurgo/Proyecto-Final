const { verifyToken } = require("../utils/AuthJWT");
const isAuth = async (req,res,next) =>{
    try{
        if( req.isAuthenticated() ) return next()
        
        let token = req.headers.authorization
        if (!token) {
            return res.status(403).json({message: 'debe proveer el token' });
        }
        const user = await verifyToken(token)
        req.user = user
        next()

    }catch(err){
        return res.status(403).json({message: 'Forbidden'})
    }

}

module.exports = isAuth

