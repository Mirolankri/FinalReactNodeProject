const normalizeProfile = (rawProfile, dbProfile) => {
    const dogOwner = {
        ...rawProfile.dogOwner,
        payBy: rawProfile.dogOwner.payBy || dbProfile.dogOwner.payBy,
        mobile: rawProfile.dogOwner.mobile || dbProfile.dogOwner.mobile,
        about: rawProfile.dogOwner.about || dbProfile.dogOwner.about
    } || ""
    
    const dogWalker = {
        ...rawProfile.dogWalker,
        dogCount: rawProfile.dogWalker.dogCount || dbProfile.dogWalker.dogCount,
        payBy: rawProfile.dogWalker.payBy || dbProfile.dogWalker.payBy,
        mobile: rawProfile.dogWalker.mobile || dbProfile.dogWalker.mobile,
        experience: rawProfile.dogWalker.experience || dbProfile.dogWalker.experience,
        bigDogs: rawProfile.dogWalker.bigDogs || dbProfile.dogWalker.bigDogs,
        about: rawProfile.dogWalker.about || dbProfile.dogWalker.about
    } || ""

    const profile = {
        ...rawUser,
        dogOwner,
        dogWalker
    }

    return profile
}

module.exports = normalizeProfile