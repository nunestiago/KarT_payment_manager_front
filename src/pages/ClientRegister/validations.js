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
    throw new Error('Email inválido.');
  }

  if (!data.cpf) {
    toast.error('CPF é obrigatório.', toastOpts);
    return false;
  }

  if (!data.telefone) {
    toast.error('Telefone é obrigatório.', toastOpts);
    return false;
  }
}

export default registerValidations;