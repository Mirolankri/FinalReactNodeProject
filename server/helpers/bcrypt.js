const bcrypt = require("bcryptjs")

const GeneratePassWord = (_password)=> bcrypt.hashSync(_password,10)

const ComparePassWord = (_password,_dbpassword)=> bcrypt.compareSync(_password,_dbpassword)

module.exports = {GeneratePassWord,ComparePassWord}