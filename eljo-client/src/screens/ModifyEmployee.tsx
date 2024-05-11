import { Box, Button, Flex, TextInput } from "@mantine/core";
import { isEmail, useForm } from "@mantine/form";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { validatePassword, validatePhoneNumber } from "../utils/utils";
import DepartmentSelect from "../components/Department";
import { useEffect, useState } from "react";
import { UserApi } from "../Apis/userApi";
import { EmployeeApi } from "../Apis/employeeApi";
import { Path, UserRole } from "../enums/enum";
import { employeeDetailResponse } from "../Types/api-payload";
import { notifications } from "@mantine/notifications";
type Params = {
  id: string
}
function ModifyEmployee() {
  let param = useParams<Params>();
  const navigate = useNavigate()
  const [userDetails , setUserDetails] = useState<employeeDetailResponse>({
    id:'',
    user: {
      id:'',
      email: '', 
      role:UserRole.EMPLOYEE
    },
    firstName:'',
    lastName:'',
    contactNo:'',
    department:'',
    employeeCode:'',
    userId:''
  })

  useEffect(() => {
    const getUserDetails = async () => {
      const response = await EmployeeApi.getEmployeeDetail(param.id??'')
      if(!response?.data) return null;
      setUserDetails(response?.data)
    }
    getUserDetails()
    
  }, [])

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      id: param.id,
      email: userDetails?.user?.email,
      // password:'',
      firstName:userDetails.firstName,
      lastName:userDetails.lastName,
      contactNo:userDetails.contactNo,
      department:userDetails.department
      
    },

    validate: {
     
      email: isEmail("Invalid email"),
      // password:(v)=>{
      //   if(!validatePassword(v)){
      //     return "Invalid password"
      //   }
      //   return null
      // },
      firstName:(v)=>{
        if(v.trim()===""||v.length<3){
          return "Invalid first name"
        }
        return null
      },
      lastName:(v)=>{
        if(v.trim()===""||v.length<1){
          return "Invalid last name"
        }
        return null
      },
      contactNo:(v)=>{
        if(!validatePhoneNumber(v)){
          return "Invalid phone number"
        }
        return null
      },
      department:(v)=>{
        if(v.trim()===""||v.length<1){
          return "Invalid department"
        }
        return null
      }

    },
  });
  useEffect(() => {
    
    form.setValues( {
      id: param.id,
      email: userDetails?.user?.email,
      // password:'',
      firstName:userDetails.firstName,
      lastName:userDetails.lastName,
      contactNo:userDetails.contactNo,
      department:userDetails.department
      
    })
  }, [userDetails])

  const handleSubmit =async (values: any) => {
    console.log(values,"Submit")
    try {

      const response =await EmployeeApi.updateEmployee(values)
      // navigate(`${Path.HOME}`)
      
    }catch (error:any) {
     
      console.log(error)
      notifications.show({
        color: 'red',
        message: error?.response?.data?.message??"Something went wrong"
      })
      // alert(error?.response?.data?.message??"Something went wrong")

    }
   
  }
  console.log(param.id)

  return (
   <Flex align={"center"} justify={"center"} w={"100%"} h={"100%"} >
    <Flex w={"50%"} direction={"column"}  align={"center"}  h={"50%"} >
      <h1>Edit Employee</h1>
      {/* <h1>Edit Employee</h1> */}

    <form onSubmit={form.onSubmit(handleSubmit)}>
      {/* <Flex w={"100%"}> */}
       <TextInput
        label="Email"
        placeholder="Email"
        withAsterisk
        key={form.key('email')}
        {...form.getInputProps('email')}
      />
      {/* <TextInput
        label="Password"
        placeholder="Password"
        withAsterisk
        type='password'
        key={form.key('password')}
        ml={"lg"}
        {...form.getInputProps('password')}
      />      */}
      {/* </Flex> */}
      {/* <Flex w={"100%"}> */}
       <TextInput
        label="First Name"
        placeholder="First Name"
        withAsterisk
        key={form.key('firstName')}
        {...form.getInputProps('firstName')}
      />
      <TextInput
        label="Last Name"
        placeholder="Last Name"
        withAsterisk
        key={form.key('lastName')}
        // ml={"lg"}
        {...form.getInputProps('lastName')}
      /> 

 
      {/* </Flex> */}
      {/* <Flex w={"100%"}> */}

      <TextInput
        label="Contact No"
        placeholder="Contact No"
        withAsterisk
        key={form.key('contactNo')}
        // ml={"lg"}
        {...form.getInputProps('contactNo')}
      /> 
      <DepartmentSelect 
        
        label="department"
        placeholder="department"
        allowDeselect 
        key={form.key('department')}
        // value={form.key('department')}
        // ml={'lg'}
        {...form.getInputProps("department")}
        /> 
        
        {/* </Flex> */}

      <Button type="submit">Submit</Button>

      
    </form>
    </Flex>
   </Flex>
  )
}

export default ModifyEmployee