const prisma = require("../../db/db");
const { decode } = require("../../utils/utils");

const verifyToken = async (req, res, next) => {

    let token = req.headers['authorization'];

    if(!token){
        token = req.headers['Authorization'];
    }
    console.log(token,"Token")

    if(!token){
        return res.status(401).json({
            message:"Unauthorized"
        })
    }

    token = token.split(' ')[1];
    const decoded =await decode(token)
    if(!decoded){
        return res.status(401).json({
            message:"Unauthorized"
        })
    }
    const user =await prisma.user.findUnique({
        where:{
            id:decoded.id
        }
    })
    if(!user){
        return res.status(401).json({
            message:"Unauthorized"
        })
    }
    next();
  };

const isEmployer = async (req, res, next) => {

    let token = req.headers['authorization'];

    if(!token){
        token = req.headers['x-access-token'];
    }

    if(!token){
        return res.status(401).json({
            message:"Unauthorized"
        })
    }

    token = token.split(' ')[1];
    const decoded =await decode(token)
    if(!decoded){
        return res.status(401).json({
            message:"Unauthorized"
        })
    }
    const user =await prisma.user.findUnique({
        where:{
            id:decoded.id
        }
    })
    if(!user){
        return res.status(401).json({
            message:"Unauthorized"
        })
    }
    if(user.role!=="employer"){
        return res.status(402).json({
            message:"Forbidden"
        })
    }
    // req.user = user

    next();
}

module.exports = {verifyToken,isEmployer}
