import React from 'react';
import banner from '../assets/img/banner3.png'
import '../assets/styles/banner.css'
import {Link} from "react-router-dom";
class Banner extends React.Component {
    render() {
        return <div className='row d-flex justify-content-center banner'>
            <Link to='/pokedex'><img srcSet={banner}  alt=""/></Link>

        </div>

    }
}

export default Banner;
