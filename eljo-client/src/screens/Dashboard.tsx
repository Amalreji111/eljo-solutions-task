import {  useNavigate } from "react-router-dom"
import { LocalstorageKeys, UserRole } from "../enums/enum"
import { Path } from "../Router"
import { Button, Flex, Table, Text } from "@mantine/core"
import { Can } from "../components/WithRole"
import { useEffect, useState } from "react"
import { employeeDetailResponse, employeeListResponse } from "../Types/api-payload"
import { EmployeeApi } from "../Apis/employeeApi"

function Dashboard() {
  const navigate = useNavigate()

  const [employeeList, setEmployeeList] = useState<employeeDetailResponse[]>([])
  const handleLogout = () => {
    localStorage.clear()
    window.location.reload()
  }

  useEffect(() => {
    const getEmployeeList = async () => {
      const response = await EmployeeApi.getEmployeeList("")
      setEmployeeList(response?.data??[])
     
    }
    getEmployeeList()
    
  }, [])

  const handleEdit = (id:string) => {
    console.log(id)
  }
  const handleDelete = (id:string) => {
    console.log(id)
  }

  const rows = employeeList.map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td>{element.id}</Table.Td>
      <Table.Td>{element.employeeCode}</Table.Td>
      <Table.Td>{element.firstName + " " + element.lastName}</Table.Td>
      <Table.Td>{element.contactNo}</Table.Td>
      <Table.Td>{element.user.email}</Table.Td>
      <Table.Td>{element.department}</Table.Td>
      <Table.Td><Button onClick={() => handleEdit(element.id)}> Edit</Button></Table.Td>
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

   <Button onClick={handleLogout} mr={'10'}>Register</Button>
    </Can>
   <Button onClick={handleLogout}>Logout</Button>
  </Flex>
   </Flex>
   <br />
   <br />
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