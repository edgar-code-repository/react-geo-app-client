import React from 'react';
import continents_image from '../images/continents.jpg';
import countries_image  from '../images/countries.jpg';
import cities_image  from '../images/cities.jpg';
import { Link } from 'react-router-dom';


function Main() {
    return (
        <div className="row">
            <div className="col-md-4">
                <div className="thumbnail">
                <Link to="/continents">
                    <img src={continents_image} alt="Continents" className="img-size-class" />
                    <div className="caption"><p>Continents</p></div>
                </Link>
                </div>
            </div>
            <div className="col-md-4">
                <div className="thumbnail">
                <Link to="/countries">
                    <img src={countries_image} alt="Countries" className="img-size-class" />
                    <div className="caption"><p>Countries</p></div>
                </Link>
                </div>
            </div>
            <div className="col-md-4">
                <div className="thumbnail">
                <Link to="/cities">
                    <img src={cities_image} alt="Cities" className="img-size-class" />
                    <div className="caption"><p>Cities</p></div>
                </Link>
                </div>
            </div>
        </div>
    )
}

export default Main
