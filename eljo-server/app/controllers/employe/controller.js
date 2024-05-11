const prisma = require("../../../db/db")
const { validatePassword, validatePhoneNumber, validateEmail } = require("../../../utils/utils")
const { Response } = require("../../config/config")



async function list(req,res){
   try {
    const {department}=req.query
    let query = {}

    if(department && department.trim()!==''){
        query.department=department
    }
    //department may null if so send all details otherwise query with department
   const employees = await prisma.employeeDetails.findMany({
    where:query,
    orderBy:{
        id:"desc"
    },
    include:{
        user:{
            select:{
                email:true,
                id:true,
                role:true
            }
        }
    }
   })

   return Response.success(res,{
    data:employees
   })
    
   } catch (error) {
    console.log(error)

    return []
    
   }
}
async function detail(req,res){

    try {
        const {id}=req.query
        console.log("user id",id)

        if(!id||id.trim()===''||isNaN(id)){
         return null;
        }
     
         const employee=await prisma.employeeDetails.findUnique({
             where:{
                 id:Number(id) 
             },
             include:{
                 user:{
                     select:{
                         email:true,
                         id:true,
                         role:true
                     }
                 }
             }
         })

         return Response.success(res,{
            data:employee
         })
            
    } catch (error) {

        console.log(error)
        return null
        
    }


}

async function update (req,res){
    try {
        const {
            id,
            firstName,
            lastName,
            email,
            contactNo

        }=req.body

        if(!id||id.trim()===''||isNaN(id)){
            return Response.bad_request(res,{
                message:"Invalid employee id"
            })
        }

        if(email&&!validateEmail(email)){
            return Response.bad_request(res,{
                message:"Invalid email"
            })
        }


        if(contactNo&&!validatePhoneNumber(contactNo)){
            return Response.bad_request(res,{
                message:"Invalid phone number"
            })
        }

        if(firstName&&firstName.length<3){
            return Response.bad_request(res,{
                message:"Invalid first name"
            })
        }

        if(lastName&&lastName.trim()===""){
            return Response.bad_request(res,{
                message:"Invalid last name"
            })
            
        }
        let employee =await prisma.employeeDetails.findUnique({
            where:{
                id:Number(id)
            },
            include:{
                user:{
                    select:{
                        email:true,
                        id:true,
                        role:true
                    }
                }
            }
        })

        if(!employee){
            return Response.bad_request(res,{
                message:"Employee not found"
            })
        }
        const data ={}

        if(firstName){
            data.firstName=firstName
        }
        if(lastName){
            data.lastName=lastName
        }
       
        if(contactNo){
            data.contactNo=contactNo
        }
        // if(department){
        //     data.department=department
        // }

        if(email){
            const user =await prisma.user.update({
                where:{
                    id:employee.user.id
                },
                data:{
                    email
                }
            })
        }

         employee =await prisma.employeeDetails.update({
            where:{
                id:Number(id)
            },
            data:data
        })

        return Response.success(res,{
            message:"Successfully updated"
        })
        
    } catch (error) {
        return Response.internal_server_error(res,{
            message:"Something went wrong"
        })   
    }
}
async function deleteEmployee(req,res){
    try {
        const {id}=req.query
        const employee = await prisma.employeeDetails.delete({
            where:{
                id:Number(id)
            },
            include:{
                user:true
            }
        })

        if(!employee){
            return Response.bad_request(res,{
                message:"Employee not found"
            })
        }

        const user = await prisma.user.delete({
            where:{
                id:employee.user.id
            }
        })



        return Response.success(res,{
            message:"Successfully deleted",
            data:employee
        })
        
    } catch (error) {

        console.log(error)
        return Response.internal_server_error(res,{
            message:"Something went wrong"
        })  
        
    }
}

module.exports = {list,detail,update,deleteEmployee}