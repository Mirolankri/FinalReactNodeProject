export const currentTime = Date.now();

export const ConvertStringToDate = (_StringDate)=> new Date(_StringDate)

export const AddHourToDate = (_DateInMili) => {

    const date = new Date(_DateInMili); // Create a new Date object representing the current date and time
    const milliseconds = date.getTime(); // Get the current date in milliseconds

    // date.setHours(date.getHours() + 3); // Add 3 hours to the date object
return date
    // return _DateInMili.setHours(_DateInMili.getHours() + 3); // Add 3 hours to the date object

}
export const getAgeFromBirth = (birthDate) => {
    const now = new Date()
    birthDate = new Date(birthDate)
    const month = now.getMonth() - birthDate.getMonth()
    let age = now.getFullYear() - birthDate.getFullYear()
    if (month < 0 || (month === 0 && now.getDate() < birthDate.getDate()) ){
      age--
    }
    return age
  }

  export const calculateDogAge = (ageInYears, size = 'small') => {
    // Create a lookup table for age conversion based on size
    const ageTable = {
      small: [15, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 68, 72, 76],
      medium: [15, 24, 28, 32, 36, 42, 47, 51, 56, 60, 65, 69, 74, 78, 83],
      large: [15, 24, 28, 32, 36, 45, 50, 55, 61, 66, 72, 77, 82, 88, 93],
    };
  
    if (ageInYears >= 1 && ageInYears <= 15) {
      // Ensure age is within the valid range
      if (ageTable[size]) {
        return ageTable[size][ageInYears - 1];
      }
    }
  
    return "Invalid input";
  }