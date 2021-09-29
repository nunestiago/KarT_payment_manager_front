import React from 'react';

function Sidebar({ children }) {
  return (
    <div>
      <div>
        <div>Home</div>
        <div>Cobranças</div>
        <div>Clientes</div>
        <button>Criar cobrança</button>
      </div>
      {children}
    </div>
  );
}

export default Sidebar;
