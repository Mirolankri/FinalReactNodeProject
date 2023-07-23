const mapProfileToModelProfile = (profile) => {
    return ({
        first: profile.name.first,
        last: profile.name.last,
        birth: profile.birth,
        gender: profile.gender,
        phone: profile.phone,
        city: profile.address.city,
        street: profile.address.street
    })
}

export default mapProfileToModelProfile