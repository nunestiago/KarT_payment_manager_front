import React, { useEffect, useState } from 'react';
import mailIcon from '../../assets/mail.svg';
import phonelIcon from '../../assets/phone.svg';
import editIcon from '../../assets/edit.svg';
import showPhone from '../../utils/showProperPhone';
import SortNameButton from '../SortNameButton';
import ModalEditClient from '../ModalEditClient';
import ModalDetailClient from '../ModalDetailClient';
import baseUrl from '../../utils/baseUrl';
import useAuth from '../../hooks/useAuth';
import SearchInput from '../SearchInput';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

function ClientsTable({ children, fromReports }) {
  const [modalViewClient, setModalViewClient] = useState(false);
  const [modalEditClient, setModalEditClient] = useState(false);
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);

  const [client, setClient] = useState();
  const { token } = useAuth();

  useEffect(() => {
    filteredClients;
  }, [filteredClients]);

  const handleGetClients = async () => {
    try {
      const response = await fetch(`${baseUrl}client/getAll`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        return;
      }

      const dados = await response.json();
      setFilteredClients(dados);
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

  useEffect(() => {
    setFilteredClients(fromReports);
  }, [fromReports]);

  return (
    <div>
      <div className="flex-row mb30 items-center between">
        {children}
        <SearchInput data={clients} setListState={setFilteredClients} />
      </div>

      <table className="table">
        <thead>
          <tr className="table-head-charges">
            <th className="flex-row">
              Cliente
              <SortNameButton
                data={clients}
                setListState={setFilteredClients}
              />
            </th>
            <th>Cobranças Feitas</th>
            <th>Cobranças Recebidas</th>
            <th>Status</th>
            <th className="empty-space" />
          </tr>
        </thead>
        {filteredClients ? (
          filteredClients.map(client => (
            <tbody key={client.id}>
              <tr className="charges-body">
                <td>
                  <p
                    onClick={() => handleClickViewClient(client)}
                    className="client-list-name"
                  >
                    {client.nome}
                  </p>
                  <div className="flex-row small">
                    <img src={mailIcon} alt="mail-icon" />
                    <span>{client.email}</span>
                  </div>
                  <div className="flex-row small">
                    <img src={phonelIcon} alt="phone-icon" />
                    <span>{showPhone(client.telefone)}</span>
                  </div>
                </td>
                <td className="charges-list-nome">
                  <span>
                    R$ {client.feitas ? (client.feitas / 100).toFixed(2) : 0}
                  </span>
                </td>
                <td className="charges-list-recebidas">
                  <span>
                    R${' '}
                    {client.recebidas ? (client.recebidas / 100).toFixed(2) : 0}
                  </span>
                </td>
                <td className="charges-list-descricao">
                  <span>
                    {(client.feitas || 0) - (client.recebidas || 0) === 0 ? (
                      <span className="emdia">EM DIA</span>
                    ) : (
                      <span className="inadimplente">INADIMPLENTE</span>
                    )}
                  </span>
                </td>
                <td className="charges-list-valor">
                  <img
                    src={editIcon}
                    alt="edit-icon"
                    onClick={() => handleClickEditClient(client)}
                    style={{ cursor: 'pointer' }}
                  />
                </td>
              </tr>
            </tbody>
          ))
        ) : (
          <tbody>
            <td style={{ background: 'none' }}>
              <p>Nenhum cliente</p>
              <Link to={'/cadastrar-cliente'}>
                Clique aqui para cadastrar nova cobrança
              </Link>
            </td>
          </tbody>
        )}
      </table>
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

export default ClientsTable;
