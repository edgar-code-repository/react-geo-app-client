import React from 'react';
import ContinentItem from './ContinentItem';

export class ContinentsList extends React.Component {
    render() {
        const { continents, history, location, showError } = this.props;

        if (continents === null || continents.length === 0) {
            return (
                <tr>
                    <td colSpan="3">No records available.</td>
                </tr>                
            );
        }
        else if (continents.length > 0) {
            return continents.map((continent) => (
                <ContinentItem  key={continent.id} 
                                continent={continent} 
                                history={history}
                                location={location} 
                                showError={showError} />
            ));
        }
    }
}

export default ContinentsList
