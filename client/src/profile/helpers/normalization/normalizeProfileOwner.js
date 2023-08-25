const normalizeProfile = (profile) => {
    return {
        name:{
            first: profile.first,
            last: profile.last,
        },
        birth: profile.birth,
        gender: profile.gender,
        phone: profile.phone,
        address: {
            city: profile.city,
            street: profile.street
        },
        dogOwner: {
            payBy: profile.payBy,
            mobile: profile.mobile,
            about: profile.about
        },
        user_id: profile.user_id
    }
}

export default normalizeProfile