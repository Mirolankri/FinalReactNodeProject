import React from 'react'
import PropTypes from 'prop-types'
import Form from '../../forms/components/Form'
import Input from '../../forms/components/Input'

const ProfileForm = ({ onSubmit, onReset, onFormChange, title, errors, data, onInputChange, setData }) => {
    return (
        <Form title={title} onSubmit={onSubmit} onReset={onReset} to='/'>
            <Input type='text' id='first_name' label='שם פרטי' style={{ maxWidth: 'calc(50% - 8px)', flexBasis: 'calc(50% - 8px)' }} />
            <Input type='text' id='last_name' label='שם משפחה' style={{ maxWidth: 'calc(50% - 8px)', flexBasis: 'calc(50% - 8px)' }} />
            <Input type='date' id='birth' label='תאריך לידה' style={{ maxWidth: 'calc(50% - 8px)', flexBasis: 'calc(50% - 8px)' }} />
            <Input type='text' id='gander' label='מין' style={{ maxWidth: 'calc(50% - 8px)', flexBasis: 'calc(50% - 8px)' }}  />
            <Input type='text' id='address' label='כתובת מגורים' style={{ maxWidth: 'calc(50% - 8px)', flexBasis: 'calc(50% - 8px)' }}  />
            <Input type='text' id='phone' label='מספר נייד' style={{ maxWidth: 'calc(50% - 8px)', flexBasis: 'calc(50% - 8px)' }}  />
            <Input type='text' id='godCount' label='כמות כלבים שתוציא בטיול' style={{ maxWidth: 'calc(50% - 8px)', flexBasis: 'calc(50% - 8px)' }}  />
            <Input type='text' id='payBy' label='?כיצד תעדיף להשכר' style={{ maxWidth: 'calc(50% - 8px)', flexBasis: 'calc(50% - 8px)' }}  />
            <Input type='text' id='mobile' label='האם אתה נייד?' style={{ maxWidth: 'calc(50% - 8px)', flexBasis: 'calc(50% - 8px)' }}  />
            <Input type='text' id='experience' label='האם יש לך נסיון עם כלבים?' style={{ maxWidth: 'calc(50% - 8px)', flexBasis: 'calc(50% - 8px)' }}  />
            <Input type='text' id='bigDog' label='האם אתה מפחד מכלבים גדולים?' style={{ maxWidth: 'calc(50% - 8px)', flexBasis: 'calc(50% - 8px)' }}  />
        </Form>
    )
}

ProfileForm.propTypes = {}

export default ProfileForm