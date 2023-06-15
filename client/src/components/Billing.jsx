import React from 'react'
import { useUser } from "../providers/UserProvider";


const Billing = () => {
    const {userData} = useUser()

  return (
    <div>Billing {JSON.stringify(userData)}</div>
  )
}

export default Billing