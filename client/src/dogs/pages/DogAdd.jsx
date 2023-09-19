import React from 'react'
import PageHeader from '../../components/PageHeader'
import { useUser } from '../../users/providers/UserProvider'
import { Navigate, useNavigate } from 'react-router-dom'
import ROUTES from '../../routes/routesModel'
import ProfileDogForm from '../components/ProfileDogForm'
import useForm from '../../forms/hooks/useForm'
import initialProfileDogForm from '../helpers/initialForms/initialProfileDogForm'
import updateProfileDogSchema from '../models/joi-schema/updateProfileDogSchema'
import useDogs from '../hooks/useDogs'

export const DogAdd = () => {
  const { userData } = useUser()
  const navigate = useNavigate()
  const {handleCreate} = useDogs()

  const { value, ...rest } = useForm(initialProfileDogForm, updateProfileDogSchema, ()=>{
    console.log("in submit",value.data);
    console.log("in userData",userData);
    handleCreate(value.data, userData._id)
})
  if(!userData) return <Navigate replace to={ROUTES.LOGIN} />

  return (
    <>
    {/* <PageHeader _title={'הוספה'} /> */}
    <ProfileDogForm title='יצירת פרופיל כלב' subTitle='ספר.י לנו קצת על...' onSubmit={rest.onSubmit} errors={value.errors} onReset={rest.handleReset} onFormChange={rest.validateForm} onInputChange={rest.handleChange} data={value.data}/>

    </>
  )
}
