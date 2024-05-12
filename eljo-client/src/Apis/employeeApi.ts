import { employeeDetailResponse, employeeListResponse, employeeUpdate } from "../Types/api-payload";
import { API } from "./Api";
import { Slug } from "./endpoints";

export class EmployeeApi {
    public static async getEmployeeList(department:string){
        return await API.get<employeeListResponse>({slug:Slug.LIST_EMPLOYEE,queryParameters:{department}})
    }

    public static async getEmployeeDetail(id:string){
        return await API.get<{data:employeeDetailResponse}>({slug:Slug.DETAIL_EMPLOYEE,queryParameters:{id}})
    }

    public static async deleteEmployee(id:string){
        return await API.delete({slug:Slug.DELETE_EMPLOYEE,queryParameters:{id}})
    }

    public static async updateEmployee(updateRequest:FormData){
        return await API.put({slug:Slug.UPDATE_EMPLOYEE,body:updateRequest})
    }
}