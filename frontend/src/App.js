import React from 'react';
import { Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Route exact path="/" component={Dashboard} />
    </div>
  );
}

export default App;
