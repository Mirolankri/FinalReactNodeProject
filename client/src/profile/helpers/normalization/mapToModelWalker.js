const mapProfileToModelWalker = (profile) => {
    return ({
        first: profile.name.first,
        last: profile.name.last,
        birth: profile.birth,
        gender: profile.gender,
        phone: profile.phone,
        city: profile.address.city,
        street: profile.address.street,
        dogCount: profile.dogWalker.dogCount,
        payBy: profile.dogWalker.payBy,
        mobile: profile.dogWalker.mobile,
        experience: profile.dogWalker.experience,
        bigDogs: profile.dogWalker.bigDogs,
        about: profile.dogWalker.about
    })
}

export default mapProfileToModelWalker