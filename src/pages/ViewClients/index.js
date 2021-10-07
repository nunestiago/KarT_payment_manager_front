import React, { useEffect, useState } from 'react';
import baseUrl from '../../utils/baseUrl';
import useAuth from '../../hooks/useAuth';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import './style.scss';
import mailIcon from '../../assets/mail.svg';
import phonelIcon from '../../assets/phone.svg';
import editIcon from '../../assets/edit.svg';

function ViewClients () {
  const { token } = useAuth();
  const [clients, setClients] = useState([]);

  const handleGetClients = async () => {
    try {
      const response = await fetch(`${baseUrl}client/getAll`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      });

      if (!response.ok) {
        return;
      }

      const dados = await response.json();
      setClients(dados);
      console.log(clients);
      console.log(dados);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    handleGetClients();
  }, []);

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
        <h1>Cobranças Recebidas</h1>
        <h1>Status</h1>
        <div className="empty-space"></div>
      </div>
      <div className="table-body flex-column">
        {clients.map(client => (
        <div className="id-client flex-row" key={client.id}>
          <div className="client-column flex-column content-center">
            <Link to="/detalhe-cliente">
              <p>{client.nome}</p>
            </Link>
            <div className="flex-row">
              <img src={mailIcon}alt="mail-icon" />
              <span>{client.email}</span>
            </div>
            <div className="flex-row">
              <img src={phonelIcon} alt="phone-icon" />
              <span>{client.telefone}</span>
            </div>
          </div>
          <div className="flex-row items-center content-center">
            <span>R$</span>
            <span></span>
          </div>
          <div className="flex-row">
            <span>R$</span>
            <span></span>
          </div>
          <div className="flex-row">
            <span>{client.em_dia === true ? <span className="emdia">EM DIA</span> : <span className="inadimplente">INADIMPLENTE</span>}</span>
          </div>
          <div className="flex-row">
            <Link to="/editar-cliente">
              <img src={editIcon} alt="edit-icon" />
            </Link>          
          </div>
          </div>
        ))}
        
      </div>
    </div>
  )
}

export default ViewClients;