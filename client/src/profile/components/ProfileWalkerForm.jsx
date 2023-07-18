import { useEffect } from "react"
import { func, object, string } from 'prop-types'
import Form from '../../forms/components/Form'
import Input from '../../forms/components/Input'

const ProfileWalkerForm = ({ onSubmit, onReset, onFormChange, onInputChange, title, subTitle, data, errors }) => {
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
        <Form title={title} errors={errors} subTitle={subTitle} onSubmit={onSubmit} onReset={onReset} onChange={onFormChange} to='/' >
            <Input isTextArea={false} type='text' errors={errors} onChange={onInputChange} data={data} name='first' label='שם פרטי' />
            <Input isTextArea={false} type='text' errors={errors} onChange={onInputChange} data={data} name='last' label='שם משפחה' />
            <Input isTextArea={false} type='date' errors={errors} onChange={onInputChange} data={data} name='birth' label='תאריך לידה' />
            <Input isSelect={true} errors={errors} onChange={onInputChange} data={data} name='gender' label='מגדר' options={[{val: 'male', text: 'זכר'},{val: 'female', text: 'נקבה'},{val: 'other', text: 'אחר'}]}  />
            <Input isTextArea={false} type='text' errors={errors} onChange={onInputChange} data={data} name='phone' label='מספר נייד' />
            <Input isTextArea={false} type='text' errors={errors} onChange={onInputChange} data={data} name='city' label='כתובת מגורים - עיר' />
            <Input isTextArea={false} type='text' errors={errors} onChange={onInputChange} data={data} name='street' label='כתובת מגורים - רחוב' />
            <Input isSelect={true} errors={errors} onChange={onInputChange} data={data} name='dogCount' label='כמות כלבים שתוציא בטיול' options={[{val: 1, text: 'כלב אחד'},{val: 2, text: 'שני כלבים'},{val: 3, text: 'שלושה כלבים'},{val: 4, text: 'ארבעה כלבים'},{val: 5, text: 'חמישה כלבים'}]} formText={'אנחנו דוגלים במתן דגש על תשומת הלב לכלבים. לא ניתן להוליך מעבר לחמישה כלבים.'}  />
            <Input isSelect={true} errors={errors} onChange={onInputChange} data={data} name='payBy' label='כיצד תעדיף להשתכר?'  options={[{val: 'Cash', text:'מזומן'},{val: 'Bit', text:'העברה באמצעות Bit'},{val: 'Other', text:'אחר'}]} />
            <Input isSelect={true} errors={errors} onChange={onInputChange} data={data} name='mobile' label='האם אתה נייד?' options={[{val: true, text:'כן'},{val: false, text:'לא'}]} />
            <Input isSelect={true} errors={errors} onChange={onInputChange} data={data} name='experience' label='האם יש לך נסיון עם כלבים?' options={[{val: 'base', text:'בסיסי'},{val: 'verified', text:'בעל תעודת אילוף'},{val: 'no', text:'אין'},{val: 'other', text:'אחר'}]} />
            <Input isSelect={true} errors={errors} onChange={onInputChange} data={data} name='bigDogs' label='האם אתה מפחד מכלבים גדולים?' options={[{val: true, text:'כן'},{val: false, text:'לא'}]} />
            <Input isTextArea={true} type='text' errors={errors} onChange={onInputChange} data={data} name='about' label='ספר.י לנו קצת עליך' />
        </Form>
    )
}

ProfileWalkerForm.propTypes = {
    title: string.isRequired,
    subTitle: string.isRequired,
    onSubmit: func.isRequired,
    onReset: func.isRequired,
    onFormChange: func.isRequired
}

export default ProfileWalkerForm