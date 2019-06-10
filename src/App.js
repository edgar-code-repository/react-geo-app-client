import React from 'react';
import Navbar from './components/Navbar';
import Main from './components/Main';
import Continents from './components/continents/Continents';
import AddContinent from './components/continents/AddContinent';
import EditContinent from './components/continents/EditContinent';
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
      </div>
    </BrowserRouter>
  );
}

export default App;
