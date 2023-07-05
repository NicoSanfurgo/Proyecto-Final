const mongoose = require('mongoose');
const config = require('../../config')
const logger = require('../../logger')

const url = config.PERSISTENCE == 2 ? config.MONGO_URL : config.MONGO_ATLAS_URL
const dbPersistence = config.PERSISTENCE == 2 ? 'MONGO LOCAL' : 'MONGO ATLAS'

const connection = mongoose.connect(`${url}/${config.MONGO_DBNAME}`,
     { 
        useNewUrlParser:  true, useUnifiedTopology: true,useFindAndModify : false, useCreateIndex: true
     }
    )

mongoose.connection.on('connected', ()=> {
    logger.info(`[${dbPersistence}] - Connected in: ${url}`)
})

mongoose.connection.on('error',(err)=>{
    logger.error('[Mongoose]- Error :',err)
})

module.exports = connection