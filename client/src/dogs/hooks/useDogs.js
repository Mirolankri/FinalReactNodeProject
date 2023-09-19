import React, { useCallback, useMemo, useState } from 'react'
import { useUser } from '../../users/providers/UserProvider'
import { useNavigate } from 'react-router-dom'
import { useToast } from '../../providers/ToastProvider'
import normalizeProfileDog from '../helpers/normalization/normalizeProfileDog'
import { createDog } from '../service/ApiService'


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
        } catch (error) {
            requestStatus(error, null)
        }
    }, [] )

      return {
        handleCreate,
      };
}



export default useDogs