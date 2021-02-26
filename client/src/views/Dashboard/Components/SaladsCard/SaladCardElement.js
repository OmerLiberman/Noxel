import React from 'react';

export const SaladCardElement = ({title, data}) => {
  return (
      <div style={{ textAlign: 'center' }}>
        <div> <center> <h2> {title} </h2>  </center> </div>
        {
          data ?
              <div>
                {
                  data.map((element, key) => {
                    return <div> ({key + 1}) <b> {element.hebName} </b> - {element.amount} </div>
                  })
                }
              </div>

              : 'לא נמצא מידע.'
        }
      </div>
  )
}