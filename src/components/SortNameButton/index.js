import React from 'react';
import './style.scss';
import sortIcon from '../../assets/sortIcon.svg';

function SortNameButton({ data, setListState }) {
  function handleSort() {
    function SortArray(x, y) {
      return x.nome.localeCompare(y.nome);
    }
    const result = [...data].sort(SortArray);
    return setListState(result);
  }
  return (
    <div style={{ cursor: 'pointer', marginLeft: '5px' }}>
      <img src={sortIcon} alt="" onClick={handleSort} />
    </div>
  );
}

export default SortNameButton;
