import React from 'react'
import PropTypes from 'prop-types'

const ProfilePage = props => {
  const user = {
    "_id": "64a300c9feae7efdf3343db9",
    "name": {
        "first": "ben",
        "last": "krakovsky",
        "_id": "64a300c9feae7efdf3343dba"
    },
    "birth": "1991-05-22T21:00:00.000Z",
    "address": {
        "city": "tel aviv",
        "street": "my street",
        "houseNumber": 6,
        "_id": "64a300c9feae7efdf3343dbb"
    },
    "phone": "0502299004",
    "dogWoker": {
        "dogsInTrip": 2,
        "payBy": "Bit",
        "mobile": 1,
        "_id": "64a300c9feae7efdf3343dbc"
    },
    "experience": "2",
    "bigDogs": true,
    "user_id": "649c9144f490d481a5faf65e",
    "__v": 0
  }
  
  return (
    <div>ProfilePage</div>
  )
}

ProfilePage.propTypes = {}

export default ProfilePage