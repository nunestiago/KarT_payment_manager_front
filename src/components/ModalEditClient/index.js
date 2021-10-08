import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';
import InputMask from 'react-input-mask';
import baseUrl from '../../utils/baseUrl';
import useAuth from '../../hooks/useAuth';
import './style.scss';

function ModalEditClient({ closeModal, client, setClient, handleGetClients }) {
  const [address, setAddress] = useState({});
  const { register, handleSubmit, setValue, control } = useForm({
    mode: 'onChange',
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
      setValue('logradouro', viaCep.logradouro);
      setValue('bairro', viaCep.bairro);
      setValue('cidade', viaCep.localidade);
      setValue('complemento', viaCep.complemento);
      setAddress(viaCep);
    } catch (error) {
      toast.error(error.message);
    }
  };
  const handleEditClient = async data => {
    console.log(data);

    if (handleClient.cpf)
      handleClient.cpf = handleClient.cpf.replace(/[^0-9]/g, '');
    if (handleClient.telefone)
      handleClient.telefone = handleClient.telefone.replace(/[^0-9]/g, '');

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
      setClient(handleClient);
      toast.success(registerInDB);
    } catch (error) {
      toast.error(error.message);
    }
  };

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
                defaultValue={handleClient?.nome}
              />
              <label htmlFor="email">E-mail</label>
              <input
                id="email"
                type="email"
                {...register('email', { required: true })}
                defaultValue={handleClient?.email}
              />{' '}
            </div>
            <div className="half">
              <div className="half_div">
                <label htmlFor="cpf">CPF</label>
                <Controller
                  control={control}
                  name="cpf"
                  rule={{ required: true }}
                  render={({ field }) => (
                    <InputMask
                      mask="999.999.999-99"
                      onChange={e =>
                        setHandleClient({
                          ...handleClient,
                          'cpf': e.target.value,
                        })
                      }
                      value={handleClient.cpf}
                      selected={field.value}
                    />
                  )}
                />
              </div>
              <div className="half_div">
                <label htmlFor="telefone">Telefone</label>
                <Controller
                  control={control}
                  name="telefone"
                  rule={{ required: true }}
                  render={({ field }) => (
                    <InputMask
                      mask="(99)99999-9999"
                      onChange={e =>
                        setHandleClient({
                          ...handleClient,
                          'telefone': e.target.value,
                        })
                      }
                      value={handleClient?.telefone}
                      selected={field.value}
                    />
                  )}
                />
              </div>
            </div>
            <div className="half">
              <div className="half_div">
                <label htmlFor="cep">CEP</label>
                <Controller
                  control={control}
                  name="cep"
                  rule={{ required: true }}
                  render={({ field }) => (
                    <InputMask
                      mask="99-999.999"
                      onChange={e => {
                        setHandleClient({
                          ...handleClient,
                          'cep': e.target.value,
                        });
                        handleCep(e);
                      }}
                      value={handleClient?.cep}
                      selected={field.value}
                    />
                  )}
                />
              </div>
              <div className="half_div">
                <label htmlFor="logradouro">Logradouro</label>
                <input
                  id="logradouro"
                  type="text"
                  {...register('logradouro')}
                  value={address.logradouro}
                  onChange={e =>
                    setHandleClient({
                      ...handleClient,
                      'logradouro': e.target.value,
                    })
                  }
                  defaultValue={handleClient?.logradouro}
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
                  value={address.bairro}
                  onChange={e =>
                    setHandleClient({
                      ...handleClient,
                      'bairro': e.target.value,
                    })
                  }
                  defaultValue={handleClient?.bairro}
                />{' '}
              </div>
              <div className="half_div">
                <label htmlFor="cidade">Cidade</label>
                <input
                  id="cidade"
                  type="text"
                  {...register('cidade')}
                  value={handleClient?.cidade}
                  onChange={e =>
                    setHandleClient({
                      ...handleClient,
                      'cidade': e.target.value,
                    })
                  }
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
                  value={handleClient?.complemento}
                  onChange={e =>
                    setHandleClient({
                      ...handleClient,
                      'complemento': e.target.value,
                    })
                  }
                  defaultValue={handleClient?.complemento}
                />
              </div>
              <div className="half_div">
                <label htmlFor="pref">Ponto de Referência</label>
                <input
                  id="pref"
                  type="text"
                  {...register('ponto_referencia')}
                  defaultValue={handleClient?.ponto_referencia}
                  onChange={e =>
                    setHandleClient({
                      ...handleClient,
                      'ponto_referencia': e.target.value,
                    })
                  }
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
