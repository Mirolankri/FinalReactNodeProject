import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import * as Icon from 'react-bootstrap-icons'


import LoaderComponent from '../../components/LoaderComponent'
import { useUser } from '../../users/providers/UserProvider'
import PageHeader from '../../components/PageHeader'
import { Link } from 'react-router-dom'
import ROUTES from '../../routes/routesModel'

export const DogsPage = () => {
    const {userData,useUserType} = useUser()
    const [isLoading, setIsLoading] = useState(true)
    console.log(userData);
    const DogList = [{id:1,name:"מוקה"},{id:2,name:"שושה"},{id:3,name:"שימי"}]
    useEffect(() => {
        // // Simulate a delay to represent page loading (remove this in your actual code)
        const delay = setTimeout(() => {
          setIsLoading(false);
        }, 3000); // Change the delay time to suit your needs
    
        // Clean up the timeout when the component unmounts
        return () => clearTimeout(delay);
      }, []);

    if(isLoading) return <LoaderComponent/>

  return (
    <>
    <PageHeader _title={'הכלבים שלי'} RightComponentFill={<ButtonCURD/>} />
    {/* <LoaderComponent/> */}

    {!!DogList && 
        DogList.map((dog,index)=>{
          console.log(index,dog);
        return (
          <div key={dog.id}>{dog.id} - {dog.name}</div>
        )
    }
    )}
    
    </>
  )
}

export const ButtonCURD = ()=>{
    return (
        <>
        <Link to={ROUTES.DOG_ADD}>
            <Button variant="orange" className="rounded-bottom">הוספת כלב/ה <Icon.PlusLg/></Button>
        </Link>
        </>

    )
}