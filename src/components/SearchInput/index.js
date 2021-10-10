import React, { useState } from 'react';
import './style.scss';
import searchIcon from '../../assets/search.svg';
import { toast } from 'react-toastify';

function SearchInput({ data, setListState }) {
  const [search, setSearch] = useState('');
  function handleSubmit(e) {
    e.preventDefault();

    const result = data.filter(
      item =>
        item.nome.toLocaleLowerCase().includes(search) ||
        item.email.toLocaleLowerCase().includes(search) ||
        item.cpf === search ||
        item.id === search,
    );

    if (result.length === 0)
      return toast.warn('Não existe resultado para busca feita');

    return setListState(result);
  }
  return (
    <form className="search_container" onSubmit={handleSubmit}>
      <input
        className="search_input"
        placeholder="Procurar por Nome, E-mail ou CPF"
        type="text"
        onChange={e => setSearch(e.target.value)}
      />
      <button className="search_button" type="submit">
        <img
          src={searchIcon}
          alt="lupa da busca"
          className="search_button_img"
        />
        <div className="search_button_message">BUSCAR</div>
      </button>
    </form>
  );
}

export default SearchInput;
