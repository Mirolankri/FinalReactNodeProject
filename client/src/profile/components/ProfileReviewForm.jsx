import React from 'react'
import PropTypes from 'prop-types'
import Form from '../../forms/components/Form'
import ROUTES from '../../routes/routesModel'
import Input from '../../forms/components/Input'

const ProfileReviewForm = ({ title, onSubmit, onReset, onFormChange, to, errors, onInputChange, data }) => {
  return (
    <Form title={title} subTitle={''} onSubmit={onSubmit} onReset={onReset} onChange={onFormChange} to={to} >
      <Input varient='text' type='text' error={errors.content} onChange={onInputChange} data={data} name='content' label='השארת ביקורת' errMsg='יש לכתוב בקצרה.'/>
      <Input varient='select' error={errors.rate} onChange={onInputChange} data={data} name='rate' label='השארת דירוג' options={[{val: 1, text: '1 - נמוך'},{val: 2, text: '2'},{val: 3, text: '3'},{val: 4, text: '4'},{val: 5, text: '5 - גבוה'}]} errMsg='יש לבחור מגדר.' />
    </Form>
  )
}

ProfileReviewForm.propTypes = {}

export default ProfileReviewForm