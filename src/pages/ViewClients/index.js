import React from 'react';
import { Link } from 'react-router-dom';
import ClientsTable from '../../components/ClientsTable';
import './style.scss';

function ViewClients() {
  return (
    <div className="view_clients_row">
      <ClientsTable>
        {' '}
        <Link to="/cadastrar-cliente">
          <button
            type="submit"
            className="btn-pink-border button-register-button"
          >
            Adicionar cliente
          </button>
        </Link>
      </ClientsTable>
    </div>
  );
}

export default ViewClients;
