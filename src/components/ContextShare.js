import React, { createContext, useState } from 'react'
export const registerContext = createContext()
export const deleteContext = createContext()


function ContextShare({ children }) {

  //to hols register component data
  const [registerData, setRegisterData] = useState("")
  const [deleterData, setDeleteData] = useState("")


  return (
    <>
      <registerContext.Provider value={{ registerData, setRegisterData }}>
        <deleteContext.Provider value={{deleterData,setDeleteData}}>
          {children}
        </deleteContext.Provider>



      </registerContext.Provider>
    </>
  )
}

export default ContextShare