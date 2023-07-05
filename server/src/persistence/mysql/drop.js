const {knex} = require('./knex')

const drop =  async () =>{

    try{
        await knex.schema.dropTableIfExists('carritos') 
        await knex.schema.dropTableIfExists('productos') 
        console.log('Se han eliminado las tablas')
    }catch(err){
        console.log('Ha ocurrido un error',err.message)
    }finally{
        console.log('cerrando conexion...');
        process.exit(0);
    }

}


drop()