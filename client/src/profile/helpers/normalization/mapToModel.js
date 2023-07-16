const mapProfileToModel = (profile) => {
    return {
        first: profile.name.first || '',
        last: profile.name.last || '',
        birth: profile.birth || '',
        gender: profile.gender || '',
        address: `${profile.address.street} ${profile.address.houseNumber} || '', ${profile.address.city}` || '',
        phone: profile.phone || '',
        dogCount: profile.dogWalker.dogCount || '',
        payBy: profile.dogWalker.payBy || '',
        mobile: profile.dogWalker.mobile || '',
        experience: profile.experience || '',
        bigDogs: profile.bigDogs || ''
    }
}

export default mapProfileToModel