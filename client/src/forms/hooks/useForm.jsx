import { useState, useCallback, useMemo } from 'react'
import { func, object } from 'prop-types'
import Joi from 'joi'

const useForm = (initialForm, schema, handleSubmit) => {
  const [data, setData] = useState(initialForm)
  const [resetData, setResetData] = useState(initialForm)
  const [errors, setErrors] = useState({})

  const handleReset = useCallback(()=>{
    console.log(resetData);
    setData(resetData)
    setErrors({})
  }, [resetData])

  const validateProperty = useCallback(( { name, value } ) => {
    const obj = { [name]: value }
    const generateSchema = Joi.object({ [name]: schema[name] })
    const { error } = generateSchema.validate(obj)
    return error ? error.details[0].message : null
  }, [schema])

  const handleChange = useCallback( ( { target } ) => {
    const { name, value } = target
    const errorMessage = validateProperty(target)

    if (errorMessage) {
      setErrors((prev) => ({ ...prev, [name]: errorMessage }))
    } else {
      setErrors((prev) => {
        let obj = { ...prev };
        delete obj[name];
        return obj;
      })
    }

    setData((prev) => ({ ...prev, [name]: value }))
  }, [validateProperty])

  const validateForm = useCallback(() => {
    const schemaForValidate = Joi.object(schema)
    const { error ,value} = schemaForValidate.validate(data)
    if (error){
  // console.error(error,value);
      return error
    }
    return null
  }, [schema, data])

  const onSubmit = useCallback(() => {
    handleSubmit(data);
  }, [handleSubmit, data])

  const value = useMemo(() => {
    return { data, errors };
  }, [data, errors])

  return {
    value,
    onSubmit,
    handleChange,
    handleReset,
    validateForm,
    setData,
    setResetData
  }
}

useForm.propTypes = {
  initialForm: object.isRequired,
  schema: object.isRequired,
  handleSubmit: func.isRequired
}

export default useForm