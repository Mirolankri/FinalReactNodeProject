import { useEffect } from "react"
import { func, object, string } from 'prop-types'
import Form from '../../forms/components/Form'
import Input from '../../forms/components/Input'

const ProfileForm = ({ onSubmit, onReset, onFormChange, onInputChange, title, subTitle, data }) => {
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
        <Form title={title} subTitle={subTitle} onSubmit={onSubmit} onReset={onReset} onChange={onFormChange} to='/' >
            <Input type='text' onChange={onInputChange} data={data} name='first' id='first_name' label='שם פרטי' />
            <Input type='text' onChange={onInputChange} data={data} name='last' id='last_name' label='שם משפחה' />
            <Input type='date' onChange={onInputChange} data={data} name='birth' id='birth' label='תאריך לידה' />
            <Input isSelect={true} onChange={onInputChange} data={data} name='gender' id='gender' label='מין' options={[{val: 'male', text: 'זכר'},{val: 'female', text: 'נקבה'},{val: 'other', text: 'אחר'}]}  />
            <Input type='text' onChange={onInputChange} data={data} name='address' id='address' label='כתובת מגורים' formText='יש להזין כתובת מגורים הכוללת עיר, רחוב ומספר בית' />
            <Input type='text' onChange={onInputChange} data={data} name='phone' id='phone' label='מספר נייד' />
            <Input isSelect={true} onChange={onInputChange} data={data} name='dogCount' id='dogCount' label='כמות כלבים שתוציא בטיול' options={[{val: 1, text: 'כלב אחד'},{val: 2, text: 'שני כלבים'},{val: 3, text: 'שלושה כלבים'},{val: 4, text: 'ארבעה כלבים'},{val: 5, text: 'חמישה כלבים'}]} formText={'אנחנו דוגלים במתן דגש על תשומת הלב לכלבים. לא ניתן להוליך מעבר לחמישה כלבים.'}  />
            <Input isSelect={true} onChange={onInputChange} data={data} name='payBy' options={[{val: 'cash', text:'מזומן'},{val: 'Bit', text:'העברה באמצעות Bit'},{val: 'other', text:'אחר'}]} id='payBy' label='כיצד תעדיף להשתכר?'  />
            <Input isSelect={true} onChange={onInputChange} data={data} name='mobile' options={[{val: true, text:'כן'},{val: false, text:'לא'}]} id='mobile' label='האם אתה נייד?'  />
            <Input isSelect={true} onChange={onInputChange} data={data} name='experience' options={[{val: 'base', text:'בסיסי'},{val: 'verified', text:'בעל תעודת אילוף'},{val: 'no', text:'אין'},{val: 'other', text:'אחר'}]} id='experience' label='האם יש לך נסיון עם כלבים?'  />
            <Input isSelect={true} onChange={onInputChange} data={data} name='bigDogs' options={[{val: true, text:'כן'},{val: false, text:'לא'}]} id='bigDogs' label='האם אתה מפחד מכלבים גדולים?'  />
        </Form>
    )
}

ProfileForm.propTypes = {
    title: string.isRequired,
    subTitle: string.isRequired,
    onSubmit: func.isRequired,
    onReset: func.isRequired,
    onFormChange: func.isRequired
}

export default ProfileForm