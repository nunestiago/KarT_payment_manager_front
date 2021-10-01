import { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from '../pages/Login';
import Home from '../pages/Home';
import Register from '../pages/Register';
import EditUser from '../pages/EditUser';
import ClientRegister from '..//pages/ClientRegister';
import AuthContext from '../contexts/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../components/Sidebar';
import ModalEditUser from '../components/ModalEditUser';

function Routes() {
  const [token, setToken] = useState();
  return (
    <AuthContext.Provider value={{ token, setToken }}>
      <ToastContainer />
      <Router>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/cadastro" component={Register} />
          <Route path="/atualizar-usuario" component={EditUser} />
          <Route path="/cadastrar-cliente" component={ClientRegister} />
          <Sidebar>
            <Route path="/home" component={Home} />
            <Route path="/teste" component={ModalEditUser} />
          </Sidebar>
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
}

export default Routes;
