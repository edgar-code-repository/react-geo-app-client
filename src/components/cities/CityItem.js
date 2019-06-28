import React from 'react';
import axios from 'axios';


export class CityItem extends React.Component {

    state = {
        flag_btn_delete: true
    }

    onClickEdit = (cityId) => {
        this.props.history.push("/edit_city/" + cityId);
    }

    onClickDelete = (cityId) => {
        if (!window.confirm("Are you sure you want to delete the selected item?")) {
            return;
        }

        this.setState({ flag_btn_delete: false });

        axios.delete('http://localhost:5501/cities/' + cityId)
            .then(response => {
                const current = this.props.location.pathname;
                this.props.history.replace('/reload');
                this.props.history.replace(current);
            })
            .catch((error) => {
                this.setState({ flag_btn_delete: true });
                this.props.showError(error, "Error when deleting a city");
            });

    }


    render() {
        const { city } = this.props;
        return (
            <tr>
                <td>{ city.name }</td>
                <td>{ city.country.name }</td>
                <td>
                    <input  type="button" 
                            value="Edit" 
                            className="btn btn-warning" 
                            onClick={() => this.onClickEdit(city.id)} />
                </td>
                <td>
                    <input  type="button" 
                            value="Delete" 
                            className="btn btn-danger" 
                            onClick={() => this.onClickDelete(city.id)} 
                            disabled={!this.state.flag_btn_delete} />
                </td>
            </tr>
        )
    }
}

export default CityItem
