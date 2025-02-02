import { Avatar, Button, FileInput, Flex, TextInput } from "@mantine/core";
import { isEmail, useForm } from "@mantine/form";
import {  useNavigate, useParams } from "react-router-dom";
import {  getBase64, validatePhoneNumber } from "../utils/utils";
import DepartmentSelect from "../components/Department";
import { useEffect, useState } from "react";
import { EmployeeApi } from "../Apis/employeeApi";
import { Path, UserRole } from "../enums/enum";
import { employeeDetailResponse } from "../Types/api-payload";
import { notifications } from "@mantine/notifications";
import { IconPencil } from "@tabler/icons-react";
import { Can } from "../components/WithRole";
type Params = {
  id: string
}
function ModifyEmployee() {
  let param = useParams<Params>();
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
      const response = await EmployeeApi.getEmployeeDetail(param.id??'')
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
      id: param.id,
      email: userDetails?.user?.email,
      // password:'',
      firstName:userDetails.firstName,
      lastName:userDetails.lastName,
      contactNo:userDetails.contactNo,
      department:userDetails.department,
      file:profilePic
      
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
      department:userDetails.department,
      file:profilePic
      
    })
  }, [userDetails,profilePic])

  const handleSubmit =async (values: any) => {
    console.log(values,"Submit")
    try {
      const formData = new FormData()
      formData.append('id', values.id)
      formData.append('email', values.email)
      formData.append('firstName', values.firstName)
      formData.append('lastName', values.lastName)
      formData.append('contactNo', values.contactNo)
      formData.append('department', values.department)
      formData.append('file', values.file)


      await EmployeeApi.updateEmployee(formData)
      navigate(`${Path.HOME}`)
      
    }catch (error:any) {
     
      console.log(error)
      notifications.show({
        color: 'red',
        message: error?.response?.data?.message??"Something went wrong"
      })
      // alert(error?.response?.data?.message??"Something went wrong")

    }
   
  }
  const handleFileChange = async(event: File|null) => {

    if(event){
      const base64 =await  getBase64(event)
      // console.log(,"base64")
      setProfilePic(event)
      setUserDetails((prev)=>({...prev,file:base64.split(",")[1]}))
     
      // form.setFieldValue('file',event)
      
    }
    
  }
  console.log(param.id)

  return (
   <Flex align={"center"} justify={"center"} w={"100%"} h={"100%"} >
    <Flex w={"50%"} direction={"column"}  align={"center"} justify={"center"}  h={"50%"} >
      <Can roles={[UserRole.EMPLOYER]}>

      <h1>Edit Employee</h1>
      </Can>
      <h2>{userDetails?.firstName+" "+userDetails?.lastName+" : "+userDetails?.employeeCode}</h2>

      {/* <h1>Edit Employee</h1> */}
      <Flex style={{position:'relative'}}>
      <Avatar h={"130px"} w={"130px"} src={`data:image/png;base64,${userDetails.file}`}></Avatar>
      <FileInput accept="image/png,image/jpeg"       valueComponent={()=><></>}
      style={{position:'absolute',bottom:0,right:0}} 
      onChange={handleFileChange} 
      label={<IconPencil style={{position:'absolute',zIndex:10,top:40,left:15,transform:'translate(-50%,-50%)'}} />}>

      </FileInput>
      </Flex>

    <form onSubmit={form.onSubmit(handleSubmit)}>
      {/* <img src={`data:image/png;base64,${userDetails.file}`}  alt="Some file" /> */}
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