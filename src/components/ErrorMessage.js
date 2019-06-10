import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class ErrorMessage extends Component {
    
    render() {
        const { error, title } = this.props;

        return (
            <div className="panel panel-danger">
                <div className="panel-heading">{ title }</div>
                <div className="panel-body">
                    Error : { error }
                    
                    <br/><br/>
                    <Link to="/">
                        <input type="button" value="Main" className="btn btn-primary" />                    
                    </Link>
                </div>
            </div>
        )
    }
}

export default ErrorMessage
