import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Login from '../pages/Login';
import Home from '../pages/Home';
import Register from '../pages/Register';
import EditUser from '../pages/EditUser';
import ClientRegister from '..//pages/ClientRegister';
import { AuthProvider } from '../contexts/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../components/Sidebar';
import ModalEditUser from '../components/ModalEditUser';
import useAuth from '../hooks/useAuth';

function ProtectedRoutes({ children }) {
  const { token } = useAuth();
  return <Route render={() => (token ? children : <Redirect to="/" />)} />;
}

function Routes() {
  return (
    <AuthProvider>
      <ToastContainer />
      <Router>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/cadastro" component={Register} />
          <Route path="/atualizar-usuario" component={EditUser} />
          <Route path="/cadastrar-cliente" component={ClientRegister} />
          <ProtectedRoutes>
            <Sidebar>
              <Route path="/home" component={Home} />
              <Route path="/teste" component={ModalEditUser} />
            </Sidebar>
          </ProtectedRoutes>
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default Routes;
