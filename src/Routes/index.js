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
import ViewClients from '../pages/ViewClients';
import ClientRegister from '../pages/ClientRegister';
import EditClient from '../pages/EditClient';
import DetailClient from '../pages/DetailClient';
import { AuthProvider } from '../contexts/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../components/Sidebar';
import useAuth from '../hooks/useAuth';
import Charges from '../pages/ViewCharges';
import CreateCharge from '../pages/CreateCharge';
import ModalEditCharge from '../components/ModalEditCharge';
import Reports from '../pages/Reports';

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
          <ProtectedRoutes>
            <Sidebar>
              <Route path="/home" component={Home} />
              <Route path="/teste" component={ModalEditCharge} />
              <Route path="/clientes" component={ViewClients} />
              <Route path="/cadastrar-cliente" component={ClientRegister} />
              <Route path="/editar-cliente" component={EditClient} />
              <Route path="/detalhe-cliente" component={DetailClient} />
              <Route path="/cobrancas" component={Charges} />
              <Route path="/nova-cobranca" component={CreateCharge} />
              <Route path="/relatorios" component={Reports} />
            </Sidebar>
          </ProtectedRoutes>
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default Routes;
