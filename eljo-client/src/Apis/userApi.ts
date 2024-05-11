import { employeeRegister, userLogin, userLoginResponse } from "../Types/api-payload";
import { API } from "./Api";
import { Slug } from "./endpoints";

export class UserApi {
   public static async login(loginRequest:userLogin){
    return await API.post<userLoginResponse>({slug:Slug.LOGIN,body:loginRequest})
   }

   public static async registerEmployee(registerRequest:employeeRegister){
    return await API.post({slug:Slug.REGISTER_EMPLOYEE,body:registerRequest})
   }
}