import React  from 'react';
import { Link } from 'react-router-dom';
import loading_image from '../../images/loading3.gif';
import axios from 'axios';

import { ContinentsList } from './ContinentsList';
import { ErrorMessage } from '../ErrorMessage';

class Continents extends React.Component {

    constructor() {
        super();
        this.state = {
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

        axios.get('http://localhost:5501/continents')
            .then(response => {
                const continents = response.data;
                this.setState({ continents_data: continents, isLoading: false });
            })  
            .catch((errorGet) => {
                //console.log("componentDidMount error - " + errorGet.message);
                this.setState({ 
                    error: errorGet.message, 
                    isLoading: false,  
                    continents_div_style: { display:'none' },
                    error_div_style: { display:'block' },
                    error_title: "Error when fetching continents" 
                })
            });

    }

    showError = (errorParameter, error_title_parameter) => {
        //console.log("showError - " + errorParameter);
        this.setState({ 
            error: errorParameter.message, 
            continents_div_style: { display:'none' },
            error_div_style: { display:'block' },
            error_title: error_title_parameter
        });
    }

    render() {
        const { continents_data, isLoading, error, error_title } = this.state;

        if (isLoading) {
            return <img src={loading_image} alt="Loading" className="img-loading-size-class center-block" />;
        }

        return (
            <div className="row">
                <div className="panel panel-success" style={this.state.continents_div_style}>
                    <div className="panel-heading">Continents</div>
                    <div className="panel-body">
                        <div>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Edit</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <ContinentsList continents={ continents_data } 
                                                    history={this.props.history} 
                                                    location={this.props.location}
                                                    showError={this.showError} />                  
                                </tbody>
                            </table>
                                
                            <br/>
                            <Link to="/add_continent">
                                <input type="button" value="Add" className="btn btn-primary" />&nbsp;
                            </Link>

                            <Link to="/countries">
                                <input type="button" value="Countries" className="btn btn-primary" />&nbsp;
                            </Link>

                            <Link to="/cities">
                                <input type="button" value="Cities" className="btn btn-primary" />&nbsp;
                            </Link>

                            <Link to="/">
                                <input type="button" value="Main" className="btn btn-primary" />                    
                            </Link>
                        </div>
                    </div>
                </div> 
                <div style={this.state.error_div_style}>
                    <ErrorMessage title={error_title} error={error} />
                </div>
            </div>
        )
    }
}

export default Continents
