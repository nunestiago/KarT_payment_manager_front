import React, { useState } from 'react';
import './style.scss';
import searchIcon from '../../assets/search.svg';
import { toast } from 'react-toastify';

function SearchInput({ data, setListState }) {
  const [search, setSearch] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    console.log(data);
    const result = data.filter(
      item =>
        item.nome?.toLocaleLowerCase().includes(search.toLowerCase()) ||
        item.email?.toLocaleLowerCase().includes(search.toLowerCase()) ||
        (item.status ? item.id === parseInt(search) : item.cpf === search),
    );
    if (result.length === 0)
      return toast.warn('Não existe resultado para busca feita');

    return setListState(() => result);
  }
  return (
    <form className="search_container" onSubmit={handleSubmit}>
      <input
        className="search_input"
        placeholder={`Procurar por Nome, E-mail ou ${
          data[0]?.status ? 'ID' : 'CPF'
        }`}
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
