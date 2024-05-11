require('dotenv').config()
class EnvKeys{
    static PORT = 'PORT';
    static SENDGRID_API_KEY = 'SENDGRID_API_KEY'; 
    static SENDGRID_SENDER = 'SENDGRID_SENDER';
    static EMPLOYER_EMAIL = 'EMPLOYER_EMAIL';
    static EMPLOYER_PASSWORD = 'EMPLOYER_PASSWORD';
    static DATABASE_URL = 'DATABASE_URL';
    static TOKENSECRET = 'TOKENSECRET';
    static LIFESPAN = 'LIFESPAN';
}
class Env{
    static get(key){
        return process.env[key]
    }

    static getOrThrow(key){
        const value = process.env[key]
        if(!value){
            throw new Error(`Missing env ${key}`)
        }
        return value
    }
}

module.exports = {Env,EnvKeys}