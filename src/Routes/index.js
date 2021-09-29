import { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from '../pages/Login';
import Home from '../pages/Home';
import Register from '../pages/Register';
import EditUser from '../pages/EditUser';
import ClientRegister from '..//pages/ClientRegister';
import AuthContext from '../contexts/AuthContext';

function Routes() {
  const [token, setToken] = useState()
  return (
    <AuthContext.Provider value={{ token, setToken }}>
      <Router>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/cadastro" component={Register} />
          <Route path="/home" component={Home} />
          <Route path="/atualizar-usuario" component={EditUser} />
          <Route path="/cadastrar-cliente" component={ClientRegister} />
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
}

export default Routes;
