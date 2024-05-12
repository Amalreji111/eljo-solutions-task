import { Avatar, Button, FileInput, Flex, TextInput } from "@mantine/core";
import { isEmail, useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";
import {  getBase64, validatePassword, validatePhoneNumber } from "../utils/utils";
import DepartmentSelect from "../components/Department";
import { UserApi } from "../Apis/userApi";
import { Path, UserRole } from "../enums/enum";
import { notifications } from "@mantine/notifications";
import { IconPencil } from "@tabler/icons-react";
import { useEffect, useState } from "react";

function RegisterEmploye() {


const navigate = useNavigate()

const [profilePic, setProfilePic] = useState<File|null>(null)
const [base64ProfilePic, setBase64ProfilePic] = useState<string|null>(null)

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      email:'',
      password:'',
      firstName:'',
      lastName:'',
      contactNo:'',
      department:'',
      file:''
      
    },

    validate: {
     
      email: isEmail("Invalid email"),
      password:(v)=>{
        if(!validatePassword(v)){
          return "Invalid password"
        }
        return null
      },
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

  const role = localStorage.getItem("role")

  if(role !==UserRole.EMPLOYER){
    navigate(`${Path.HOME}`)
  }

  const handleSubmit =async (values: any) => {
    try {
      console.log(values,"Submit")
      
      // const base64 = await getBase64(values.file)
      // values.file=base64

      const formData = new FormData()
      formData.append('email', values.email)
      formData.append('password', values.password)
      formData.append('firstName', values.firstName)
      formData.append('lastName', values.lastName)
      formData.append('contactNo', values.contactNo)
      formData.append('department', values.department)
      formData.append('file', values.file)
      
      // console.log('base64', base64)
      // console.log('values.file', values.file)
      await UserApi.registerEmployee(formData)
      form.reset()
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


  useEffect(() => {
  form.setValues({
    ...form.getTransformedValues(),
    file:profilePic as any
  })
    
  },[profilePic])

  const handleChangeFile =async (event: File|null) => {

    if(event){  
      const base64 =await getBase64(event)
      setBase64ProfilePic(base64)
      setProfilePic(event)
    }
    
  }

  return (
   <Flex align={"center"} justify={"center"} w={"100%"} h={"100%"} >
    <Flex w={"50%"} direction={"column"}  align={"center"}  h={"50%"} >
      <h1>Register Employee</h1>
      {/* <h1>Edit Employee</h1> */}
      <Flex style={{position:'relative'}}>
      <Avatar h={"130px"} w={"130px"} src={`${base64ProfilePic}`}></Avatar>
      <FileInput accept="image/png,image/jpeg"       valueComponent={()=><></>}
      style={{position:'absolute',bottom:0,right:0}} 
      onChange={handleChangeFile} 
      label={<IconPencil style={{position:'absolute',zIndex:10,top:40,left:15,transform:'translate(-50%,-50%)'}} />}>

      </FileInput>
      </Flex>
    <form onSubmit={form.onSubmit(handleSubmit)}>
      {/* <Flex w={"100%"}> */}
       <TextInput
        label="Email"
        placeholder="Email"
        withAsterisk
        key={form.key('email')}
        {...form.getInputProps('email')}
      />
      <TextInput
        label="Password"
        placeholder="Password"
        withAsterisk
        type='password'
        key={form.key('password')}
        // ml={"lg"}
        {...form.getInputProps('password')}
      />     
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
   {/* <FileInput multiple label="Upload File" withAsterisk key={form.key('file')} {...form.getInputProps('file')} /> */}

        {/* </Flex> */}

      <Button type="submit">Submit</Button>

      
    </form>
    </Flex>
   </Flex>
  )
}

export default RegisterEmploye