export const OptionUserType = [
    { name: 'בעלים', value: '1' },
    { name: 'דוגווקר', value: '2' },
  ]


export const FindUserType = (_UserTypeNumber)=>{
  let Results = OptionUserType.find(type => type.value == Number(_UserTypeNumber))
  // console.log(Results);
  return Results
}