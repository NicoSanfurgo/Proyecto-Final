const winston = require ('winston')

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console({ 
            level: 'info', 
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
              )
            })
        ]
})

const loggerError = winston.createLogger({
    transports: [
        new winston.transports.Console({ 
            level: 'info', 
            format: winston.format.combine(
                winston.format.errors({ stack: true}),
                winston.format.timestamp(), 
                winston.format.prettyPrint()
              )
            }),
        new winston.transports.File({
             filename: __dirname + '/logs/error.log', 
             level: 'error', 
             format:  winston.format.combine(
                winston.format.errors({ stack: true}),
                winston.format.timestamp(), 
                winston.format.prettyPrint()
             )})
    ]
})

const loggerWarn = winston.createLogger({
    transports: [
        new winston.transports.Console({ 
            level: 'info', 
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
              )
            }),
         new winston.transports.File({
            filename: __dirname + '/logs/warn.log', 
            level: 'warn', 
            format:  winston.format.combine(
                winston.format.errors({ stack: true}),
                winston.format.timestamp(), 
                winston.format.prettyPrint()
             )})
    ]
})


module.exports = { 
    info:(msg)=> logger.info(msg),
    warn:(msg)=> loggerWarn.warn(msg),
    error:(msg,stack)=> loggerError.error(msg,stack)
}