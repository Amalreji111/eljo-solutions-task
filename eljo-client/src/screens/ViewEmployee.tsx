import { Avatar, Box, Button, FileInput, Flex, TextInput } from "@mantine/core";
import { isEmail, useForm } from "@mantine/form";
import {  useNavigate, useParams } from "react-router-dom";
import {  getBase64, validatePhoneNumber } from "../utils/utils";
import DepartmentSelect from "../components/Department";
import { useEffect, useState } from "react";
import { EmployeeApi } from "../Apis/employeeApi";
import { LocalstorageKeys, Path, UserRole } from "../enums/enum";
import { employeeDetailResponse } from "../Types/api-payload";
import { notifications } from "@mantine/notifications";
import { IconPencil } from "@tabler/icons-react";

function ViewEmployee() {
  const navigate = useNavigate()
  const [profilePic, setProfilePic] = useState<File|null>(null)
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
      const response = await EmployeeApi.getEmployeeDetail(localStorage.getItem(LocalstorageKeys.employeeId)??'')
      if(!response?.data) return null;
      console.log(response?.data)
      // const b64File = await getBase64(response?.data?.file??null)
      setUserDetails(response?.data)
    }
    getUserDetails()
    
  }, [])

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      id: localStorage.getItem(LocalstorageKeys.employeeId),
      email: userDetails?.user?.email,
      // password:'',
      firstName:userDetails.firstName,
      lastName:userDetails.lastName,
      contactNo:userDetails.contactNo,
      department:userDetails.department,
      file:profilePic
      
    },

  });
  useEffect(() => {
    
    form.setValues( {
      id: localStorage.getItem(LocalstorageKeys.employeeId),
      email: userDetails?.user?.email,
      // password:'',
      firstName:userDetails.firstName,
      lastName:userDetails.lastName,
      contactNo:userDetails.contactNo,
      department:userDetails.department,
      file:profilePic
      
    })
  }, [userDetails])




  return (
   <Flex align={"center"} justify={"center"} w={"100%"} h={"100%"} >
    <Flex w={"50%"} direction={"column"}  align={"center"} justify={"center"}  h={"50%"} >
      <h1>{userDetails?.firstName+" "+userDetails?.lastName+" : "+userDetails?.employeeCode}</h1>
      {/* <h1>Edit Employee</h1> */}
      <Flex style={{position:'relative'}}>
      <Avatar h={"130px"} w={"130px"} src={`data:image/png;base64,${userDetails.file}`}></Avatar>

      </Flex>

    <Box>
      {/* <img src={`data:image/png;base64,${userDetails.file}`}  alt="Some file" /> */}
      {/* <Flex w={"100%"}> */}
       <TextInput
        label="Email"
        placeholder="Email"
        disabled
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
        disabled
        
        key={form.key('firstName')}
        {...form.getInputProps('firstName')}
      />
      <TextInput
        label="Last Name"
        placeholder="Last Name"
        disabled

        key={form.key('lastName')}
        // ml={"lg"}
        {...form.getInputProps('lastName')}
      /> 

 
      {/* </Flex> */}
      {/* <Flex w={"100%"}> */}

      <TextInput
        label="Contact No"
        placeholder="Contact No"
        disabled

        key={form.key('contactNo')}
        // ml={"lg"}
        {...form.getInputProps('contactNo')}
      /> 

      <DepartmentSelect 
        
        label="department"
        placeholder="department"
         disabled
 
        key={form.key('department')}
        // value={form.key('department')}
        // ml={'lg'}
        {...form.getInputProps("department")}
        /> 
        
        {/* </Flex> */}

      {/* <Button type="submit">Submit</Button> */}

      
    </Box>
    </Flex>
   </Flex>
  )
}

export default ViewEmployee