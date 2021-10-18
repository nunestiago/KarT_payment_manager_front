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
            Authorization: `Bearer ${token}`,
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
      <div
        className="modal_container"
        onClick={() => {
          closeModal();
        }}
      >
        <div
          className="show_client-container"
          onClick={e => e.stopPropagation()}
        >
          <p onClick={() => closeModal()} className="edit_modal_close">
            X
          </p>
          <h2 className="show_client-h2">{client.nome}</h2>
          <p className="show_client-p mb30">{showCpf(client.cpf)}</p>
          <div className="show_client-card">
            <div className="show_client-info">
              <div className="flex-row items-center">
                <div className="flex-row items-center ">
                  <img src={mailIcon} alt="" className="show_client-img" />
                  <p className="show_client-p mr">{client.email}</p>
                </div>
                <div className="flex-row items-center content-center">
                  <img src={phoneIcon} alt="" className="show_client-img" />
                  <p className="show_client-p">{showPhone(client.telefone)}</p>
                </div>
              </div>
              <div className="flex-row between">
                <div>
                  <strong className="show_client-strong">CEP</strong>
                  <p className="show_client-p mt10">{client.cep}</p>
                </div>
                <div>
                  <strong className="show_client-strong">Bairro</strong>
                  <p className="show_client-p  mt10">{client.bairro}</p>
                </div>{' '}
                <div>
                  <strong className="show_client-strong">Cidade</strong>
                  <p className="show_client-p  mt10">{client.cidade}</p>
                </div>
              </div>
              <div>
                <strong className="show_client-strong">Logradouro</strong>
                <p className="show_client-p  mt10">{client.logradouro}</p>
              </div>
              <div className="flex-row between">
                <div className="mr">
                  <strong className="show_client-strong">Complemento</strong>
                  <p className="show_client-p  mt10">{client.complemento}</p>
                </div>{' '}
                <div>
                  <strong className="show_client-strong">
                    Ponto de Referência
                  </strong>
                  <p className="show_client-p mt10">{client.bairro}</p>
                </div>
              </div>
            </div>
            <div className="show_client-border" />
            <div className="charge_card-container">
              {charges &&
                charges.map(charge => (
                  <div key={charge.id} className="charge_card-inside">
                    <div className="flex-row items-center between mb20">
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
    </>
  );
}

export default ModalDetailClient;
