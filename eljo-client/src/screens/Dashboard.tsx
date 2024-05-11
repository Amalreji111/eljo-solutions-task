import { Path, UserRole } from "../enums/enum"
import { Button, Flex, Table, Text } from "@mantine/core"
import { Can } from "../components/WithRole"
import { useEffect, useState } from "react"
import { employeeDetailResponse } from "../Types/api-payload"
import { EmployeeApi } from "../Apis/employeeApi"
import { useNavigate } from "react-router-dom"
import DepartmentSelect from "../components/Department"

function Dashboard() {

  const navigate = useNavigate()

  const [employeeList, setEmployeeList] = useState<employeeDetailResponse[]>([])
  const [department, setDepartment] = useState<string>('')
  const handleLogout = () => {
    localStorage.clear()
    window.location.reload()
  }

  useEffect(() => {
    const getEmployeeList = async () => {
      const response = await EmployeeApi.getEmployeeList(department)
      setEmployeeList(response?.data??[])
     
    }
    getEmployeeList()
    
  }, [department])

  const handleEdit = (id:string) => {
    navigate(`${Path.EDIT_EMPLOYEE}/${id}`)
    console.log(id)
  }

  const handleRegisterEmploye = () => {
    navigate(Path.REGISTER)
  }
  const handleDelete =async (id:string) => {
    if(!id||isNaN(Number(id))){
      return null;
    }
    try {
      
      await EmployeeApi.deleteEmployee(id)
    } catch (error) {
      console.log(error)
    }
    setEmployeeList(employeeList.filter((element) => element.id !== id))
  }

  const rows = employeeList.map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td>{element.id}</Table.Td>
      <Table.Td>{element.employeeCode}</Table.Td>
      <Table.Td>{element.firstName + " " + element.lastName}</Table.Td>
      <Table.Td>{element.contactNo}</Table.Td>
      <Table.Td>{element.user.email}</Table.Td>
      <Table.Td>{element.department}</Table.Td>
      <Table.Td><Button onClick={(e) => {
        e.preventDefault()
        handleEdit(element.id)
      }}> Edit</Button></Table.Td>
      <Table.Td><Button onClick={() => handleDelete(element.id)}> Delete</Button></Table.Td>
    </Table.Tr>
  ));

  console.log(employeeList)
 
  return (
   <>
   <Flex bg={'dark'} style={{width:'100vw',height:'3rem',color:'white'}} justify={"space-between"} align={'center'} direction={"row"}>
    <Text>Eljo Solutions Portal</Text>

  <Flex direction={"row"}>
    <Can roles={[UserRole.EMPLOYER]}>

   <Button onClick={handleRegisterEmploye} mr={'10'}>Register Employee</Button>
    </Can>
   <Button onClick={handleLogout}>Logout</Button>
  </Flex>
   </Flex>
   <br />
   <br />
   <DepartmentSelect
    // value={department}
    placeholder="Filter by  department"
    label="Filter by department"
    w={"20%"}
    allowDeselect
    onChange={(e) => {
      setDepartment(e)
    }}
   />
   <br />

   <Table stickyHeader stickyHeaderOffset={60}>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>id</Table.Th>
          <Table.Th>Employee Code</Table.Th>
          <Table.Th>Employee Name</Table.Th>
          <Table.Th>Contact No</Table.Th>
          <Table.Th>Email</Table.Th>
          <Table.Th>Department</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
   </>
  )
}

export default Dashboard