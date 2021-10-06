import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import baseUrl from '../../utils/baseUrl';
import useAuth from '../../hooks/useAuth';
import './style.scss';

function ModalEditClient({ setOpenModal, openModal }) {
  const { token, clients, setClients } = useAuth();

  const closeModal = () => {
    setOpenModal(!openModal);
  };

  const handleGetClient = async () => {
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
    handleGetClient();
  }, []);

  return (
    <>
      <div className="modal_container" onClick={() => closeModal()}>
        <div
          onClick={e => {
            e.stopPropagation();
          }}
        >
          <div onClick={() => closeModal()} className="modal_close">
            X
          </div>
          <div className="flex-column all-size"></div>
        </div>
      </div>
    </>
  );
}

export default ModalEditClient;
