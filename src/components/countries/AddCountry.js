import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import loading_image from '../../images/loading3.gif';
import { ErrorMessage } from '../ErrorMessage';

export class AddCountry extends React.Component {
    state = {
        country_name: "",
        continent_id:"",
        form_valid: false,
        form_style: { display:'block' },
        loading_style: { display:'none' },
        panel_div_style: { display:'block' },
        error_div_style: { display:'none' },
        error : "",
        error_title: "",
        continents_data: null,
        isLoading: true
    }

    componentDidMount() {
        axios.get('http://localhost:5501/continents')
            .then(response => {
                const continents = response.data;
                this.setState({ continents_data: continents, isLoading: false });
            })  
            .catch((errorGet) => {
                this.setState({ 
                    isLoading: false,
                    error: errorGet.message,   
                    panel_div_style: { display:'none' },
                    error_div_style: { display:'block' },
                    error_title: "Error when fetching continents" 
                })
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

        const new_country = {
            "name": this.state.country_name
        };  

        const urlNewCountry = 'http://localhost:5501/continents/' + this.state.continent_id + '/countries';
        
        this.setState({
            form_style: {display:'none'},
            loading_style: {display:'block'}
        });

        axios.post(urlNewCountry, new_country)
            .then(response => {
                this.props.history.push("/countries");
            })
            .catch((errorPost) => {
                this.setState({
                    error: errorPost.message, 
                    form_style: {display:'block'},
                    loading_style: {display:'none'},
                    panel_div_style: { display:'none' },
                    error_div_style: { display:'block' },
                    error_title: "Error when creating new country"                    
                });               
            });

    }

    render() {
        const { error, error_title, continents_data, isLoading } = this.state;

        if (error) {
            return <ErrorMessage title="Error when fetching continents" message={error.message} />;
        }

        if (isLoading) {
            return <img src={loading_image} alt="Loading" className="img-loading-size-class center-block" />;
        } 

        return (
            <div className="row">
                <div className="panel panel-default" style={this.state.panel_div_style}>
                    <div className="panel-heading">Add Country</div>
                    <div className="panel-body">
                        <form name="country-form" id="country-form" onSubmit={this.handleSubmit} style={this.state.form_style} >
                            <div className="form-group">
                                <label htmlFor="name">Name:</label>
                                <input type="text" className="form-control" name="name" id="name" onChange={this.handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="name">Continent:</label>
                                <select className="form-control" name="continent" id="continent" onChange={this.handleChange}>
                                    <option value="-1" >Select Continent</option>
                                    {
                                        continents_data.map( (continent) => {
                                            return <option key={continent.id} value={continent.id}>{continent.name}</option>
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

export default AddCountry
