import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import baseUrl from '../../utils/baseUrl';
import useAuth from '../../hooks/useAuth';
import phoneIcon from '../../assets/phone.svg';
import mailIcon from '../../assets/mail.svg';
import './style.scss';

function ModalDetailClient({ client, closeModal }) {
  const { token } = useAuth();
  const [charges, setCharges] = useState();

  const handleGetCharges = async () => {
    try {
      const response = await fetch(
        `${baseUrl}charges/getCharge?clientId=${client.id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
        },
      );

      if (!response.ok) {
        return;
      }

      const dados = await response.json();
      setCharges(dados);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    handleGetCharges();
  }, []);

  return (
    <>
      <div className="modal_container" onClick={() => closeModal()}>
        <div
          onClick={e => {
            e.stopPropagation();
          }}
        >
          <div className="show_client-container">
            <div onClick={() => closeModal()} className="modal_close">
              X
            </div>
            <div className="flex-row items-center">
              <div>
                <div>
                  <h1>{client.nome}</h1>
                </div>
                <h2>{client.cpf}</h2>
              </div>
            </div>
            <div className="flex-row">
              <div>
                <div className="flex-row">
                  <div className="flex-row">
                    <img src={mailIcon} alt="" />
                    <h2>{client.email}</h2>
                  </div>
                  <div className="flex-row">
                    <img src={phoneIcon} alt="" />
                    <h2>{client.telefone}</h2>
                  </div>
                </div>
                <div className="flex-row between">
                  <div>
                    <strong>CEP</strong>
                    <h2>{client.cep}</h2>
                  </div>
                  <div>
                    <strong>Bairro</strong>
                    <h2>{client.bairro}</h2>
                  </div>{' '}
                  <div>
                    <strong>Cidade</strong>
                    <h2>{client.cidade}</h2>
                  </div>
                </div>
                <div>
                  <strong>Logradouro</strong>
                  <h2>{client.logradouro}</h2>
                </div>
                <div className="flex-row between">
                  <div>
                    <strong>Complemento</strong>
                    <h2>{client.complemento}</h2>
                  </div>{' '}
                  <div>
                    <strong>Ponto de Referência</strong>
                    <h2>{client.bairro}</h2>
                  </div>
                </div>
              </div>
              <div className="show_client-border"></div>
              <div>
                {charges &&
                  charges.map(charge => (
                    <div key={charge.id} className="charge_card-container">
                      <div className="flex-row between ">
                        <div>
                          <div className="flex-row items-center between ">
                            <h2>
                              <strong>#{charge.id} </strong>
                              {charge.descricao}
                            </h2>
                          </div>
                          <h3>
                            {new Date(charge.vencimento).toLocaleDateString(
                              'pt-BR',
                            )}
                          </h3>
                        </div>
                        <div>
                          <strong>R$ {(charge.valor / 100).toFixed(2)}</strong>
                          <h4
                            className={`charges-list-status ${(charge.status
                              ? 'PAGO'
                              : 'PENDENTE'
                            ).toLowerCase()}`}
                          >
                            {charge.status ? 'PAGO' : 'PENDENTE'}
                          </h4>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ModalDetailClient;
