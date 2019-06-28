import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import loading_image from '../../images/loading3.gif';
import { ErrorMessage } from '../ErrorMessage';

export class EditCity extends React.Component {

    constructor() {
        super();    
        this.state = {
            error: "",
            error_title: "",
            city_name: "",
            city_id: "",
            country_name: "",
            country_id: "",
            countries_data: [],
            form_valid: true,
            form_style: { display:'none' },
            loading_style: { display:'block' },
            panel_div_style: { display:'block' },
            error_div_style: { display:'none' }           
        }
    }

    componentDidMount() {
        const { city_id } = this.props.match.params

        axios.get('http://localhost:5501/cities/' + city_id)
            .then(response => {
                const city = response.data;
                this.setState({ 
                    country_id: city.country.id,
                    country_name: city.country.name, 
                    city_id: city.id,
                    city_name: city.name 
                });

                axios.get('http://localhost:5501/countries')
                    .then(response => {
                        const countries = response.data;
                        this.setState({ 
                            countries_data: countries,
                            form_style: { display:'block' },
                            loading_style: { display:'none' },
                            panel_div_style: { display:'block' },
                            error_div_style: { display:'none' } 
                        });

                    })  
                    .catch((errorGet) => {
                        this.setState({ 
                            error: errorGet.message,   
                            loading_style: {display:'none'},
                            panel_div_style: { display:'none' },
                            error_div_style: { display:'block' },
                            error_title: "Error when fetching countries" 
                        })
                    }); 

            })
            .catch((errorGet) => {
                this.setState({
                    error: errorGet.message, 
                    form_style: {display:'block'},
                    loading_style: {display:'none'},
                    panel_div_style: { display:'none' },
                    error_div_style: { display:'block' },
                    error_title: "Error when retrieving city data"                    
                }); 
            });

    }

    handleChange = (e) => {
        const target = e.target.name;
        const value = e.target.value.trim();

        if (target === "name") {
            this.setState({city_name: value});

            if (value !== "" && document.getElementById("country").value !== "-1") {
                this.setState({form_valid: true});
            }
            else {
                this.setState({form_valid: false});
            }

        }
        else if (target === "country") {
            this.setState({country_id: value});

            if (document.getElementById("name").value !== "" && value !== "-1") {
                this.setState({form_valid: true});
            }
            else {
                this.setState({form_valid: false});
            }
        }

    }

    handleSubmit = (e) => {
        e.preventDefault();

        const city_param = {
            "id": this.state.city_id,
            "name": this.state.city_name
        };  

        const urlEditCity = 'http://localhost:5501/countries/' + this.state.country_id + '/cities/' + this.state.city_id;
        
        this.setState({
            form_style: {display:'none'},
            loading_style: {display:'block'}
        });

        axios.put(urlEditCity, city_param)
            .then(response => {
                this.props.history.push("/cities");
            })
            .catch((errorPut) => {
                this.setState({
                    form_style: {display:'block'},
                    loading_style: {display:'none'},
                    error_title: "Error when updating country data",
                    error: errorPut.message,
                    panel_div_style: { display:'none' },
                    error_div_style: { display:'block' }
                });               
            });
    }

    render() {
        const { city_name, countries_data, country_id, error, error_title } = this.state;

        return (
            <div className="row">
                <div className="panel panel-default" style={this.state.panel_div_style}>
                    <div className="panel-heading">Edit City</div>
                    <div className="panel-body">
                        <form name="city-form" id="city-form" onSubmit={this.handleSubmit} style={this.state.form_style} >
                            <div className="form-group">
                                <label htmlFor="name">Name:</label>
                                <input  type="text" 
                                        className="form-control" 
                                        name="name" 
                                        id="name" 
                                        onChange={this.handleChange}
                                        defaultValue={city_name} />
                            </div>
                            <br/>
                            <div className="form-group">
                                <label htmlFor="name">Country:</label>
                                <select className="form-control" name="country" id="country" value={country_id} onChange={this.handleChange}>
                                    <option value="-1" >Select Country</option>
                                    {
                                        countries_data.map( (country) => {
                                            return  <option key={country.id} value={country.id}>{country.name}</option>
                                        })
                                    }
                                </select>
                            </div>
                            <br/>

                            <input type="submit" value="Save" className="btn btn-primary" disabled={!this.state.form_valid} />&nbsp;

                            <Link to="/cities">
                                <input type="button" value="Cancel" className="btn btn-success" />                        
                            </Link>

                        </form>
                    </div>
                    <div style={this.state.loading_style}>
                        <img src={loading_image} alt="Loading" className="img-loading-size-class center-block" />
                        <br/><br/>
                    </div>                
                </div>
                <div style={this.state.error_div_style}>
                    <ErrorMessage title={error_title} error={error} />
                </div>                
            </div>
        )

    }
}

export default EditCity
