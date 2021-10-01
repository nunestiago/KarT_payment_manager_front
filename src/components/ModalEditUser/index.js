import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import baseUrl from '../../utils/baseUrl';
import cpfMask from '../../utils/cpfMask';
import phoneMask from '../../utils/phoneMask';

function ModalEditUser({ setOpenModal, openModal }) {
  const {
    register,
    handleSubmit,
    formState: { isDirty, isValid },
  } = useForm({
    mode: 'onChange',
  });

  const closeModal = () => {
    setModalStatus(!modalStatus);
  };

  const handleEditUser = async (data) => {
    const onlyUpdatedData = Object.fromEntries(
      Object.entries(data).filter(([, value]) => value),
    );

    try {
      const response = await fetch(`${baseUrl}user/edit`, {
        method: 'PUT',
        body: JSON.stringify(onlyUpdatedData),
        headers: {
          'Content-Type': 'application/json',
          // Authorization: 'Bearer ' + token,
        },
      });

      const registerInDB = await response.json();

      if (!response.ok) {
        throw new Error(registerInDB);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <>
      {modalStatus && (
        <div>
          <div onClick={() => closeModal()}>X</div> Editar usuário{' '}
          <div>
            <form
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit(handleEditUser)}
            >
              <label htmlFor="nome">Nome</label>
              <input id="nome" type="text" {...register('nome')} />
              <label htmlFor="email">E-mail</label>
              <input id="email" type="email" {...register('email')} />{' '}
              <label htmlFor="senha">Nova Senha</label>
              <input
                id="senha"
                type="text"
                {...register('senha')}
                placeholder="Deixar vazio para não editar"
              />{' '}
              <label htmlFor="telefone">Telefone</label>
              <input
                id="telefone"
                type="text"
                {...register('telefone')}
                placeholder="(71) 9 9333-2222"
                onChange={phoneMask}
              />{' '}
              <label htmlFor="cpf">CPF</label>
              <input
                placeholder="111.222.333-44"
                id="cpf"
                type="text"
                {...register('cpf')}
                onChange={cpfMask}
              />{' '}
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default ModalEditUser;
