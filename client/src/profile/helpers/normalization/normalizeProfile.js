const normalizeProfile = (profile) => {
    return {
        first: profile.first,
        last: profile.last,
        birth: profile.birth,
        gender: profile.gender,
        address: `${profile.address.street} ${profile.address.houseNumber}, ${profile.address.city}`,
        phone: profile.phone,
        dogWalker: {
            dogCount: profile.dogCount,
            payBy: profile.payBy,
            mobile: profile.mobile,
        },
        experience: profile.experience,
        bigDogs: profile.bigDogs,
        user_id: profile.user_id
    }
}

export default normalizeProfile