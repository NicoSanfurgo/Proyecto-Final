const cluster = require ('cluster')
const numCPUs = require ('os').cpus().length
const logger = require('./logger')
const config = require('./config')

if (config.CLUSTER == 'CLUSTER'){
      if(cluster.isMaster){
      logger.info(numCPUs)
      logger.info(`PID MASTER ${process.pid}`)
  
      for( let i = 0; i < numCPUs; i++ ){
        cluster.fork()
      }
      cluster.on('exit',worker => {
        logger.warn(`Worker PID: ${worker.process.pid} died ${new Date().toLocaleString()}`)
        
        cluster.fork()
      })
    }else {
        require('./server')
    }
  }else {
    require('./server')
  }
  