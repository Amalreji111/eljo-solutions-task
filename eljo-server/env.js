require('dotenv').config()
class EnvKeys{
    static PORT = 'PORT';
    static SENDGRID_API_KEY = 'SENDGRID_API_KEY'; 
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