const { Env, EnvKeys } = require('../../env')

class MailSender{
    constructor(){
        this.sgMail = require('@sendgrid/mail')
        this.sgMail.setApiKey(Env.getOrThrow(EnvKeys.SENDGRID_API_KEY))
    }

    
}