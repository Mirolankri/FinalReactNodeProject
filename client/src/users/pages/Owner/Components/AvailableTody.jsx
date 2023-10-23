import React from 'react'
import AvatarDetails from '../../../Components/AvatarDetails';

const AvailableTody = ({data}) => {
    console.log(data);
  return (
    <>
    <div className='d-flex justify-content-center p-3 fs-3'>פנויים היום</div>
    <div className=''>
    {data && data.length > 0 ? (
        data.map((dogwalker, index) => (
          <div key={index}>
              <AvatarDetails profile={dogwalker.profile} user={dogwalker}/>              
            </div>
        ))
      ) : (
        <div>לא נמצאו דוג וולקרים פנויים</div>
      )}

    </div>
    </>
  )
}

export default AvailableTody