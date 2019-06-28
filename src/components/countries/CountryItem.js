import React from 'react';
import axios from 'axios';

class CountryItem extends React.Component {
    
    state = {
        flag_btn_delete: true
    }

    onClickEdit = (countryId) => {
        this.props.history.push("/edit_country/" + countryId);
    }

    onClickDelete = (countryId) => {
        if (!window.confirm("Are you sure you want to delete the selected item?")) {
            return;
        }

        this.setState({ flag_btn_delete: false });

        axios.delete('http://localhost:5501/countries/' + countryId)
            .then(response => {
                const current = this.props.location.pathname;
                this.props.history.replace('/reload');
                this.props.history.replace(current);
            })
            .catch((error) => {
                this.setState({ flag_btn_delete: true });
                this.props.showError(error, "Error when deleting a country");
            });

    }

    render() {
        const { country } = this.props;
        return (
            <tr>
                <td>{ country.name }</td>
                <td>{ country.continent.name }</td>
                <td>
                    <input  type="button" 
                            value="Edit" 
                            className="btn btn-warning" 
                            onClick={() => this.onClickEdit(country.id)} />
                </td>
                <td>
                    <input  type="button" 
                            value="Delete" 
                            className="btn btn-danger" 
                            onClick={() => this.onClickDelete(country.id)} 
                            disabled={!this.state.flag_btn_delete} />
                </td>
            </tr>
        )
    }
}

export default CountryItem
