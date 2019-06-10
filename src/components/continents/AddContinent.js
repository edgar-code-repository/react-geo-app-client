import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import loading_image from '../../images/loading3.gif';
import { ErrorMessage } from '../ErrorMessage';

class AddContinent extends React.Component {
    state = {
        continent_name: "",
        form_valid: false,
        form_style: { display:'block' },
        loading_style: { display:'none' },
        panel_div_style: { display:'block' },
        error_div_style: { display:'none' },
        error : "",
        error_title: ""
    }

    handleChange = (e) => {
        const value = e.target.value.trim();
        this.setState({continent_name: value});

        if (value !== "") {
            this.setState({form_valid: true});
        }
        else {
            this.setState({form_valid: false});
        }

    }

    handleSubmit = (e) => {
        e.preventDefault();

        //console.log(this.props);
        //console.log("[handleSubmit][this.state.continent_name: " + this.state.continent_name);  
        
        const new_continent = {
            "name": this.state.continent_name
        };  
        
        this.setState({
            form_style: {display:'none'},
            loading_style: {display:'block'}
        });
      
        axios.post('http://localhost:5501/continents', new_continent)
            .then(response => {
                this.props.history.push("/continents");
            })
            .catch((errorPost) => {
                this.setState({
                    error: errorPost.message, 
                    form_style: {display:'block'},
                    loading_style: {display:'none'},
                    panel_div_style: { display:'none' },
                    error_div_style: { display:'block' },
                    error_title: "Error when creating new continent"                    
                });               
                //alert("Se ha producido un error al guardar la información ingresada - Error: " + error);
            });

    }

    render() {
        //console.log(this.props);

        const { error, error_title } = this.state;

        return (
            <div className="row">
                <div className="panel panel-default" style={this.state.panel_div_style}>
                    <div className="panel-heading">Add Continent</div>
                    <div className="panel-body">
                        <form name="continent-form" id="continent-form" onSubmit={this.handleSubmit} style={this.state.form_style} >
                            <div className="form-group">
                                <label htmlFor="name">Name:</label>
                                <input type="text" className="form-control" name="name" id="name" onChange={this.handleChange} />
                            </div>
                            <br/>

                            <input type="submit" value="Save" className="btn btn-primary" disabled={!this.state.form_valid} />&nbsp;

                            <Link to="/continents">
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

export default AddContinent
