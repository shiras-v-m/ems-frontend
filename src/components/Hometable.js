import React from 'react'
import { Card, Row, Table, Dropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { BASE_URL } from '../services/base_url';

function Hometable({ displaydata,removeEmployee }) {
    // console.log(displaydata);
    return (
        <div className='container mt-5'>
            <h1>All Employee List</h1>
            <Row>
                <div className="col">
                    <Card className='shadow'>
                        <Table striped hover style={{ margin: "0" }}>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Employee Name</th>
                                    <th>Email</th>
                                    <th>Mobile</th>
                                    <th>Status</th>
                                    <th>Profile</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {displaydata?.length > 0 ? displaydata.map((item, index) => (
                                    <tr >
                                        <td>{index+1}</td>
                                        <td>{item.fname} {item.lname}</td>
                                        <td>{item.email}</td>
                                        <td>{item.mobile}</td>
                                        <td>
                                            <span className={item.status === 'Active'? "btn btn-success":"btn btn-danger"}>{item.status}</span>
                                        </td>
                                        <td>
                                            <img style={{ width: "50px", height: "50px", borderRadius: "100%" }} 
                                            src={`${BASE_URL}/uploads/${item.profile}`}
                                             alt="image" />
                                        </td>
                                        <td>
                                            <Dropdown>
                                                <Dropdown.Toggle style={{ margin: "0", border: "none" }} variant="light" id="dropdown-basic">

                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    <Dropdown.Item><Link to={`/view/${item._id}`} style={{ textDecoration: 'none', color: "white" }}><i class="fa-solid fa-eye me-1" style={{ color: "#ff8000" }}></i>View </Link></Dropdown.Item>

                                                    <Dropdown.Item><Link to={`/edit/${item._id}`} style={{ textDecoration: "none", color: "white" }}><i class="fa-solid fa-pen-to-square me-1" style={{ color: "#00ff00" }}></i> Edit</Link></Dropdown.Item>

                                                    <Dropdown.Item>
                                                       <div onClick={()=>removeEmployee(item._id)}>
                                                        <i class="fa-solid fa-trash me-1" style={{ color: "#ff0000" }}></i> Delete </div>
                                                    </Dropdown.Item>
                                                      
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr className='d-flex justify-content-center align-items-center mt-5 text-danger'>Sorry Nothing to find</tr>
                                )}
                            </tbody>
                        </Table>
                    </Card>
                </div>
            </Row>
        </div>
    )
}

export default Hometable