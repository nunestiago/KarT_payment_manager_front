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
        <span></span>
      </div>
      <div className="table-body flex-row items-center">
        {clients.map(client => (
        <div className="id-client" key={client.id}>
          <div className="client-column flex-column">
            <p className="name">{client.name}</p>
            <div>
              <img src={mailIcon}alt="mail-icon" />
              <p>{client.email}</p>
            </div>
            <div>
              <img src={phonelIcon} alt="phone-icon" />
              <p>{client.phone}</p>
            </div>
          </div>
          <div className="flex-row">
            <span>R$</span>
            <span></span>
          </div>
          <div className="flex-row">
            <span>R$</span>
            <span></span>
          </div>
          <div className="flex-row">
            <span></span>
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