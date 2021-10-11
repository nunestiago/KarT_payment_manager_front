import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import InputMask from 'react-input-mask';
import baseUrl from '../../utils/baseUrl';
import useAuth from '../../hooks/useAuth';
import './style.scss';

function ModalEditClient({ closeModal, client, handleGetClients }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
  });
  const { token } = useAuth();
  const [handleClient, setHandleClient] = useState(client);

  const handleCep = async e => {
    const insertedCep = e.target.value.replace(/[^0-9]/g, '');

    if (insertedCep?.length < 8) {
      return;
    }
    try {
      const response = await fetch(
        `https://viacep.com.br/ws/${insertedCep}/json/`,
      );
      const viaCep = await response.json();
      setHandleClient({
        ...handleClient,
        'cep': insertedCep,
        'logradouro': viaCep.logradouro,
        'bairro': viaCep.bairro,
        'cidade': viaCep.localidade,
        'complemento': viaCep.complemento,
      });
    } catch (error) {
      toast.error(error.message);
    }
  };
  const handleEditClient = async () => {
    if (handleClient.cpf)
      handleClient.cpf = handleClient.cpf.replace(/[^0-9]/g, '');
    if (handleClient.cep)
      handleClient.cep = handleClient.cep.replace(/[^0-9]/g, '');
    if (handleClient.telefone)
      handleClient.telefone = handleClient.telefone.replace(/[^0-9]/g, '');
    if (handleClient.cpf.length !== 11) {
      return toast.error('CPF deve conter 11 dígitos');
    }
    if (
      handleClient.telefone.length !== 11 &&
      handleClient.telefone.length !== 10
    ) {
      return toast.error('(DDD) e telefone com 8 ou 9 dígitos');
    }
    try {
      const response = await fetch(`${baseUrl}client/edit`, {
        method: 'PUT',
        body: JSON.stringify(handleClient),
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      });

      const registerInDB = await response.json();

      if (!response.ok) {
        throw new Error(registerInDB);
      }

      closeModal();
      handleGetClients();
      toast.success(registerInDB);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    errors?.email && toast.error(errors.email.message);
  }, [errors.email]);

  return (
    <>
      <div className="modal_container" onClick={() => closeModal()}>
        <div
          onClick={e => {
            e.stopPropagation();
          }}
        >
          <form
            noValidate
            autoComplete="off"
            className="form-edit-user modal_padding"
            onSubmit={handleSubmit(handleEditClient)}
          >
            <div onClick={() => closeModal()} className="modal_close">
              X
            </div>
            <div className="flex-column all-size">
              <label htmlFor="nome">Nome</label>
              <input
                id="nome"
                type="text"
                {...register('nome', { required: true })}
                value={handleClient?.nome}
                onChange={e =>
                  setHandleClient({
                    ...handleClient,
                    'nome': e.target.value,
                  })
                }
              />
              <label htmlFor="email">E-mail</label>
              <input
                id="email"
                type="email"
                {...register('email', {
                  required: 'required',
                  pattern: {
                    value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/,
                    message: 'E-mail inválido',
                  },
                })}
                value={handleClient?.email}
                onChange={e =>
                  setHandleClient({
                    ...handleClient,
                    'email': e.target.value,
                  })
                }
              />{' '}
            </div>
            <div className="half">
              <div className="half_div">
                <label htmlFor="cpf">CPF</label>
                <InputMask
                  mask="999.999.999-99"
                  {...register('cpf')}
                  onChange={e =>
                    setHandleClient({
                      ...handleClient,
                      'cpf': e.target.value,
                    })
                  }
                  defaultValue={handleClient.cpf}
                />
              </div>
              <div className="half_div">
                <label htmlFor="telefone">Telefone</label>
                <InputMask
                  mask={
                    handleClient.telefone.length === 11
                      ? '(99) 99999-9999'
                      : '(99) 9999-9999'
                  }
                  {...register('telefone')}
                  onChange={e =>
                    setHandleClient({
                      ...handleClient,
                      'telefone': e.target.value,
                    })
                  }
                  value={handleClient?.telefone}
                />
              </div>
            </div>
            <div className="half">
              <div className="half_div">
                <label htmlFor="cep">CEP</label>
                <InputMask
                  mask="99-999.999"
                  {...register('cep')}
                  onChange={e => {
                    setHandleClient({
                      ...handleClient,
                      'cep': e.target.value,
                    });
                    handleCep(e);
                  }}
                  value={handleClient.cep}
                />
              </div>
              <div className="half_div">
                <label htmlFor="logradouro">Logradouro</label>
                <input
                  id="logradouro"
                  type="text"
                  {...register('logradouro')}
                  onChange={e =>
                    setHandleClient({
                      ...handleClient,
                      'logradouro': e.target.value,
                    })
                  }
                  value={handleClient?.logradouro}
                />
              </div>
            </div>
            <div className="half">
              <div className="half_div">
                <label htmlFor="bairro">Bairro</label>
                <input
                  id="bairro"
                  type="text"
                  {...register('bairro')}
                  onChange={e =>
                    setHandleClient({
                      ...handleClient,
                      'bairro': e.target.value,
                    })
                  }
                  value={handleClient.bairro}
                />{' '}
              </div>
              <div className="half_div">
                <label htmlFor="cidade">Cidade</label>
                <input
                  id="cidade"
                  type="text"
                  {...register('cidade')}
                  onChange={e =>
                    setHandleClient({
                      ...handleClient,
                      'cidade': e.target.value,
                    })
                  }
                  value={handleClient.cidade}
                />
              </div>
            </div>
            <div className="half">
              <div className="half_div">
                <label htmlFor="complemento">Complemento</label>
                <input
                  id="complemento"
                  type="text"
                  {...register('complemento')}
                  onChange={e =>
                    setHandleClient({
                      ...handleClient,
                      'complemento': e.target.value,
                    })
                  }
                  value={handleClient.complemento}
                />
              </div>
              <div className="half_div">
                <label htmlFor="pref">Ponto de Referência</label>
                <input
                  id="pref"
                  type="text"
                  {...register('ponto_referencia')}
                  onChange={e =>
                    setHandleClient({
                      ...handleClient,
                      'ponto_referencia': e.target.value,
                    })
                  }
                  value={handleClient.ponto_referencia}
                />
              </div>
            </div>
            <div className="flex-row btn-add-client">
              <button
                onClick={() => closeModal()}
                type="submit"
                className="btn-pink-border flex-row items-center content-center"
              >
                Cancelar
              </button>

              <button type="submit" className="btn-pink-light">
                Editar Cliente
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default ModalEditClient;
