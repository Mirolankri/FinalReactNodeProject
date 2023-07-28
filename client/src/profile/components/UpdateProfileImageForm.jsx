import React from 'react'
import { string, func } from 'prop-types'
import Form from '../../forms/components/Form'
import Input from '../../forms/components/Input'

const UpdateProfileImageForm = ({ title, onSubmit, onReset, onFormChange, to, errors, onInputChange, data }) => {
    return (
        <Form title={title} subTitle={''} onSubmit={onSubmit} onReset={onReset} onChange={onFormChange} to={to} >
            <Input varient='file' error={errors.profileImage} onChange={onInputChange} data={data} name='profileImage' label='תמונת פרופיל' errMsg='ניתן להעלות קבצים בפורמט .jpg, .jpeg, .png בלבד.'/>
        </Form>
    )
}

UpdateProfileImageForm.propTypes = {
    title: string.isRequired,
    subTitle: string.isRequired,
    onSubmit: func.isRequired,
    onReset: func.isRequired,
    onFormChange: func.isRequired
}

export default UpdateProfileImageForm