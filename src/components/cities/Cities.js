import React from 'react';
import { Link } from 'react-router-dom';
import loading_image from '../../images/loading3.gif';
import axios from 'axios';

import CitiesList from './CitiesList';
import ErrorMessage from '../ErrorMessage';

class Cities extends React.Component {

    constructor() {
        super();
        this.state = {
            cities_data: null,
            isLoading: false,
            error: null,
            countries_data: null,
            continents_div_style: { display:'block' },
            error_div_style: { display:'none' },
            error_title: ""
        };
    }

    componentDidMount() {
        this.setState({ isLoading: true });

        axios.get('http://localhost:5501/cities')
            .then(response => {
                const cities = response.data;
                this.setState({ cities_data: cities, isLoading: false });
            })  
            .catch((errorGet) => {
                this.setState({ 
                    error: errorGet.message, 
                    isLoading: false,  
                    continents_div_style: { display:'none' },
                    error_div_style: { display:'block' },
                    error_title: "Error when fetching cities" 
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
        const { cities_data, isLoading, error, error_title } = this.state;

        if (error) {
            return <ErrorMessage title="Error when fetching cities" message={error.message} />;
        }

        if (isLoading) {
            return <img src={loading_image} alt="Loading" className="img-loading-size-class center-block" />;
        }

        return (
            <div className="row">
                <div className="panel panel-success" style={this.state.continents_div_style}>
                    <div className="panel-heading">
                        Cities
                    </div>
                    <div className="panel-body">
                        <input type="hidden" id="country_filter" value=""/>
                    
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Country</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                <CitiesList cities={ cities_data }
                                            history={this.props.history} 
                                            location={this.props.location}
                                            showError={this.showError} />
                            </tbody>                   
                        </table>
                            
                        <br/>
                        <Link to="/add_city">
                            <input type="button" value="Add" className="btn btn-primary" />&nbsp;
                        </Link>
                        
                        <Link to="/continents">
                            <input type="button" value="Continents" className="btn btn-primary" />&nbsp;
                        </Link>
                        
                        <Link to="/countries">
                            <input type="button" value="Countries" className="btn btn-primary" />&nbsp;
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

export default Cities
