const {knex} = require('./knex')

const migrate =  async () =>{
    try{

        await knex.schema.dropTableIfExists('carritos');
        await knex.schema.dropTableIfExists('productos');


        await knex.schema.createTable('productos', table => {
            table.increments('id')
            table.timestamp('timestamp', { useTz: true }).notNullable().defaultTo(knex.fn.now())
            table.string('nombre',255)
            table.string('descripcion',255)
            table.string('codigo',50)
            table.string('foto',255)
            table.float('precio')
            table.integer('stock').defaultTo(0)
        })
        console.log('Se ha creado la tabla productos en Mysql')

        await knex.schema.createTable('carritos', table => {
            table.increments('id')
            table.integer('carrito_id').defaultTo(1)
            table.timestamp('timestamp', { useTz: true }).notNullable().defaultTo(knex.fn.now())
            table.integer('id_producto').unsigned()
            table.foreign('id_producto')
            .references('id')
            .inTable('productos')
            .onDelete('CASCADE')
        })
        
        console.log('Se ha creado la tabla carritos')
    }catch(err){
        console.log('error:', err);
    }finally{
        console.log('cerrando conexion...');
        process.exit(0);
    }
    
}

migrate()
