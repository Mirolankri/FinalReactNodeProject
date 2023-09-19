import { useEffect } from "react"
import { func, object, string } from 'prop-types'
import Form from '../../forms/components/Form'
import Input from '../../forms/components/Input'
import ROUTES from '../../routes/routesModel'
import Text from "../../forms/components/Text"

const ProfileDogForm = ({ onSubmit, onReset, onFormChange, onInputChange, title, subTitle, data, errors }) => {
    let birth
    let dayBirth
    let monthBirth
    let yearBirth

    // console.log(data);
    if(data.birth !== '' && data.birth != null){
        birth = new Date(data.birth)
        dayBirth = ('0' + birth.getDate()).slice(-2)
        monthBirth = ('0' + (birth.getMonth()+1)).slice(-2)
        yearBirth = birth.getFullYear()
        data.birth = `${yearBirth}-${monthBirth}-${dayBirth}`
    } else {
        birth = new Date()
        console.log(birth);
        dayBirth = ('0' + birth.getDate()).slice(-2)
        monthBirth = ('0' + (birth.getMonth()+1)).slice(-2)
        yearBirth = birth.getFullYear()-10
        data.birth = `${yearBirth}-${dayBirth}-${dayBirth}`
    }

    return (
        <Form title={title} subTitle={subTitle} onSubmit={onSubmit} onReset={onReset} onChange={onFormChange} to={ROUTES.PROFILE_OWNER} >
            <Input varient='text' type='text' error={errors.name} onChange={onInputChange} data={data} name='name' label='שם' errMsg='יש להזין שם.' />
            <Input varient='select' error={errors.gender} onChange={onInputChange} data={data} name='gender' label='מגדר' options={[{val: 'male', text: 'זכר'},{val: 'female', text: 'נקבה'}]} errMsg='יש לבחור מגדר.' />
            <Input varient='select' error={errors.allergy} onChange={onInputChange} data={data} name='allergy' label='אלרגיות?' options={[{val: 'yes', text:'כן'},{val: 'no', text:'לא'}]} errMsg='יש לבחור אחת מהאפשרויות.' />
            <Input varient='date' error={errors.bitrh} onChange={onInputChange} data={data} name='birth' label='תאריך לידה' errMsg='יש להזין תאריך.' />
            <Input varient='select' error={errors.meetdogs} onChange={onInputChange} data={data} name='meetdogs' label='למנוע מפגש עם כלבים אחרים?' options={[{val: 'yes', text:'כן'},{val: 'no', text:'לא'}]} errMsg='יש לבחור אחת מהאפשרויות.' />
            <Input varient='select' error={errors.meetpepole} onChange={onInputChange} data={data} name='meetpepole' label='למנוע מפגש עם אנשים אחרים?' options={[{val: 'yes', text:'כן'},{val: 'no', text:'לא'}]} errMsg='יש לבחור אחת מהאפשרויות.' />
            
            <Text isTextArea={true} varient='text' error={errors.about} onChange={onInputChange} data={data} name='about' placeholder='ספר.י לנו קצת על..' errMsg='יש לכתוב כמה מילים המתארות את כלבך.' />
        </Form>
    )
}

ProfileDogForm.propTypes = {
    title: string.isRequired,
    subTitle: string.isRequired,
    onSubmit: func.isRequired,
    onReset: func.isRequired,
    onFormChange: func.isRequired
}

export default ProfileDogForm