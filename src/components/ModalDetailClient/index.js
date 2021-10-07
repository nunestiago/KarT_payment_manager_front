import React from 'react';
// import { toast } from 'react-toastify';
// import baseUrl from '../../utils/baseUrl';
// import useAuth from '../../hooks/useAuth';
import phoneIcon from '../../assets/phone.svg';
import mailIcon from '../../assets/mail.svg';
import './style.scss';

function ModalDetailClient() {
  // const { token, clients, setClients } = useAuth();

  // const closeModal = () => {
  //   setOpenModal(!openModal);
  // };

  // const handleGetCharges = async () => {
  //   try {
  //     const response = await fetch(`${baseUrl}charges/getCharge?clientId=${baseUrl}`, {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: 'Bearer ' + token,
  //       },
  //     });

  //     if (!response.ok) {
  //       return;
  //     }

  //     const dados = await response.json();
  //     setClients(dados);
  //     console.log(clients);
  //     console.log(dados);
  //   } catch (error) {
  //     toast.error(error.message);
  //   }
  // };

  // useEffect(() => {
  //   handleGetCharges();
  // }, []);

  return (
    <>
      <div
        className="modal_container"
        // onClick={() => closeModal()}
      >
        <div
          onClick={e => {
            e.stopPropagation();
          }}
        >
          <div className="show_client-container">
            <div
              // onClick={() => closeModal()}
              className="modal_close"
            >
              X
            </div>
            <div className="flex-row items-center">
              <div>
                <div>
                  <h1>Nome</h1>
                </div>
                <h2>000.000.000-00</h2>
              </div>
            </div>
            <div className="flex-row">
              <div>
                <div className="flex-row">
                  <div className="flex-row">
                    <img src={mailIcon} alt="" />
                    <h2>email@email.com</h2>
                  </div>
                  <div className="flex-row">
                    <img src={phoneIcon} alt="" />
                    <h2>(DDD) 55555-0000</h2>
                  </div>
                </div>
                <div className="flex-row">
                  <div>
                    <strong>CEP</strong>
                    <h2>NÚMERO CEP</h2>
                  </div>
                  <div>
                    <strong>Bairro</strong>
                    <h2>BAIRRO</h2>
                  </div>{' '}
                  <div>
                    <strong>Cidade</strong>
                    <h2>CIDADE</h2>
                  </div>
                </div>
                <div>
                  <strong>Logradouro</strong>
                  <h2>LOGRADOURO</h2>
                </div>
                <div className="flex-row">
                  <div>
                    <strong>Complemento</strong>
                    <h2>COMPLEMENTO</h2>
                  </div>{' '}
                  <div>
                    <strong>Ponto de Referência</strong>
                    <h2>PONTODEREFERENCIA</h2>
                  </div>
                </div>
              </div>
              <div className="show_client-border"></div>
              <div className="charge_card-container">
                <div className="flex-row">
                  <div>
                    <div className="flex-row">
                      <div>
                        <strong>#19 </strong>
                        Pagamento referente à...
                      </div>
                    </div>
                    <h3>13/12/2020</h3>
                  </div>
                  <div>
                    <strong>R$ 5000,00</strong>
                    <div>PAGO</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ModalDetailClient;
