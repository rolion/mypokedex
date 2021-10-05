import React from 'react';
import e404 from '../assets/img/404.png'
import '../assets/styles/banner.css'
import {Link} from "react-router-dom";

class Error404 extends React.Component {
    render() {
        return <div className='row d-flex justify-content-center'>
            <Link to='/pokedex'><img srcSet={e404}  alt=""/></Link>

        </div>

    }
}

export default Error404;
