import { useForm, isEmail } from '@mantine/form';
import { Button, Flex, Group, Text, TextInput } from '@mantine/core';
import { UserApi } from '../Apis/userApi';
import { LocalstorageKeys } from '../enums/enum';
import { notifications } from '@mantine/notifications';

function Login() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
      password:''
      
    },

    validate: {
     
      email: isEmail("Invalid email"),
      // password:(v)=>{
      //   if(!validatePassword(v)){
      //     return "Invalid password"
      //   }
      //   return null
      // }

    },
  });

  const handleSubmit =async (values: any) => {
    console.log(values)
    try {
     const response= await UserApi.login(values) 
      localStorage.setItem(LocalstorageKeys.TOKEN,response?.token??"")
      localStorage.setItem(LocalstorageKeys.email,response?.email??'')
      localStorage.setItem(LocalstorageKeys.ROLE,response?.role??'')
      localStorage.setItem(LocalstorageKeys.userId,response?.userId??'')
      localStorage.setItem(LocalstorageKeys.employeeId,response?.employeeId??'')
      localStorage.setItem(LocalstorageKeys.employeeCode,response?.employeeCode??'')

      
      window.location.reload()
    //  res
      
    } catch (error:any) {
      notifications.show({
        color: 'red',
        message: error?.response?.data?.message??"Something went wrong",
        w:'300px'
      })
      console.log(error)


      
    }
  }

  return (
    <Flex direction={'column'}justify={'center'} align={'center'} w={"100%"}>
      <Text>Eljo Solutions Login</Text>
         <form onSubmit={form.onSubmit(handleSubmit)}>
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
        mt="md"
        key={form.key('password')}
        {...form.getInputProps('password')}
      />
      

      <Group justify="flex-end" mt="md">
        <Button  type="submit">Submit</Button>
      </Group>
    </form> 
    </Flex>

  );
}

export default Login