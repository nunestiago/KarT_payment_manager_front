import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

function ViewClients () {
  return (
    <div>
      <div className="button-register">
        <Link to="/cadastrar-cliente">
          <button
            type="submit"
            className="btn-pink-border"
          >
            Adicionar cliente
          </button>
        </Link>
      </div>
      <div className="table-head flex-row items-center">
        <h1>Cliente</h1>
        <h1>Cobranças Feitas</h1>
        <h1>Cobranças Feitas</h1>
        <h1>Status</h1>
      </div>
      <div className="table-body">
        
      </div>
    </div>
  )
}

export default ViewClients;