import {  useNavigate } from "react-router-dom"
import { LocalstorageKeys } from "../enums/enum"
import { Path } from "../Router"
import { Button } from "@mantine/core"

function Dashboard() {
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.clear()
    window.location.reload()
  }
 
  return (
   <>
   Dashboard
   <Button onClick={handleLogout}>Logout</Button>
   </>
  )
}

export default Dashboard