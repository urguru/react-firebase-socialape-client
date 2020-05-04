import React from 'react'
import {Link} from 'react-router-dom'

export default function Error() {
    return (
        <div>
            <h1 style={{textAlign:'center'}}>Error : Page not found </h1>
            <Link to='/'><h1 style={{ textAlign: 'center' }}>Go Back to home</h1></Link>
        </div>
    )
}
