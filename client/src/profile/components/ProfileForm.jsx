import React from 'react'
import { func, object, string } from 'prop-types'
import Form from '../../forms/components/Form'
import Input from '../../forms/components/Input'
import { useUser } from '../providers/UserProvider'

const ProfileForm = ({ onSubmit, onReset, onFormChange, title, subTitle, data }) => {
    let birth
    let dayBirth
    let monthBirth
    let yearBirth
    if(data.birth !== ''){
        birth = new Date(data.birth)
        dayBirth = ('0' + birth.getDate()).slice(-2)
        monthBirth = ('0' + (birth.getMonth()+1)).slice(-2)
        yearBirth = birth.getFullYear()
    } else {
        birth = new Date()
        dayBirth = ('0' + birth.getDate()).slice(-2)
        monthBirth = ('0' + (birth.getMonth()+1)).slice(-2)
        yearBirth = birth.getFullYear()-18
    }
    return (
        <Form title={title} subTitle={subTitle} onSubmit={onSubmit} onReset={onReset} onChange={onFormChange} to='/' >
            <Input type='text' value={data.first} id='first_name' label='שם פרטי' />
            <Input type='text' value={data.last} id='last_name' label='שם משפחה' />
            <Input type='date' value={`${yearBirth}-${monthBirth}-${dayBirth}`} id='birth' label='תאריך לידה' />
            <Input isSelect={true} id='gander' label='מין' placeholder='יש לבחור אחת מהאפשרויות' options={[{val: 'male', text: 'זכר'},{val: 'female', text: 'נקבה'},{val: 'other', text: 'אחר'}]}  />
            <Input type='text' value={data.address} placeholder='יש להזין כתובת מגורים הכוללת עיר, רחוב ומספר בית' id='address' label='כתובת מגורים'  />
            <Input type='text' value={data.phone} id='phone' label='מספר נייד'  />
            <Input isSelect={true} placeholder='יש לבחור אחת מהאפשרויות' id='dogCount' label='כמות כלבים שתוציא בטיול' options={[{val: 1, text: 'כלב אחד'},{val: 2, text: 'שני כלבים'},{val: 3, text: 'שלושה כלבים'},{val: 4, text: 'ארבעה כלבים'},{val: 5, text: 'חמישה כלבים'}]} formText={'אנחנו דוגלים במתן דגש על תשומת הלב לכלבים. לא ניתן להוליך מעבר לחמישה כלבים.'}  />
            <Input isSelect={true} placeholder='יש לבחור אחת מהאפשרויות' options={[{val: 'cash', text:'מזומן'},{val: 'bit', text:'העברה באמצעות Bit'},{val: 'other', text:'אחר'}]} id='payBy' label='כיצד תעדיף להשתכר?'  />
            <Input isSelect={true} placeholder='יש לבחור אחת מהאפשרויות' options={[{val: true, text:'כן'},{val: false, text:'לא'}]} id='mobile' label='האם אתה נייד?'  />
            <Input isSelect={true} placeholder='יש לבחור אחת מהאפשרויות' options={[{val: 'base', text:'בסיסי'},{val: 'verified', text:'בעל תעודת אילוף'},{val: 'no', text:'אין'},{val: 'other', text:'אחר'}]} id='experience' label='האם יש לך נסיון עם כלבים?'  />
            <Input isSelect={true} placeholder='יש לבחור אחת מהאפשרויות' options={[{val: true, text:'כן'},{val: false, text:'לא'}]} id='bigDog' label='האם אתה מפחד מכלבים גדולים?'  />
        </Form>
    )
}

ProfileForm.propTypes = {
    onSubmit: func.isRequired,
    onReset: func.isRequired,
    onFormChange: func.isRequired,
    title: string.isRequired,
    subTitle: string.isRequired,
    errors: object.isRequired,
    data: object.isRequired,
    onInputChange: func.isRequired,
    setData: func.isRequired
}

export default ProfileForm