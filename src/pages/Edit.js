import React, { useEffect, useState } from 'react'
import { Button, Card, Form, Row } from 'react-bootstrap'
import Select from 'react-select';
import Emsspinner from '../components/Emsspinner'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { editEmployee, register, viewEmployee } from "../services/allApis"
import { useNavigate, useParams } from 'react-router-dom';
import { registerContext } from '../components/ContextShare';
import { BASE_URL } from '../services/base_url';


function Edit() {
  const navigate = useNavigate()
  const { id } = useParams()

  const [existImg,setExistImg]=useState('')

  const getEmployeeDetails=async()=>{
    let {data}=await viewEmployee(id)
    setNormalInput(data);
    setStatus(data.status)
    setExistImg(data.profile)
  }

  useEffect(()=>{
    getEmployeeDetails()
  },[id])
  console.log(id);

  //state to hold all normal user inputs
  const [normalinput, setNormalInput] = useState({
    fname: "",
    lname: "",
    email: "",
    mobile: "",
    gender: "",
    location: ""
  })
  //to create update state  of normalinputs

  const setUserInputs = (e) => {
    const { name, value } = e.target
    setNormalInput({ ...normalinput, [name]: value })
  }

  // console.log(normalinput);


  //state to hold status
  const [status, setStatus] = useState("")

  const setStatusValue = (e) => {
    setStatus(e.value)
  }
  // console.log(status);

  //state to hold image
  const [image, setImage] = useState("")

  const setProfileImage = (e) => {
    setImage(e.target.files[0])
  }
  // console.log(image);

  //hold preview image
  const [preview, setPreview] = useState("")


  const [showSpin,setShowspin]= useState(true)

  const options = [
    { value: 'Active', label: 'Active' },
    { value: 'Inactive', label: 'Inactive' },
  ];



  useEffect(() => {

    if (image) {
       setExistImg("")
      setPreview(URL.createObjectURL(image))
    }

    setTimeout(() => {
      setShowspin(false)
    }, 2000);
  }, [image])
  

  const handleUpdate = async (e) => {
 

    e.preventDefault()
      const { fname, lname, email, mobile, gender, location } = normalinput
      console.log(normalinput);
      console.log("Image is ",existImg);
      if(!existImg){
        console.log("image not exist");
        toast.error("Please fill the form completely")
      }
    else if (!fname || !lname || !email || !mobile || !gender || !status  || !location) {
      console.log("no data is given");
      toast.error("Please fill the form completely")
    }
    else {
      console.log("all data is given");
      toast.success("Successfully fill the form")



      //body
      const data = new FormData()
      image?data.append("profile", image) : data.append("profile", existImg)
      data.append("fname", fname)
      data.append("lname", lname)
      data.append("email", email)
      data.append("mobile", mobile)
      data.append("gender", gender)
      data.append("location", location)
      data.append("status", status)

      //header
      const headerConfig = {
        "Content-Type": "multipart/form-data"
      }

      //make call to service to edit data 

      const response = await editEmployee(id,data)
       console.log(response.data);
      // console.log(response);
      if (response.status === 200) {
      //   //reset all form inputs
      //   setNormalInput({
      //     ...normalinput,
      //     fname:"",
      //     lname:"",
      //     email:"",
      //     mobile:"",
      //     gender:"",
      //     location:""
      //   })
      //   setStatus("")
      //   setImage("")

        //share server response to home page via context api
        // setRegisterData(response.data)


        //navigate to homepage
        navigate('/')
      }
      else {
        console.log(response);
        if (response.data) {
          toast.error(response.data)
        }
      }


    }

  }


  return (
    <>
    {showSpin? <Emsspinner className="mb-5" />:
      <div className="d-flex justify-content-center mb-5">
      <div className="container mt-5">
        <h2 className="text-center mt-3">Update Employee Details</h2>
        <Card className='shadow mt-3 p-3'>
              <div className=" mb-3">
                <div className="image-block text-center">
                  <img className=" rounded-circle border p-1" style={{ width: "50px", height: "50px", borderRadius: "100%" }} src={preview ? preview :`${BASE_URL}/uploads/${existImg}`} alt="image" />
                </div>


                <Form>
                  <Row>
                    <Form.Group className="mb-3 col-lg-6" controlId="formBasicfname">
                      <Form.Label className='text-left'>First Name</Form.Label>
                      <Form.Control type="text" name="fname" placeholder="First Name" value={normalinput.fname} onChange={setUserInputs} />
                    </Form.Group>
                    <Form.Group className="mb-3 col-lg-6" controlId="formBasiclname">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control type="text" name="lname" placeholder="Last Name" value={normalinput.lname} onChange={setUserInputs} />
                    </Form.Group>
                    <Form.Group className="mb-3 col-lg-6" controlId="formBasicemail">
                      <Form.Label>Email Address</Form.Label>
                      <Form.Control type="email" name="email" placeholder="Email Address" value={normalinput.email} onChange={setUserInputs} />
                    </Form.Group>
                    <Form.Group className="mb-3 col-lg-6" controlId="formBasicmobile">
                      <Form.Label>Mobile Number</Form.Label>
                      <Form.Control type="text" name="mobile" placeholder="Mobile Number" value={normalinput.mobile} onChange={setUserInputs} />
                    </Form.Group>
                    <Form.Group className="mb-3 col-lg-6" controlId="formBasicgender">
                      <Form.Label>Select Gender</Form.Label>
                      <Form.Check type="radio" label={'Male'} name="gender" checked={normalinput.gender==='Male'?true:false} value={'Male'} aria-label="radio 1" onChange={setUserInputs} />
                      <Form.Check type="radio" label={'Female'} name="gender" checked={normalinput.gender==='Female'?true:false} value={'Female'} aria-label="radio 2" onChange={setUserInputs} />

                    </Form.Group>
                    <Form.Group className="mb-3 col-lg-6" controlId="formBasicstaus">
                      <Form.Label>Select Employee status </Form.Label>
                      <Select options={options} placeholder={status} onChange={setStatusValue}>

                      </Select>
                    </Form.Group>
                    <Form.Group className="mb-3 col-lg-6" controlId="formBasicprofile">
                      <Form.Label>Choose Profile Picture</Form.Label>
                      <Form.Control type="file" name="user_profile" onChange={setProfileImage} />
                    </Form.Group>
                    <Form.Group className="mb-3 col-lg-6" controlId="formBasiclocation">
                      <Form.Label>Employee Location</Form.Label>
                      <Form.Control type="text" name="location" placeholder="Employee Location" value={normalinput.location} onChange={setUserInputs} />
                    </Form.Group>
                    <div className='d-flex justify-content-cener w-100'>
                      <Button onClick={handleUpdate} variant='primary' className='mt-3 w-25 ' style={{ display: "block", margin: "0 auto" }}>Update</Button>
                    </div>
                  </Row>
                </Form>
              </div>
            </Card>
      </div>
   
    </div>
    
    }
       <ToastContainer />
  </>
  )
}

export default Edit