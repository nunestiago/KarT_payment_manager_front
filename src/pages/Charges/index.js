import React, { useEffect, useState } from 'react';
import baseUrl from '../../utils/baseUrl';
import useAuth from '../../hooks/useAuth';
import { toast } from 'react-toastify';

function Charges() {
  const { token } = useAuth();
  const [charges, setCharges] = useState([]);

  const handleGetCharges = async () => {
    try {
      const response = await fetch(`${baseUrl}charges/getAll`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      });

      if (!response.ok) {
        toast.error('Email ou senha incorretos.');
        return;
      }

      const dados = await response.json();
      setCharges(dados);
      console.log(charges);
      console.log(dados);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    handleGetCharges();
  }, []);
  return (
    <div>
      <div className="table-head flex-row items-center">
        <h1>ID</h1>
        <h1>Cliente</h1>
        <h1>Descrição</h1>
        <h1>Valor</h1>
        <h1>Status</h1>
        <h1>Vencimento</h1>
      </div>
      <div className="table-body"></div>
    </div>
  );
}

export default Charges;
