import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useUser } from '../../users/providers/UserProvider'

const CreateAppointment = () => {
    const { UserID } = useParams()
    const { userData,DogsData } = useUser()
    console.log(DogsData);
    const navigate = useNavigate()
  
    if(!userData) return
    if(!DogsData)return
    console.log(DogsData);
  return (
    <div>CreateAppointment

        <br></br>
        <br></br>
        {userData.username}
        <br></br>
        {DogsData.map((dog,index)=>(
            <div id={index}>
                {dog.name}
                <br></br>
            </div>
        ))}
    </div>
  )
}

export default CreateAppointment