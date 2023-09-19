export const OptionUserType = [
    { name: 'בעלים', value: '1',componentname:"HomePageOwner" },
    { name: 'דוגווקר', value: '2',componentname:"HomePageDogWalker" },
  ]


export const FindUserType = (_UserTypeNumber)=>{
  let Results = OptionUserType.find(type => type.value == Number(_UserTypeNumber))
  // console.log(Results);
  return Results
}