import { employeeListResponse, employeeUpdate } from "../Types/api-payload";
import { API } from "./Api";
import { Slug } from "./endpoints";

export class EmployeeApi {
    public static async getEmployeeList(department:string){
        return await API.get<employeeListResponse>({slug:Slug.LIST_EMPLOYEE,queryParameters:{department}})
    }

    public static async getEmployeeDetail(id:string){
        return await API.get({slug:Slug.DETAIL_EMPLOYEE,queryParameters:{id}})
    }

    public static async updateEmployee(updateRequest:employeeUpdate){
        return await API.put({slug:Slug.UPDATE_EMPLOYEE,body:updateRequest})
    }
}