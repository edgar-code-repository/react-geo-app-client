import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import loading_image from '../../images/loading3.gif';
import { ErrorMessage } from '../ErrorMessage';

export class AddCity extends React.Component {
    state = {
        city_name: "",
        country_id:"",
        form_valid: false,
        form_style: { display:'block' },
        loading_style: { display:'none' },
        panel_div_style: { display:'block' },
        error_div_style: { display:'none' },
        error : "",
        error_title: "",
        countries_data: null,
        isLoading: true
    }

    componentDidMount() {
        axios.get('http://localhost:5501/countries')
            .then(response => {
                const continents = response.data;
                this.setState({ countries_data: continents, isLoading: false });
            })  
            .catch((errorGet) => {
                this.setState({ 
                    isLoading: false,
                    error: errorGet.message,   
                    panel_div_style: { display:'none' },
                    error_div_style: { display:'block' },
                    error_title: "Error when fetching countries" 
                })
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

        const new_city = {
            "name": this.state.city_name
        };  

        const urlNewCity = 'http://localhost:5501/countries/' + this.state.country_id + '/cities';
        
        this.setState({
            form_style: {display:'none'},
            loading_style: {display:'block'}
        });

        axios.post(urlNewCity, new_city)
            .then(response => {
                this.props.history.push("/cities");
            })
            .catch((errorPost) => {
                this.setState({
                    error: errorPost.message, 
                    loading_style: {display:'none'},
                    panel_div_style: { display:'none' },
                    error_div_style: { display:'block' },
                    error_title: "Error when creating new city"                    
                });               
            });
    
    }

    render() {
        const { error, error_title, countries_data, isLoading } = this.state;

        if (error) {
            return <ErrorMessage title="Error when fetching continents" message={error.message} />;
        }

        if (isLoading) {
            return <img src={loading_image} alt="Loading" className="img-loading-size-class center-block" />;
        } 

        return (
            <div className="row">
                <div className="panel panel-default" style={this.state.panel_div_style}>
                    <div className="panel-heading">Add City</div>
                    <div className="panel-body">
                        <form name="city-form" id="city-form" onSubmit={this.handleSubmit} style={this.state.form_style} >
                            <div className="form-group">
                                <label htmlFor="name">Name:</label>
                                <input type="text" className="form-control" name="name" id="name" onChange={this.handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="name">Country:</label>
                                <select className="form-control" name="country" id="country" onChange={this.handleChange}>
                                    <option value="-1" >Select Country</option>
                                    {
                                        countries_data.map( (country) => {
                                            return <option key={country.id} value={country.id}>{country.name}</option>
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

export default AddCity
