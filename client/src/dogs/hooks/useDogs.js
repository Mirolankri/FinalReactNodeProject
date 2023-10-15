import React, { useCallback, useMemo, useState } from 'react'
import { useUser } from '../../users/providers/UserProvider'
import { useNavigate } from 'react-router-dom'
import { useToast } from '../../providers/ToastProvider'
import normalizeProfileDog from '../helpers/normalization/normalizeProfileDog'
import { DeleteDog, UpdateDog, createDog } from '../service/ApiService'
import ROUTES from '../../routes/routesModel'


const useDogs = () => {
    const { userData } = useUser()
    const navigate = useNavigate()
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    const toast = useToast()

    const requestStatus = (errorMessage, reviews) => {
        setError(errorMessage)
        // setReviews(reviews)
    }

    const handleCreate = useCallback( async (reviewFromClient, user_id) => {
        try {
            reviewFromClient.user_id = user_id
            let review = normalizeProfileDog(reviewFromClient)
            review = await createDog(review)
            
            // requestStatus(null, setReviews(prev => ({...prev, review})))
            toast('', 'כלב התווסף בהצלחה')
            // navigate(to_profile)
            navigate(`${ROUTES.DOG_LIST}`)
        } catch (error) {
            requestStatus(error, null)
        }
    }, [] )
    const handleUpdate = useCallback( async (reviewFromClient, _DogID) => {
        try {
            // reviewFromClient.user_id = _DogID
            // let review = normalizeProfileDog(reviewFromClient)
            reviewFromClient = await UpdateDog(reviewFromClient,_DogID)
            
            // requestStatus(null, setReviews(prev => ({...prev, review})))
            toast('', 'פרופיל כלב.ה התעדכן בהצלחה')
            navigate(`${ROUTES.DOG_LIST}`)
        } catch (error) {
            requestStatus(error, null)
        }
    }, [] )

    const handleDelete = useCallback( async (_DogID) => {
        try {
            let DeleteDogByID = await DeleteDog(_DogID)
            console.log("DeleteDogByID",DeleteDogByID);
            // requestStatus(null, setReviews(prev => ({...prev, review})))
            toast('',`${DeleteDogByID?.name} הוסר בהצלחה`)
            // navigate(`${ROUTES.DOG_LIST}`)
            return DeleteDogByID
        } catch (error) {
            requestStatus(error, null)
        }
    }, [] )


      return {
        handleCreate,
        handleUpdate,
        handleDelete
      };
}



export default useDogs