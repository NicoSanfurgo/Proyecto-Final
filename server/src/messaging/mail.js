const nodemailer = require('nodemailer')
const logger = require('../logger')
const config = require('../config')
const ejs = require('ejs');

const GmailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.GMAIL_USER,
        pass: config.GMAIL_PASS
    }
});

const MailtrapTransporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: config.MAILTRAP_USER,
      pass: config.MAILTRAP_PASS
    }
});

const transporter = config.NODE_ENV == 'development' ? MailtrapTransporter : GmailTransporter

class MailSender{
    constructor(transporter){
        this.transporter = transporter
    }
    async newRegister(data){
        try{ 
            await this.transporter.sendMail({
                from: 'Ecommerce Ale',
                to: config.GMAIL_USER,
                subject: `Nuevo registro ${data.email}`,
                html: ` <p>${data.name}</p> 
                        <p>${data.lastName}</p> 
                        <p>${data.email}</p> 
                        <p>${data.age}</p>
                        <p>${data.phone}</p>
                        <img src=${data.avatar}/>`,
            })
        }catch(err){
            logger.error(`Ha ocurrido un error al enviar el mail de registro ${err.message}, usuario: ${data.email}`)
        }
    }

    async newOrder( user, products ){
        try{
            await this.transporter.sendMail({
                from: 'Ecommerce Ale',
                to: config.GMAIL_USER,
                subject: `Nuevo Pedido de ${user.name} - ${user.email}`,
                html: `
                    <h5> Usuario: </h5>
                        <p>${user.name} ${user.lastName}</p> 
                        <p>${user.email}</p> 
                        <p>${user.phone}</p>
                        </hr>
            
                        <h2> Pedido </h2>
                        <ul>
                         ${ products.map(product => `<li>${product.title}</li>`) } 
                        </ul>
                        `
            })
        }catch(err){
            logger.error(`Ha ocurrido un error al enviar un mail ${err.message}, usuario: ${user.email}`)
        }
    }

    async sendEmailError(err){
        try{
            let html = ""
            ejs.renderFile(__dirname+'/templates/errorTemplate.ejs', { error: err },{},(err,str) => {
                if(err) throw err
                html = str
            })

            await this.transporter.sendMail({
                from: 'Ecommerce Ale',
                to: config.GMAIL_USER,
                subject: `Ha Ocurrido un Error`,
                html: html
            })
            
            return logger.info(`Se ha enviado el mail de Error`)
        }catch(err){
            return logger.error(err.message)
               
        }
    }

}


module.exports = new MailSender(transporter)