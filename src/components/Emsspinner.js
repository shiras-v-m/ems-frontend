import React from 'react'
import { Spinner } from 'react-bootstrap'

function Emsspinner() {
  return (
    <div className='text-center mt-4'>
        <Spinner animation="grow" /> 
        <span className='fw-bolder'>Loading....</span>
    </div>
  )
}

export default Emsspinner