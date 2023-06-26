export const currentTime = Date.now();

export const ConvertStringToDate = (_StringDate)=> new Date(_StringDate)

export const AddHourToDate = (_DateInMili) => {

    const date = new Date(_DateInMili); // Create a new Date object representing the current date and time
    const milliseconds = date.getTime(); // Get the current date in milliseconds

    // date.setHours(date.getHours() + 3); // Add 3 hours to the date object
return date
    // return _DateInMili.setHours(_DateInMili.getHours() + 3); // Add 3 hours to the date object

}



