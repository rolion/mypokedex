import React from 'react';
import banner from '../assets/img/banner3.png'
import '../assets/styles/banner.css'
class Welcome extends React.Component {
    render() {
        return <div className='row d-flex justify-content-center banner'>
            <img srcSet={banner}  alt=""/>
        </div>

    }
}

export default Welcome;
