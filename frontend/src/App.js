import React from 'react';
import Navbar from './components/Navbar';
import Loader from './components/Loader';
import { Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import { useAuth0 } from './auth/react-auth0-spa';

function App() {
  const { loading } = useAuth0();
  if (loading) {
    return <Loader />;
  }
  return (
    <div className="App">
      <Navbar />
      <Route exact path="/" component={Dashboard} />
    </div>
  );
}

export default App;
