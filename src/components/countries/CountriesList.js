import React from 'react';
import CountryItem from './CountryItem';

class CountriesList extends React.Component {
    render() {
        const { countries, history, location, showError } = this.props;
        
        if (countries === null || countries.length === 0) {
            return (
                <tr>
                    <td colSpan="4">No records available.</td>
                </tr>                
            );
        }
        else if (countries.length > 0) {
            return countries.map((country) => (
                <CountryItem    key={country.id} 
                                country={country}
                                history={history}
                                location={location} 
                                showError={showError} />
            ));
        }
    }
}


export default CountriesList
