import React from 'react';
import Navbar from './components/Navbar';
import Loader from './components/Loader';
import { Switch } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import PrivateRoute from './auth/ProtectedRoute';
import { useAuth0 } from './auth/Auth0Provider';

function App() {
  const { loading } = useAuth0();
  if (loading) {
    return <Loader />;
  }
  return (
    <div className="App">
      <header>
        <Navbar />
      </header>
      <Switch>
        <PrivateRoute exact path="/" component={Dashboard} />
      </Switch>
    </div>
  );
}

export default App;
