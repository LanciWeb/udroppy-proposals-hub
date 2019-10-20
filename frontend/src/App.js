import React from 'react';
import Navbar from './components/Navbar';
import Loader from './components/Loader';
import { Switch } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import { useAuth0 } from './auth/Auth0Provider';
import PrivateRoute from './auth/ProtectedRoute';
import AddProposalPage from './components/AddProposalPage';

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
        <PrivateRoute exact path="/propose" component={AddProposalPage} />
      </Switch>
    </div>
  );
}

export default App;
