import { useEffect } from "react"
import { func, object, string } from 'prop-types'
import Form from '../../forms/components/Form'
import Input from '../../forms/components/Input'
import ROUTES from "../../routes/routesModel"

const ProfileOwnerForm = ({ onSubmit, onReset, onFormChange, onInputChange, title, subTitle, data, errors }) => {
    let birth
    let dayBirth
    let monthBirth
    let yearBirth

    if(data.birth !== '' && data.birth != null){
        birth = new Date(data.birth)
        dayBirth = ('0' + birth.getDate()).slice(-2)
        monthBirth = ('0' + (birth.getMonth()+1)).slice(-2)
        yearBirth = birth.getFullYear()
        data.birth = `${yearBirth}-${monthBirth}-${dayBirth}`
    } else {
        birth = new Date()
        dayBirth = ('0' + birth.getDate()).slice(-2)
        monthBirth = ('0' + (birth.getMonth()+1)).slice(-2)
        yearBirth = birth.getFullYear()-18
        data.birth = `${yearBirth}-${dayBirth}-${dayBirth}`
    }

    return (
        <Form title={title} subTitle={subTitle} onSubmit={onSubmit} onReset={onReset} onChange={onFormChange} to={ROUTES.PROFILE_OWNER} >
            <Input varient='text' type='text' error={errors.first} onChange={onInputChange} data={data} name='first' label='שם פרטי' errMsg='יש להזין שם פרטי.' />
            <Input varient='text' type='text' error={errors.last} onChange={onInputChange} data={data} name='last' label='שם משפחה' errMsg='יש להזין שם משפחה.' />
            <Input varient='date' error={errors.bitrh} onChange={onInputChange} data={data} name='birth' label='תאריך לידה' errMsg='יש להזין תאריך.' />
            <Input varient='select' error={errors.gender} onChange={onInputChange} data={data} name='gender' label='מגדר' options={[{val: 'male', text: 'זכר'},{val: 'female', text: 'נקבה'},{val: 'other', text: 'אחר'}]} errMsg='יש לבחור מגדר.' />
            <Input varient='text' error={errors.phone} onChange={onInputChange} data={data} name='phone' label='מספר נייד' errMsg='יש להכניס מספר סלולארי ישראלי בעל 10 ספרות.' />
            <Input varient='text' error={errors.city} onChange={onInputChange} data={data} name='city' label='כתובת מגורים - עיר' errMsg='יש להזין עיר מגורים.' />
            <Input varient='text' error={errors.street} onChange={onInputChange} data={data} name='street' label='כתובת מגורים - רחוב' errMsg='יש להזין כתובת מגורים.' />
            <Input varient='select' error={errors.payBy} onChange={onInputChange} data={data} name='payBy' label='כיצד תעדיף להשתכר?'  options={[{val: 'Cash', text:'מזומן'},{val: 'Bit', text:'העברה באמצעות Bit'},{val: 'Other', text:'אחר'}]} errMsg='יש לבחור אחת מהאפשרויות.' />
            <Input varient='select' error={errors.mobile} onChange={onInputChange} data={data} name='mobile' label='האם אתה נייד?' options={[{val: 'yes', text:'כן'},{val: 'no', text:'לא'}]} errMsg='יש לבחור אחת מהאפשרויות.' />
            <Input isTextArea={true} varient='text' error={errors.about} onChange={onInputChange} data={data} name='about' label='ספר.י לנו קצת עליך' errMsg='יש לכתוב כמה מילים המתארות אותך.' />
        </Form>
    )
}

ProfileOwnerForm.propTypes = {
    title: string.isRequired,
    subTitle: string.isRequired,
    onSubmit: func.isRequired,
    onReset: func.isRequired,
    onFormChange: func.isRequired
}

export default ProfileOwnerForm