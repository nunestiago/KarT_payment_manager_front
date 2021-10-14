import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import biggerIcon from '../../assets/bigger.svg';
import './style.scss';

function ReportsDropDown() {
  const [dropMenuOne, setDropMenuOne] = useState(false);
  const [dropMenuOneText, setDropMenuOneText] = useState('');
  const data = useLocation();
  const toQuery = new URLSearchParams(useLocation().search);
  let query = toQuery.get('relatorio') ?? data.state.relatorio;

  useEffect(() => {
    switch (query) {
      case 'emdia':
        setDropMenuOneText('Clientes');
        break;
      case 'inadimplente':
        setDropMenuOneText('Clientes');
        break;
      case 'previstas':
        setDropMenuOneText('Cobranças');
        break;
      case 'pagas':
        setDropMenuOneText('Cobranças');
        break;
      case 'vencidas':
        setDropMenuOneText('Cobranças');
        break;

      default:
        break;
    }
  }, []);

  return (
    <div className="flex-row items-center">
      <div className="drop_down" onMouseLeave={() => setDropMenuOne(false)}>
        <p
          className="drop_down_report"
          alt="user-icon"
          onClick={() => setDropMenuOne(!dropMenuOne)}
          onMouseEnter={() => setDropMenuOne(true)}
        >
          {dropMenuOneText.toUpperCase() || 0}
        </p>
        {dropMenuOne && (
          <div
            className="drop_down-menu"
            onMouseEnter={() => setDropMenuOne(true)}
            onMouseLeave={() => setDropMenuOne(false)}
          >
            <div onClick={() => setDropMenuOneText('Clientes')}>
              <p> Cliente </p>
            </div>
            <div onClick={() => setDropMenuOneText('Cobranças')}>
              <p>Cobranças</p>
            </div>
          </div>
        )}
      </div>
      <img className="drop_down_img" src={biggerIcon} alt="Bigger than icon" />
      <div className="drop_down" onMouseLeave={() => setDropMenuOne(false)}>
        <p
          className="drop_down_report"
          alt="user-icon"
          onClick={() => setDropMenuOne(!dropMenuOne)}
          onMouseEnter={() => setDropMenuOne(true)}
        >
          {query?.toUpperCase() || 0}
        </p>
        {dropMenuOne && (
          <div
            className="drop_down-menu"
            onMouseEnter={() => setDropMenuOne(true)}
            onMouseLeave={() => setDropMenuOne(false)}
          >
            {dropMenuOneText === 'Clientes' && (
              <>
                <Link
                  to="/relatorios?relatorio=emdia"
                  onClick={() => setDropMenuOneText('Clientes')}
                >
                  Em dia
                </Link>
                <Link
                  to="/relatorios?relatorio=inadimplente"
                  onClick={() => setDropMenuOneText('Clientes')}
                >
                  Inadimplente
                </Link>
              </>
            )}
            {dropMenuOneText === 'Cobranças' && (
              <>
                <Link
                  to="/relatorios?relatorio=previstas"
                  onClick={() => setDropMenuOneText('Cobranças')}
                >
                  Previstas
                </Link>
                <Link
                  to="/relatorios?relatorio=pagas"
                  onClick={() => setDropMenuOneText('Cobranças')}
                >
                  Pagas
                </Link>
                <Link
                  to="/relatorios?relatorio=vencidas"
                  onClick={() => setDropMenuOneText('Cobranças')}
                >
                  Vencidas
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ReportsDropDown;
