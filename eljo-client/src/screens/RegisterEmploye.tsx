import { Button, Flex, TextInput } from "@mantine/core";
import { isEmail, useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";
import { validatePassword, validatePhoneNumber } from "../utils/utils";
import DepartmentSelect from "../components/Department";
import { UserApi } from "../Apis/userApi";
import { Path } from "../enums/enum";
import { notifications } from "@mantine/notifications";

function RegisterEmploye() {


const navigate = useNavigate()

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      email:'',
      password:'',
      firstName:'',
      lastName:'',
      contactNo:'',
      department:''
      
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

  const handleSubmit =async (values: any) => {
    console.log(values,"Submit")
    try {

      await UserApi.registerEmployee(values)
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
        
        {/* </Flex> */}

      <Button type="submit">Submit</Button>

      
    </form>
    </Flex>
   </Flex>
  )
}

export default RegisterEmploye