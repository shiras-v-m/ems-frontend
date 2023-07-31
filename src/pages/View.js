import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import Emsspinner from '../components/Emsspinner'
import { useParams } from 'react-router-dom'
import { BASE_URL } from '../services/base_url'
import { viewEmployee } from '../services/allApis'

function View() {
  const { id } = useParams()
  console.log(id);

  const [viewemployee, setEmployee] = useState({})

  const viewuser = async () => {
    const {data} = await viewEmployee(id)
    setEmployee(data)
  }
  console.log(viewemployee);

  const [showSpin, setShowspin] = useState(true)
  useEffect(() => {
    viewuser()
    setTimeout(() => {
      setShowspin(false)
    }, 2000);
  },[])

  



  return (
    <>

      {showSpin ? <Emsspinner className="mb-5" /> :

        <div className="container">
          <Card className='shadow col-lg-6 mx-auto mt-5 border'></Card>
          <Card.Body>

            <div className="profile d-flex-justify-content-center">
              <div className="image-block text-center">
                <img className=" rounded-circle border p-1" style={{ width: "200px", height: "200px", borderRadius: "100%" }} 
                src={`${BASE_URL}/uploads/${viewemployee.profile}`} alt="image" />
              </div>
            </div>
            <div className="text-center mt-3">
              <h3>{viewemployee.fname} {viewemployee.lname}</h3>
              <h5><i class="fa-solid fa-envelope fa-beat" style={{ color: "#ff0000" }}></i> : <span>{viewemployee.email}</span></h5>
              <h5><i class="fa-solid fa-mobile-screen-button" style={{ color: "#ff0000" }}></i> : <span>{viewemployee.mobile}</span></h5>

              <h5><i class="fa-solid fa-venus-mars" style={{ color: "#ff8000" }}></i> : <span>{viewemployee.gender}</span></h5>

              <h5><i class="fa-solid fa-signal" style={{color:"#ff8000"}}></i> : <span>{viewemployee.status}</span></h5>

              <h5><i class="fa-solid fa-location-dot" style={{ color: "#00ff00" }}></i> : <span>{viewemployee.location}</span></h5>

            </div>

          </Card.Body>
        </div>
      }
    </>
  )
}

export default View