import { BASE_URL } from "./base_url";
import { commonRequest } from "./commonHTTPRequest";





// register api
export const register = async (body,header)=>{
    return await commonRequest("POST",`${BASE_URL}/register`,body,header)
}

// allemployees

export const getallemployees = async(search) =>{
    return await commonRequest("GET",`${BASE_URL}/all-employees?search=${search}`,"","") //query parameter passing
}

// view-employee

export const viewEmployee = async(id) =>{
    return await commonRequest("GET",`${BASE_URL}/view-employee/${id}`,"")
}



//remove user
export const deleteEmployee = async(id)=>{
    return await commonRequest("DELETE",`${BASE_URL}/remove-employee/${id}`,{}) // body is empty object onlu in delete {}
}

// edit user
export const editEmployee = async(id,body) =>{
    return await commonRequest("PUT",`${BASE_URL}/edit-employee/${id}`,body)
}
