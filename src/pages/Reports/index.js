import './style.scss';
import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import baseUrl from '../../utils/baseUrl';
import { toast } from 'react-toastify';
import SortNameButton from '../../components/SortNameButton';
import showPhone from '../../utils/showProperPhone';
import mailIcon from '../../assets/mail.svg';
import phonelIcon from '../../assets/phone.svg';

function Reports() {
  const { token } = useAuth();
  const [charges, setCharges] = useState([]);
  const [clients, setClients] = useState([]);
  const [filteredCharges, setFilteredCharges] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);

  const [which, setWhich] = useState({ charges: false, clients: false });

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

  const handleGetCharges = async () => {
    try {
      const response = await fetch(`${baseUrl}charges/getAll`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      });

      const dados = await response.json();

      if (!response.ok) {
        toast.error(dados);
        return;
      }
      setCharges(dados);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    handleGetClients();
    handleGetCharges();
  }, []);

  function handleEmDia() {
    setWhich({ charges: false, clients: true });
    setFilteredClients(
      clients.filter(
        client => (client.feitas || 0) - (client.recebidas || 0) === 0,
      ),
    );
  }
  function handleInadimplente() {
    setWhich({ charges: false, clients: true });
    setFilteredClients(
      clients.filter(
        client => (client.feitas || 0) - (client.recebidas || 0) !== 0,
      ),
    );
  }
  function handlePrevistas() {
    setWhich({ charges: true, clients: false });
    setFilteredCharges(
      charges.filter(
        charge =>
          charge.status === false &&
          new Date(charge.vencimento).getTime() > Date.now(),
      ),
    );
  }
  function handlePagas() {
    setWhich({ charges: true, clients: false });
    setFilteredCharges(charges.filter(charge => charge.status === true));
  }
  function handleVencidas() {
    setWhich({ charges: true, clients: false });
    setFilteredCharges(
      charges.filter(
        charge => new Date(charge.vencimento).getTime() < Date.now(),
      ),
    );
  }
  function handleStatus(status, due) {
    if (status) {
      return 'PAGO';
    }
    if (new Date(due).getTime() < Date.now()) {
      return 'VENCIDO';
    }
    return 'PENDENTE';
  }
  console.log(filteredCharges, filteredClients);
  return (
    <div>
      <div>
        <button onClick={handleEmDia}>Em dia</button>
        <button onClick={handleInadimplente}>Inadimplente</button>
        <button onClick={handlePrevistas}>Previstas</button>
        <button onClick={handlePagas}>Pagas</button>
        <button onClick={handleVencidas}>Vencidas</button>
      </div>
      {which.clients && (
        <div>
          <div className="button-register">
            <div className="flex-row items-center between"></div>
          </div>
          <div className="table-head flex-row items-center">
            <div className="flex-row items-center">
              <h1>Cliente</h1>
              <SortNameButton
                data={clients}
                setListState={setFilteredClients}
              />
            </div>
            <div className="th-middle flex-row items-center">
              <h1>Cobranças Feitas</h1>
              <h1>Cobranças Recebidas</h1>
              <h1>Status</h1>
            </div>
            <div className="empty-space"></div>
          </div>
          <div className="table-body flex-column">
            {filteredClients.map(client => (
              <div className="id-client flex-row" key={client.id}>
                <div className="client-column flex-column">
                  <p>{client.nome}</p>
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
                    R${' '}
                    {client.recebidas ? (client.recebidas / 100).toFixed(2) : 0}
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
                <div className="flex-row edit">apagar</div>
              </div>
            ))}
          </div>
        </div>
      )}
      {which.charges && (
        <div>
          <div className="flex-column">
            <div className="charges_search-input"></div>
            <div className="table-head-charges flex-row items-center">
              <h1>ID</h1>
              <div className="flex-row items-center">
                <h1>Cliente</h1>
                <SortNameButton
                  data={charges}
                  setListState={setFilteredCharges}
                />
              </div>
              <h1>Descrição</h1>
              <h1>Valor</h1>
              <h1>Status</h1>
              <h1>Vencimento</h1>
            </div>
          </div>
          <div>
            {filteredCharges.map(key => (
              <div key={key.id} className="charges-body flex-row items-center">
                <div className="charges-list-id">#{key.id}</div>
                <div className="charges-list-nome">{key.nome}</div>
                <div className="charges-list-descricao">{key.descricao}</div>
                <div className="charges-list-valor">
                  R$ {(key.valor / 100).toFixed(2)}
                </div>
                <div
                  className={`charges-list-status ${handleStatus(
                    key.status,
                    key.vencimento,
                  ).toLowerCase()}`}
                >
                  {handleStatus(key.status, key.vencimento)}
                </div>
                <div className="charges-list-vencimento">
                  {new Date(key.vencimento).toLocaleDateString('pt-BR')}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Reports;
