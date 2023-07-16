const mapProfileToModel = (profile) => {
    return {
        first: profile.name.first || '',
        last: profile.name.last || '',
        birth: profile.birth || '',
        gander: profile.gander || '',
        address: `${profile.address.street} ${profile.address.houseNumber} || '', ${profile.address.city}` || '',
        phone: profile.phone || '',
        dogCount: profile.dogWalker.dogsInTrip || '',
        payBy: profile.dogWalker.payBy || '',
        mobile: profile.dogWalker.mobile || '',
        experience: profile.experience || '',
        bigDog: profile.bigDogs || ''
    }
}

export default mapProfileToModel