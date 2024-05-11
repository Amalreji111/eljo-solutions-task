import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Routes } from './Router';
import { useEffect, useState } from 'react';
import { LocalstorageKeys } from './enums/enum';
import { jwtDecode } from 'jwt-decode';
import { MantineProvider, createTheme } from '@mantine/core';

const theme = createTheme({
  
})

function App() {
  // const [count, setCount] = useState(0)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const isAuthenticated =async()=>{
      const token = localStorage.getItem(LocalstorageKeys.TOKEN)

      if(!token){
        setIsAuthenticated(false)
      }else{

        const decoded = jwtDecode(token)
        console.log(decoded)
        if(decoded.exp && decoded.exp< Date.now()){
          setIsAuthenticated(true)
        }
        else {
          setIsAuthenticated(false)
        }

        
      }
    }
    isAuthenticated()
    
  },[])

  const router = createBrowserRouter(Routes(isAuthenticated));
  return <RouterProvider router={router} />
  // return <>Helo world</>
}

export default App
