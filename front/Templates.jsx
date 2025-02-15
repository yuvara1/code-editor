import React from 'react'

import { Link, useNavigate } from 'react-router'
function Templates(props) {
     const style = {
          textDecoration: 'none',
          color: 'black',
          fontSize: '20px'
     }
     const Navigate = useNavigate()
     
     
     function handleDash() {
          localStorage.setItem('filepath', props.filepath)
          Navigate('/dash')
     }

     return (
          <>
               <Link style={style} to='/dash' onClick={handleDash}>
                    <h1>{props.name}</h1>
                    <p>{props.filepath}</p>
               </Link>

          </>
     )
}

export default Templates




