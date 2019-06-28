import React from 'react';
import CityItem from './CityItem';

class CitiesList extends React.Component {
    render() {
        const { cities, history, location, showError } = this.props;

        if (cities === null || cities.length === 0) {
            return (
                <tr>
                    <td colSpan="4">No records available.</td>
                </tr>                
            );
        }
        else if (cities.length > 0) {
            return cities.map((city) => (
                <CityItem   key={city.id} 
                            city={city} 
                            history={history}
                            location={location} 
                            showError={showError} />
            ));
        }
    }
}

export default CitiesList
