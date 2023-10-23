import React from 'react'
import PageHeader from '../../components/PageHeader'
import { useUser } from '../../users/providers/UserProvider'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import ROUTES from '../../routes/routesModel'
import ProfileDogForm from '../components/ProfileDogForm'
import useForm from '../../forms/hooks/useForm'
import initialProfileDogForm from '../helpers/initialForms/initialProfileDogForm'
import updateProfileDogSchema from '../models/joi-schema/updateProfileDogSchema'
import useDogs from '../hooks/useDogs'
import normalizeProfileDog from '../helpers/normalization/normalizeProfileDog'

export const DogAdd = () => {
  let LoadDefaultDogProfile = initialProfileDogForm
  const { DogID } = useParams()
  const { userData,DogsData } = useUser()
  console.log(DogsData);
  const navigate = useNavigate()
  const {handleCreate,handleUpdate} = useDogs()

  if(DogID){
    let FindDog = DogsData.find(dog=>dog._id === DogID)
    LoadDefaultDogProfile = FindDog
    LoadDefaultDogProfile = normalizeProfileDog(LoadDefaultDogProfile)
    console.log("LoadDefaultDogProfile",LoadDefaultDogProfile);
  }

  const { value, ...rest } = useForm(LoadDefaultDogProfile, updateProfileDogSchema, ()=>{
    console.log("in submit",value.data);
    console.log("in userData",userData);
    if(DogID) return handleUpdate(value.data, DogID)
    handleCreate(value.data, userData._id)
  })

  if(!userData) return <Navigate replace to={ROUTES.LOGIN} />

  
  
  return (
    <>
    <ProfileDogForm title={DogID?`עריכת פרופיל כלב.ה`:`יצירת פרופיל כלב.ה`} subTitle='ספר.י לנו קצת על...' onSubmit={rest.onSubmit} errors={value.errors} onReset={rest.handleReset} onFormChange={rest.validateForm} onInputChange={rest.handleChange} data={value.data}/>
    </>
  )
}
