import { UserRole } from "../enums/enum"

export type userLogin = {
    email: string
    password: string
}

export type employeeRegister = {
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    contactNo: string,
    department: string,
    file?:string
}

export type employeeUpdate = {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    contactNo: string,
    file?:string
}

export type User ={
id:string,
email:string,
role:UserRole
}

export type userLoginResponse = {
    token: string;
    email: string;
    role:UserRole;
    userId:string;
    employeeId:string;
    employeeCode:string;
}

export type employeeDetailResponse = {
  id:string,
  firstName:string,
  lastName:string,
  employeeCode:string,
  contactNo:string,
  department:string,
  userId:string,
  file?:File|string,
  user:User      
}

export type employeeDetailRequest = {
  id:string
}

export type employeeListRequest = {
  department:string
}

export type employeeListResponse = {data:employeeDetailResponse[]}