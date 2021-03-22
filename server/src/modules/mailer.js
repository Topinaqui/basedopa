//mailtrap -> cairá aqui os dados de email, criar cadastro no mailtrap.io, para entrega de emails transacionais de testes

const path = require('path')
const nodemailer = require('nodemailer')
const hbs = require("nodemailer-express-handlebars")

const {host, port, user, pass} = require('../config/mail.json')

var transport = nodemailer.createTransport({
    host,
    port,
    auth: {
        user,
        pass
    }
})

transport.use('compile', hbs({
    viewEngine: 'handlebars',
    viewPath: path.resolve('./src/resources/mailer'),
    extName: '.html',
}))

module.exports = transport