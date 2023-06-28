const nameUpper = (string) => {
    let upName = string.split(" ")
    for(let i=0; upName.length > i; i++){
        upName[i] = upName[i][0].toUpperCase() + upName[i].substring(1)
    }
    upName.join(' ')
    return `${upName}`
}

module.exports = { nameUpper }