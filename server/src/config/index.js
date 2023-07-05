const path = require('path')
const args = require('yargs').argv;

require('dotenv').config({
  path: path.resolve(process.cwd(), process.env.NODE_ENV + '.env' )
})

const persistence =  args.persistence || process.env.PERSISTENCE || 3
module.exports = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    HOST: process.env.HOST || 'localhost',
    PORT: args.port || process.env.PORT || '8080',
    PERSISTENCE: persistence,
    CLUSTER: args.cluster,
    SECRETJWT: process.env.SECRETJWT || 'secret',

    SESSION_TIME: args.sessionTime || 60 * 100,
    SESSION_SECRET: process.env.SESSION_SECRET || 'secret',

    MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost:27017' ,
    MONGO_ATLAS_URL: process.env.MONGO_ATLAS_URL,
    MONGO_DBNAME: process.env.MONGO_DBNAME,

    MYSQL_HOST: process.env.MYSQL_HOST || '127.0.0.1',
    MYSQL_USER: process.env.MYSQL_USER,
    MYSQL_PASSWORD: process.env.MYSQL_PASSWORD,
    MYSQL_DATABASE: process.env.MYSQL_DATABASE,

    GMAIL_USER: process.env.GMAIL_USER,
    GMAIL_PASS: process.env.GMAIL_PASS,

    MAILTRAP_USER: process.env.MAILTRAP_USER,
    MAILTRAP_PASS: process.env.MAILTRAP_PASS,

    TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
    TWILIO_WHATSAPP: process.env.TWILIO_WHATSAPP,
    TWILIO_NUMBER: process.env.TWILIO_NUMBER,
    TWILIO_ADMIN_NUMBER: process.env.TWILIO_ADMIN_NUMBER,
}
