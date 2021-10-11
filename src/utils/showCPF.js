import { toast } from 'react-toastify';

function showCpf(e) {
  const toastOpts = {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

  let value = e;

  if (value.length > 14) {
    toast.error('O CPF deve possuir apenas 14 números', toastOpts);
    return false;
  }

  if (value.length <= 14) {
    value = value
      .replace(/\D/gu, '')
      .replace(/(?<frist>\d{3})(?<second>\d)/u, '$1.$2')
      .replace(/(?<frist>\d{3})(?<second>\d)/u, '$1.$2')
      .replace(/(?<frist>\d{3})(?<second>\d{1,2})/u, '$1-$2');

    return value;
  }
}

export default showCpf;
