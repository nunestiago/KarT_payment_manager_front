import React, { useEffect, useState } from 'react';
import baseUrl from '../../utils/baseUrl';
import useAuth from '../../hooks/useAuth';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import './style.scss';
import mailIcon from '../../assets/mail.svg';
import phonelIcon from '../../assets/phone.svg';
import editIcon from '../../assets/edit.svg';
import ModalDetailClient from '../../components/ModalDetailClient';
import ModalEditClient from '../../components/ModalEditClient';
import showPhone from '../../utils/showProperPhone';

function ViewClients() {
  const { token } = useAuth();
  const [clients, setClients] = useState([]);
  const [client, setClient] = useState();
  const [modalViewClient, setModalViewClient] = useState(false);
  const [modalEditClient, setModalEditClient] = useState(false);

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
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleClickViewClient = selectedClient => {
    setModalViewClient(!modalViewClient);
    setClient(selectedClient);
  };
  const handleClickEditClient = selectedClient => {
    setModalEditClient(!modalEditClient);
    setClient(selectedClient);
  };
  useEffect(() => {
    handleGetClients();
    return () => {
      setModalViewClient(false);
      setModalEditClient(false);
    };
  }, []);

  return (
    <div>
      <div className="button-register">
        <Link to="/cadastrar-cliente">
          <button type="submit" className="btn-pink-border">
            Adicionar cliente
          </button>
        </Link>
      </div>
      <div className="table-head flex-row items-center">
        <h1>Cliente</h1>
        <div className="th-middle flex-row items-center">
          <h1>Cobranças Feitas</h1>
          <h1>Cobranças Recebidas</h1>
          <h1>Status</h1>
        </div>
        <div className="empty-space"></div>
      </div>
      <div className="table-body flex-column">
        {clients.map(client => (
          <div className="id-client flex-row" key={client.id}>
            <div className="client-column flex-column">
              <p onClick={() => handleClickViewClient(client)}>{client.nome}</p>
              <div className="flex-row mail">
                <img src={mailIcon} alt="mail-icon" />
                <span>{client.email}</span>
              </div>
              <div className="flex-row">
                <img src={phonelIcon} alt="phone-icon" />
                <span>{showPhone(client.telefone)}</span>
              </div>
            </div>
            <div className="flex-row cob-feitas">
              <span>
                R$ {client.feitas ? (client.feitas / 100).toFixed(2) : 0}
              </span>
            </div>
            <div className="flex-row cob-recebidas">
              <span>
                R$ {client.recebidas ? (client.recebidas / 100).toFixed(2) : 0}
              </span>
            </div>
            <div className="flex-row status">
              <span>
                {(client.feitas || 0) - (client.recebidas || 0) === 0 ? (
                  <span className="emdia">EM DIA</span>
                ) : (
                  <span className="inadimplente">INADIMPLENTE</span>
                )}
              </span>
            </div>
            <div className="flex-row edit">
              <img
                src={editIcon}
                alt="edit-icon"
                onClick={() => handleClickEditClient(client)}
              />
            </div>
          </div>
        ))}
      </div>
      {modalViewClient && (
        <ModalDetailClient
          client={client}
          closeModal={() => setModalViewClient(false)}
        />
      )}
      {modalEditClient && (
        <ModalEditClient
          client={client}
          setClient={() => setClient()}
          handleGetClients={handleGetClients}
          closeModal={() => setModalEditClient(false)}
        />
      )}
    </div>
  );
}

export default ViewClients;
