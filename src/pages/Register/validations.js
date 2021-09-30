import React from 'react';
import { toast } from 'react-toastify';

function registerValidations(data) {
  const toastOpts = {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

  const regexEmail =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;

  if (!data.nome) {
    toast.error('Nome é obrigatório.', toastOpts);
    return false;
  }

  if (!data.email) {
    toast.error('E-mail é obrigatório.', toastOpts);
    return false;
  }

  if (!regexEmail.test(data.email.toLowerCase())) {
    toast.error('Email inválido.', toastOpts);
    return false;
  }

  if (!data.senha) {
    toast.error('Senha é obrigatório.', toastOpts);
    return false;
  }
}

export default registerValidations;