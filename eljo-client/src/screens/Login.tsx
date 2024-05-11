import { useForm, isEmail } from '@mantine/form';
import { Box, Button, Flex, Group, TextInput } from '@mantine/core';
import { validatePassword } from '../utils/utils';
import { UserApi } from '../Apis/userApi';
import { LocalstorageKeys } from '../enums/enum';
import { useNavigate } from 'react-router-dom';
import { Path } from '../Router';

function Login() {
  const navigate = useNavigate()
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
      
      window.location.reload()
    //  res
      
    } catch (error) {
      console.log(error)

      alert("Invalid Credentials")
      
    }
  }

  return (
    <Flex justify={'center'} align={'center'} w={"100%"}>
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