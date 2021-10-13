import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import baseUrl from '../../utils/baseUrl';
import useAuth from '../../hooks/useAuth';
import phoneIcon from '../../assets/phone.svg';
import mailIcon from '../../assets/mail.svg';
import './style.scss';
import showCpf from '../../utils/showCPF';
import showPhone from '../../utils/showProperPhone';

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

      const dados = await response.json();
      if (!response.ok) {
        throw new Error(dados);
      }

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
            <div className="show_client-title">
              <h1 className="show_client-h1">{client.nome}</h1>
              <h2 className="show_client-h2">{showCpf(client.cpf)}</h2>
            </div>
            <div className="flex-row">
              <div className="flex-column between">
                <div className="flex-row tel-mail items-center">
                  <div className="flex-row items-center ">
                    <img src={mailIcon} alt="" className="show_client-img" />
                    <h2 className="show_client-h2 mr">{client.email}</h2>
                  </div>
                  <div className="flex-row items-center content-center">
                    <img src={phoneIcon} alt="" className="show_client-img" />
                    <h2 className="show_client-h2">
                      {showPhone(client.telefone)}
                    </h2>
                  </div>
                </div>
                <div className="flex-row between">
                  <div>
                    <strong className="show_client-strong">CEP</strong>
                    <h2 className="show_client-h2">{client.cep}</h2>
                  </div>
                  <div>
                    <strong className="show_client-strong">Bairro</strong>
                    <h2 className="show_client-h2">{client.bairro}</h2>
                  </div>{' '}
                  <div>
                    <strong className="show_client-strong">Cidade</strong>
                    <h2 className="show_client-h2">{client.cidade}</h2>
                  </div>
                </div>
                <div>
                  <strong className="show_client-strong">Logradouro</strong>
                  <h2 className="show_client-h2">{client.logradouro}</h2>
                </div>
                <div className="flex-row between">
                  <div className="mr">
                    <strong className="show_client-strong">Complemento</strong>
                    <h2 className="show_client-h2">{client.complemento}</h2>
                  </div>{' '}
                  <div>
                    <strong className="show_client-strong">
                      Ponto de Referência
                    </strong>
                    <h2 className="show_client-h2">{client.bairro}</h2>
                  </div>
                </div>
              </div>
              <div className="show_client-border"></div>
              <div>
                {charges &&
                  charges.map(charge => (
                    <div key={charge.id} className="charge_card-container">
                      <div className="flex-row align-center between">
                        <h2 className="show_charges-h2">
                          <strong className="show_charges-strong">
                            #{charge.id}{' '}
                          </strong>
                          {charge.descricao}
                        </h2>
                        <strong className="show_charges-strong">
                          R$ {(charge.valor / 100).toFixed(2)}
                        </strong>
                      </div>
                      <div className="flex-row items-center between">
                        <h3 className="show_charges-h3">
                          {new Date(charge.vencimento).toLocaleDateString(
                            'pt-BR',
                          )}
                        </h3>
                        <h4
                          className={`show_charges-h4 ${(charge.status
                            ? 'PAGO'
                            : 'PENDENTE'
                          ).toLowerCase()}`}
                        >
                          {charge.status ? 'PAGO' : 'PENDENTE'}
                        </h4>
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
