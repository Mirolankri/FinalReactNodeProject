const normalizeProfileDog = (profile) => {
    return {
        name:profile.name,
        gender: profile.gender,
        allergy: profile.allergy,
        birth: profile.birth,
        meetdogs: profile.meetdogs,
        meetpepole: profile.meetpepole,
        about: profile.about,
        user_id: profile.user_id,
        active:true
    }
}

export default normalizeProfileDog