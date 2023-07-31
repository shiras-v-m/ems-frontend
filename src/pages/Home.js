// import { Button } from 'bootstrap'
import React, { useEffect, useState, useContext } from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import Hometable from '../components/Hometable'
import Emsspinner from '../components/Emsspinner'
import { registerContext ,deleteContext} from '../components/ContextShare';
import { deleteEmployee, getallemployees } from '../services/allApis'


function Home() {

  const {deleterData,setDeleteData } = useContext(deleteContext)

  //for search
  const [search, setSearch] = useState("")
  console.log(search);

  const { registerData, setRegisterData } = useContext(registerContext)

  const navigate = useNavigate()
  const [showSpin, setShowspin] = useState(true)
  const adduser = () => {
    navigate("/register")
  }

  useEffect(() => {
    getallusers()
    setTimeout(() => {
      setShowspin(false)
    }, 2000);
  }, [search])

  //GET ALL EMPLOYEES
  const [users, setusers] = useState([])
  const getallusers = async () => {
    const result = await getallemployees(search)
    setusers(result.data)
  }
  // console.log(users);



  //delete user
  const removeEmployee = async (id) => {
    const response = await deleteEmployee(id)
    console.log(response);
    if (response.status === 200) {
      getallusers()
      setDeleteData(response.data)
     
    }
    else {
      console.log("Error", response);
    }
  }



  return (


    <>
      {
        registerData ? <Alert variant="success" onClose={() => setRegisterData("")} dismissible>
          {registerData.fname.toUpperCase()} successfully Registered !!!!
        </Alert> : ""
      }
      {
        deleterData ? <Alert variant="danger" onClose={() => setDeleteData("")} dismissible>
          {deleterData.fname.toUpperCase()} successfully removed !!!!
        </Alert> : ""
      }
      <div className='container ' style={{ margin: "100px auto" }} >
        <div className="main-div">
          <div className="search-add d-flex justify-content-between">
            <div className="search col-md-4">
              <Form className='d-flex'>
                <Form.Control type="text" placeholder="Search" onChange={e=> setSearch(e.target.value)} />
                <button className='btn btn-success'>
                  <i class="fa-solid fa-magnifying-glass"></i>
                </button>
              </Form>
            </div>
            <div className="add-btn">
              <Button className='btn btn-info' onClick={adduser}>
                <i class="fa-solid fa-user-plus"></i>  Add
              </Button>
            </div>

          </div>
          <div className="table-div">
            {showSpin ?
              <Emsspinner /> :
              // <Hometable displaydata={users} removeEmployee={removeEmployee} />
              <Hometable displaydata={users} removeEmployee={removeEmployee} />
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default Home