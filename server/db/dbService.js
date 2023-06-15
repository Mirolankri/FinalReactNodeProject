// const ENV = "dev"
// const ENV = "prod"

const connectToDB = (_ENV) =>{
    if(_ENV === "development") require("./mongodb/ConnectToMongoLocally")
    if(_ENV === "production") require("./mongodb/connectToAtlas")
}

module.exports = connectToDB