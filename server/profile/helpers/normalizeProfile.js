const normalizeProfile = rawProfile => {
    const dogOwner = {
        ...rawProfile.dogOwner,
    } || ""
    
    const dogWalker = {
        ...rawProfile.dogWalker
    } || ""

    const profile = {
        ...rawUser,
        dogOwner,
        dogWalker
    }

    return profile
}

module.exports = normalizeProfile