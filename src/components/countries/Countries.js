import React from 'react';
import { Link } from 'react-router-dom';
import loading_image from '../../images/loading3.gif';
import axios from 'axios';

import CountriesList from './CountriesList';
import ErrorMessage from '../ErrorMessage';

class Countries extends React.Component {

    constructor() {
        super();
        this.state = {
            countries_data: null,
            continents_data: null,
            isLoading: false,
            error: null,
            continents_div_style: { display:'block' },
            error_div_style: { display:'none' },
            error_title: ""
        };
    }

    componentDidMount() {
        this.setState({ isLoading: true });

        axios.get('http://localhost:5501/countries')
            .then(response => {
                const countries = response.data;
                this.setState({ countries_data: countries, isLoading: false });
            })  
            .catch((errorGet) => {
                this.setState({ 
                    error: errorGet.message, 
                    isLoading: false,  
                    continents_div_style: { display:'none' },
                    error_div_style: { display:'block' },
                    error_title: "Error when fetching countries" 
                })
            });  
        
    }

    showError = (errorParameter, error_title_parameter) => {
        this.setState({ 
            error: errorParameter.message, 
            continents_div_style: { display:'none' },
            error_div_style: { display:'block' },
            error_title: error_title_parameter
        });
    }

    render() {
        const { countries_data, isLoading, error, error_title } = this.state;

        if (error) {
            return <ErrorMessage title="Error when fetching countries" message={error.message} />;
        }

        if (isLoading) {
            return <img src={loading_image} alt="Loading" className="img-loading-size-class center-block" />;
        }        

        return (
            <div className="row">
                <div className="panel panel-success" style={this.state.continents_div_style}>
                    <div className="panel-heading">
                        Countries
                    </div>
                    <div className="panel-body">
                        <input type="hidden" id="continent_filter" value=""/>

                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Continent</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                <CountriesList  countries={ countries_data }
                                                history={this.props.history} 
                                                location={this.props.location}
                                                showError={this.showError} />                  
                            </tbody>               
                        </table>
                            
                        <br/>
                        <Link to="/add_country">
                            <input type="button" value="Add" className="btn btn-primary" />&nbsp;
                        </Link>

                        <Link to="/continents">
                            <input type="button" value="Continents" className="btn btn-primary" />&nbsp;
                        </Link>

                        <Link to="/cities">
                            <input type="button" value="Cities" className="btn btn-primary" />&nbsp;
                        </Link>

                        <Link to="/">
                            <input type="button" value="Main" className="btn btn-primary" />                    
                        </Link>

                    </div>
                </div> 
                <div style={this.state.error_div_style}>
                    <ErrorMessage title={error_title} error={error} />
                </div>
            </div>
        )
    }
}

export default Countries
