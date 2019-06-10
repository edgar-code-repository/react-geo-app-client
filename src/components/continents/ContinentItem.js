import React from 'react';
import axios from 'axios';

class ContinentItem extends React.Component {

    state = {
        flag_btn_delete: true
    }

    onClickEdit = (continentId) => {
        //console.log("onClickEdit - continentId: " + continentId);
        this.props.history.push("/edit_continent/" + continentId);
    }

    onClickDelete = (continentId) => {
        //console.log("onClickDelete - continentId: " + continentId);

        if (!window.confirm("Are you sure you want to delete the selected item?")) {
            return;
        }

        this.setState({ flag_btn_delete: false });

        axios.delete('http://localhost:5501/continents/' + continentId)
            .then(response => {
                const current = this.props.location.pathname;
                this.props.history.replace('/reload');
                this.props.history.replace(current);
            })
            .catch((error) => {               
                this.setState({ flag_btn_delete: true });
                this.props.showError(error, "Error when deleting a continent");
            });

    }    

    render() {
        const { continent } = this.props;
        return (
            <tr>
                <td>{continent.name}</td>
                <td>
                    <input  type="button" 
                            value="Edit" 
                            className="btn btn-warning" 
                            onClick={() => this.onClickEdit(continent.id)} />
                </td>
                <td>
                    <input  type="button" 
                            value="Delete" 
                            className="btn btn-danger" 
                            onClick={() => this.onClickDelete(continent.id)} 
                            disabled={!this.state.flag_btn_delete} />
                </td>
            </tr>
        )
    }
}

export default ContinentItem
