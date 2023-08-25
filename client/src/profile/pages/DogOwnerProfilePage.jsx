import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useOwnerProfile from '../hooks/useOwnerProfile'
import ROUTES from '../../routes/routesModel'
import Profile from '../components/profile/Profile'
import { useUser } from '../../users/providers/UserProvider'

const DogOwnerProfilePage = () => {
    const { user_id } = useParams()
    const { userData } = useUser()
    const { handleGetProfile, handleGetOwnerReviews, setReviews, value: { profile, reviews } } = useOwnerProfile()
    const navigate = useNavigate()

    const [ stars, setStars ] = useState(0)
    const [ dbProfile, setDbProfile ] = useState(null)

    const onHandleEdit = () => {
        navigate(`${ROUTES.UPDATE_DOGWALKER}/${user_id}`)
    }
    
    useEffect( () => {
        handleGetProfile(user_id).then(data => {
            if(!data) return navigate(`${ROUTES.UPDATE_DOGWALKER}/${user_id}`)

            const walkerProfile = {
                name: data.name,
                birth: data.birth,
                gender: data.gender,
                phone: data.phone,
                address: data.address,
                user_id: data.user_id,
                data: data.dogOwner
            }

            setDbProfile(walkerProfile)

            handleGetOwnerReviews(data.dogOwner._id).then(revData => {
                setReviews(revData)
                let sum = 0
                revData.map( (rev) => {
                sum = sum + rev.rate
                return setStars(sum / revData.length)
            })
            
            })
        })
    }, [user_id] )

    if(!profile) return('Error Owner')

    return (
        <Profile profile={dbProfile} stars={stars} reviews={reviews} handleEdit={onHandleEdit} user_id={userData._id} profile_id={profile._id} kind='owner'/>
    )
}

export default DogOwnerProfilePage