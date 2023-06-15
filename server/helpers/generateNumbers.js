const generateID = () => Math.random().toString(36).substring(2, 10);
const generateCode = (_min,_max) => Math.floor(Math.random() * (_max - _min + 1) + _min);

module.exports = {generateCode,generateID}