import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import loading_image from '../../images/loading3.gif';
import { ErrorMessage } from '../ErrorMessage';

export class EditCountry extends React.Component {

    constructor() {
        super();    
        this.state = {
            error: "",
            error_title: "",
            continent_name: "",
            continent_id: "",
            country_name: "",
            country_id: "",
            continents_data: [],
            form_valid: true,
            form_style: { display:'none' },
            loading_style: { display:'block' },
            panel_div_style: { display:'block' },
            error_div_style: { display:'none' }           
        }
    }

    componentDidMount() {
        const { country_id } = this.props.match.params

        axios.get('http://localhost:5501/countries/' + country_id)
            .then(response => {
                const country = response.data;
                this.setState({ 
                    country_id: country.id,
                    country_name: country.name, 
                    continent_id: country.continent.id,
                    continent_name: country.continent.name 
                });

                axios.get('http://localhost:5501/continents')
                    .then(response => {
                        const continents = response.data;
                        this.setState({ 
                            continents_data: continents,
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
                            error_title: "Error when fetching continents" 
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
                    error_title: "Error when retrieving continent data"                    
                }); 
            });

    }

    handleChange = (e) => {
        const target = e.target.name;
        const value = e.target.value.trim();

        if (target === "name") {
            this.setState({country_name: value});

            if (value !== "" && document.getElementById("continent").value !== "-1") {
                this.setState({form_valid: true});
            }
            else {
                this.setState({form_valid: false});
            }

        }
        else if (target === "continent") {
            this.setState({continent_id: value});

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

        const country_param = {
            "id": this.state.country_id,
            "name": this.state.country_name,
            "continentId": this.state.continent_id
        };  

        const urlEditCountry = 'http://localhost:5501/continents/' + this.state.continent_id + '/countries/' + this.state.country_id;
        
        this.setState({
            form_style: {display:'none'},
            loading_style: {display:'block'}
        });

        axios.put(urlEditCountry, country_param)
            .then(response => {
                this.props.history.push("/countries");
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
        const { country_name, continents_data, continent_id, error, error_title } = this.state;

        return (
            <div className="row">
                <div className="panel panel-default" style={this.state.panel_div_style}>
                    <div className="panel-heading">Edit Country</div>
                    <div className="panel-body">
                        <form name="country-form" id="country-form" onSubmit={this.handleSubmit} style={this.state.form_style} >
                            <div className="form-group">
                                <label htmlFor="name">Name:</label>
                                <input  type="text" 
                                        className="form-control" 
                                        name="name" 
                                        id="name" 
                                        onChange={this.handleChange}
                                        defaultValue={country_name} />
                            </div>
                            <br/>
                            <div className="form-group">
                                <label htmlFor="name">Continent:</label>
                                <select className="form-control" name="continent" id="continent" value={continent_id} onChange={this.handleChange}>
                                    <option value="-1" >Select Continent</option>
                                    {
                                        continents_data.map( (continent) => {
                                            return  <option key={continent.id} value={continent.id}>{continent.name}</option>
                                        })
                                    }
                                </select>
                            </div>
                            <br/>

                            <input type="submit" value="Save" className="btn btn-primary" disabled={!this.state.form_valid} />&nbsp;

                            <Link to="/countries">
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

export default EditCountry
