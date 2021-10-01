import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import baseUrl from '../../utils/baseUrl';
import cpfMask from '../../utils/cpfMask';
import phoneMask from '../../utils/phoneMask';
import PasswordInput from '../PasswordInput';
import useAuth from '../../hooks/useAuth';
import './style.scss';

function ModalEditUser({ setOpenModal, openModal }) {
  const { register, handleSubmit } = useForm({
    mode: 'onChange',
  });
  const { token, user, setUser } = useAuth();

  const closeModal = () => {
    setOpenModal(!openModal);
  };

  const handleEditUser = async data => {
    const onlyUpdatedData = Object.fromEntries(
      Object.entries(data).filter(([, value]) => value),
    );

    try {
      const response = await fetch(`${baseUrl}user/edit`, {
        method: 'PUT',
        body: JSON.stringify(onlyUpdatedData),
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      });

      const registerInDB = await response.json();

      if (!response.ok) {
        throw new Error(registerInDB);
      }
      setUser(onlyUpdatedData);
      closeModal();
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
            className="form modal_padding"
            onSubmit={handleSubmit(handleEditUser)}
          >
            {'//'} Editar usuário{' '}
            <div onClick={() => closeModal()} className="modal_close">
              X
            </div>
            <div className="flex-column input">
              <label htmlFor="nome">Nome</label>
              <input
                id="nome"
                type="text"
                {...register('nome')}
                defaultValue={user?.nome}
              />
            </div>
            <div className="flex-column input">
              <label htmlFor="email">E-mail</label>
              <input
                id="email"
                type="email"
                {...register('email')}
                defaultValue={user?.email}
              />{' '}
            </div>
            <PasswordInput
              label="Senha"
              placeholder="Deixar vazio para não editar"
              register={register}
              reqBool={false}
            />
            <div className="flex-column input">
              <label htmlFor="telefone">Telefone</label>
              <input
                id="telefone"
                type="text"
                {...register('telefone')}
                placeholder="(71) 9 9333-2222"
                onChange={phoneMask}
                defaultValue={user?.telefone}
              />{' '}
            </div>
            <div className="flex-column input">
              <label htmlFor="cpf">CPF</label>
              <input
                placeholder="111.222.333-44"
                id="cpf"
                type="text"
                {...register('cpf')}
                onChange={cpfMask}
                defaultValue={user?.cpf}
              />{' '}
            </div>
            <button
              className={`btn-pink-light flex-row items-center content-center`}
              type="submit"
            >
              Editar Conta
            </button>{' '}
          </form>
        </div>
      </div>
    </>
  );
}

export default ModalEditUser;
