const prisma = require("../../../db/db");
const { Env, EnvKeys } = require("../../../env");
const { EmailSender } = require("../../../utils/email-sender");
const { generateToken, validateEmail, validatePassword, validatePhoneNumber, generateEmployeeCode } = require("../../../utils/utils");
const { Response } = require("../../config/config");



async function createAdminAccount(req,res){
    try {
        // console.log("heyy")
        let data = {
            email:Env.get(EnvKeys.EMPLOYER_EMAIL),
            password:Env.get(EnvKeys.EMPLOYER_PASSWORD),
            role:"employer"
        }

        const user = (await prisma.user.findMany({
            where:{
                role:data.role
            }
        }))[0]

        if(user){
          //delete user from db

          await prisma.user.deleteMany({where:{id:user.id}})
        }

       data= await prisma.user.create({data})
     
       return Response.success(res,data)
         
    } catch (error) {
        console.log(error)
        return Response.internal_server_error(res,{
            message:"Something went wrong"
        })
    }




}

async function login(req,res){
    try {
        const {email,password} = req.body

        const user = await prisma.user.findUnique({
            where:{
                email
            }
        })

        if(!user){
            return Response.bad_request(res,{
                message:"User not found"
            })
        }

        if(user.password!==password){
            return Response.bad_request(res,{
                message:"Incorrect password"
            })
        }

        const data = {
            id:user.id,
            email:user.email,
            role:user.role
        }

        const token = await generateToken(data)

        return Response.success(res,{
            token,
            email:user.email,
            role:user.role
        })
        
    } catch (error) {
        console.log(error)
        return Response.internal_server_error(res,{
            message:"Something went wrong"
        })
        
    }
}

async function register(req,res){
    try {

        const {
            email,
            password,
            firstName,
            lastName,
            contactNo,
            department
        } = req.body
        
        const role = 'employee'

        if(!validateEmail(email)){
            return Response.bad_request(res,{
                message:"Invalid email"
            })
        }

        if(!validatePassword(password)){
            return Response.bad_request(res,{
                message:"Invalid password"
            })
            
        }

        if(!validatePhoneNumber(contactNo)){
            return Response.bad_request(res,{
                message:"Invalid phone number"
            })
        }

        if(!firstName&&firstName.length<3){
            return Response.bad_request(res,{
                message:"Invalid first name"
            })
        }

        if(!lastName&&lastName.trim()===""){
            return Response.bad_request(res,{
                message:"Invalid last name"
            })
            
        }

        if(!department&&department.trim()===""){
            return Response.bad_request(res,{
                message:"Invalid department"
            })
        }

        let userEntity = {
            email,
            password,
            role
        }

        userEntity = await prisma.user.create({data:userEntity})

        const lastEmployee = await prisma.employeeDetails.findMany({

            orderBy:{
                id:"desc"
            },
            take:1
        })

        const employeeCode =generateEmployeeCode(lastEmployee.at(0)?.employeeCode?.split('-')[2]||0)

        let employeeDetails ={

            employeeCode,
            firstName,
            lastName,
            contactNo,
            department,
            userId:userEntity.id

        }

        employeeDetails = await prisma.employeeDetails.create({data:employeeDetails})

        const token = await generateToken({id:userEntity.id,email,role:userEntity.role})

        const sg=  new EmailSender()

        await sg
        .addTo(email)
        .setSubject("Welcome to eljo, your account has been created")
        .setTextContent("Welcome to eljo, your account has been created")
        .setHTMLContent(`<div>
        <h1>Welcome to eljo, your account has been created</h1>

        <h4>please find your login credential below</h4>

        <h3>email: ${email}</h3>
        <h3>password: ${password}</h3>

        You can update password from your profile
        <div>`)
        .send()
        return Response.success(res,{
            message:'User Account created successfully',
            user:{
                id:userEntity.id,
                email,
                firstName,
                lastName,
                contactNo,
                department

            }
        })

        
    } catch (error) {
        console.log(error)
        return Response.internal_server_error(res,{
            message:"Something went wrong"
        })
    }
}


module.exports = {login,register,createAdminAccount}