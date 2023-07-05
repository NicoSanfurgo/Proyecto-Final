const checkAuthRedirect = async (req,res,next) =>{
    try{
        if( req.isAuthenticated() ) return next()

        return res.redirect('auth/login')

    }catch(err){
        return res.status(403).json({message: 'Forbidden'})
    }

}

module.exports = checkAuthRedirect
