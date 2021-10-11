import React, { useEffect, useState } from 'react';
import baseUrl from '../../utils/baseUrl';
import useAuth from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import './style.scss';
import SearchInput from '../../components/SearchInput';
import SortNameButton from '../../components/SortNameButton';

function Charges() {
  const { token } = useAuth();
  const [charges, setCharges] = useState([]);
  const [filteredCharges, setFilteredCharges] = useState([]);

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
      setFilteredCharges(dados);
      setCharges(dados);
    } catch (error) {
      toast.error(error.message);
    }
  };

  function handleStatus(status, due) {
    if (status) {
      return 'PAGO';
    }
    if (new Date(due).getTime() < Date.now()) {
      return 'VENCIDO';
    }
    return 'PENDENTE';
  }

  useEffect(() => {
    handleGetCharges();
  }, []);
  return (
    <div>
      <SearchInput data={charges} setListState={setFilteredCharges} />
      <div className="table-head-charges flex-row items-center">
        <h1>ID</h1>
        <div className="flex-row items-center">
          <h1>Cliente</h1>
          <SortNameButton data={charges} setListState={setFilteredCharges} />
        </div>
        <h1>Descrição</h1>
        <h1>Valor</h1>
        <h1>Status</h1>
        <h1>Vencimento</h1>
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
  );
}

export default Charges;
