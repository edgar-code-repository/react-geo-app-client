import React from 'react';
import Navbar from './components/Navbar';
import Main from './components/Main';
import Continents from './components/continents/Continents';
import AddContinent from './components/continents/AddContinent';
import EditContinent from './components/continents/EditContinent';
import Countries from './components/countries/Countries';
import AddCountry from './components/countries/AddCountry';
import EditCountry from './components/countries/EditCountry';
import Cities from './components/cities/Cities';
import AddCity from './components/cities/AddCity';
import EditCity from './components/cities/EditCity';
import { BrowserRouter, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Navbar />      
      <div className="container">      
          <Route exact path="/" component={Main} />
          <Route path="/continents" component={Continents} />
          <Route path="/add_continent" component={AddContinent} />
          <Route path="/edit_continent/:continent_id" component={EditContinent} />
          <Route path="/countries" component={Countries} />
          <Route path="/add_country" component={AddCountry} />
          <Route path="/edit_country/:country_id" component={EditCountry} />
          <Route path="/cities" component={Cities} />
          <Route path="/add_city" component={AddCity} />
          <Route path="/edit_city/:city_id" component={EditCity} />
      </div>
    </BrowserRouter>
  );
}

export default App;
