const isAdmin = true

function checkAdmin(req,res,next){

    if(!isAdmin) return res.json({ error: 'No tiene Permiso' , descripcion: `No tiene permiso a la ruta  ${req.originalUrl}`, code: '403'})

    return next()
}


module.exports = checkAdmin