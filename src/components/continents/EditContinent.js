import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import loading_image from '../../images/loading3.gif';
import { ErrorMessage } from '../ErrorMessage';

class EditContinent extends React.Component {

    constructor() {
        super();    
        this.state = {
            error: "",
            error_title: "",
            continent_name: "",
            continent_id: "",
            form_valid: true,
            form_style: { display:'none' },
            loading_style: { display:'block' },
            panel_div_style: { display:'block' },
            error_div_style: { display:'none' }           
        }
    }

    handleChange = (e) => {
        //console.log("handleChange - target name: " + e.target.name);
        //console.log("handleChange - target value: " + e.target.value);

        const value = e.target.value.trim();
        this.setState({
            continent_name: value
        });

        if (value !== "") {
            this.setState({form_valid: true});
        }
        else {
            this.setState({form_valid: false});
        }        

    }

    handleSubmit = (e) => {
        e.preventDefault();

        const continent = {
            "id": this.state.continent_id,
            "name": this.state.continent_name
        };  
        
        this.setState({
            form_style: {display:'none'},
            loading_style: {display:'block'}
        });
      
        axios.put('http://localhost:5501/continents/' + this.state.continent_id, continent)
            .then(response => {
                this.props.history.push("/continents");
            })
            .catch((errorPut) => {
                this.setState({
                    form_style: {display:'block'},
                    loading_style: {display:'none'},
                    error_title: "Error when updating continent data",
                    error: errorPut.message,
                    panel_div_style: { display:'none' },
                    error_div_style: { display:'block' }
                });               
            });        
    }

    componentDidMount() {
        const { continent_id } = this.props.match.params;

        axios.get('http://localhost:5501/continents/' + continent_id)
            .then(response => {
                const continent = response.data;
                this.setState({ 
                    continent_id: continent.id,
                    continent_name: continent.name, 
                    isLoading: false,
                    form_style: { display:'block' },
                    loading_style: { display:'none' },
                    panel_div_style: { display:'block' },
                    error_div_style: { display:'none' }  
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

    render() {
        const { continent_name, continent_id, error, error_title } = this.state;

        return (
            <div className="row">
                <div className="panel panel-default" style={this.state.panel_div_style}>
                    <div className="panel-heading">Edit Continent</div>
                    <div className="panel-body">
                        <form name="continent-form" id="continent-form" onSubmit={this.handleSubmit} style={this.state.form_style} >
                            <input type="hidden" name="continent_id" value={continent_id} />
                            <div className="form-group">
                                <label htmlFor="name">Name:</label>
                                <input  type="text" 
                                        className="form-control" 
                                        name="name" 
                                        id="name" 
                                        onChange={this.handleChange}
                                        defaultValue={continent_name} />
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

export default EditContinent
