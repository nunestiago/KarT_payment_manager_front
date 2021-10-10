import React, { useState } from 'react';
import './style.scss';
import searchIcon from '../../assets/search.svg';

function SearchInput({ data, setCharges }) {
  const [search, setSearch] = useState();
  function handleSubmit(e) {
    e.preventDefault();
    const value = e.target.value;
    let test = (arr, str) => {
      return arr.filter(x =>
        Object.values(x).join(' ').toLowerCase().includes(str.toLowerCase()),
      );
    };
    return setCharges(test(data, search));
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
