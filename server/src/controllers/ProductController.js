const logger = require('../logger')
const ProductService = require('../services/ProductService')

class ProductController{
    constructor(){
    }

    async listar(req,res){
        try{
            const id = req.params.id

            //Obtener Uno
            if(id){
                const producto = await ProductService.getById(id)

                if(producto == undefined || producto == null ) return  res.status(404).json({error: 'No se encontro el producto'})

                return res.json({ producto: producto })
            }

            //filtrar 
            if(Object.keys(req.query).length ){
                let data = {}
                const { title,code,price,stock} = req.query
                if(title) data.title = title
                if(code) data.code = code
                if(price) data.price = price
                if(stock) data.stock = stock

                const productos = await ProductService.filter(data)

                return res.json({ productos : productos })

            }

            //Obtener Todos
            const productos = await ProductService.getAll()

            return res.json({ productos : productos })
    
        }catch(err){
            logger.info(err.message, err.stack)
            return res.status(500).json({error: 'Ha ocurrido un error'})
        }
    }

    async agregar(req,res){
        try {
            const data = req.body
            const producto = await ProductService.save(data)

            return res.json({ producto: producto })

        }catch(err){
            logger.info(err.message, err.stack)
            return res.status(500).json({error: 'Ha ocurrido un error'})
        }
    }

    async actualizar(req,res){
        try {
            const data = req.body
            const id = req.params.id

            const producto = await ProductService.update(id,data)

            if( producto == undefined || producto == null ){
                return res.status(404).json({error: 'No se encontro el producto'})
            } 

            return res.json({producto: producto})
        }catch(err){
            return res.status(500).json({error: 'Ha ocurrido un error'})
        }
    }
    async borrar (req,res){
        try{
            const producto = await ProductService.delete(req.params.id)
    
            if( producto == undefined || producto == null ) return  res.status(404).json({error: 'No se encontro el producto'})
    
            return  res.json({producto: producto })
        }catch(err){
            return res.status(500).json({error: 'Ha ocurrido un problema'})
        }
        
    }
}

module.exports = new ProductController()