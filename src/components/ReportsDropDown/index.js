import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import biggerIcon from '../../assets/bigger.svg';
import './style.scss';

function ReportsDropDown() {
  const [dropMenuOne, setDropMenuOne] = useState(false);
  const [dropMenuTwo, setDropMenuTwo] = useState(false);
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
              <p
                className={`drop_down-${
                  query === 'emdia' || query === 'inadimplente'
                    ? 'active'
                    : 'not'
                }`}
              >
                {' '}
                Cliente{' '}
              </p>
            </div>
            <div onClick={() => setDropMenuOneText('Cobranças')}>
              <p
                className={`drop_down-${
                  query === 'vencidas' ||
                  query === 'previstas' ||
                  query === 'pagas'
                    ? 'active'
                    : 'not'
                }`}
              >
                Cobranças
              </p>
            </div>
          </div>
        )}
      </div>
      <img className="drop_down_img" src={biggerIcon} alt="Bigger than icon" />
      <div className="drop_down" onMouseLeave={() => setDropMenuOne(false)}>
        <p
          className="drop_down_report"
          alt="user-icon"
          onClick={() => setDropMenuOne(!dropMenuTwo)}
          onMouseEnter={() => setDropMenuTwo(true)}
        >
          {query?.toUpperCase() || 0}
        </p>
        {dropMenuTwo && (
          <div
            className="drop_down-menu"
            onMouseEnter={() => setDropMenuTwo(true)}
            onMouseLeave={() => setDropMenuTwo(false)}
          >
            {dropMenuOneText === 'Clientes' && (
              <>
                <Link
                  to="/relatorios?relatorio=emdia"
                  onClick={() => setDropMenuOneText('Clientes')}
                  className={`drop_down-${
                    query === 'emdia' ? 'active' : 'not'
                  }`}
                >
                  Em dia
                </Link>
                <Link
                  to="/relatorios?relatorio=inadimplente"
                  onClick={() => setDropMenuOneText('Clientes')}
                  className={`drop_down-${
                    query === 'inadimplente' ? 'active' : 'not'
                  }`}
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
                  className={`drop_down-${
                    query === 'previstas' ? 'active' : 'not'
                  }`}
                >
                  Previstas
                </Link>
                <Link
                  to="/relatorios?relatorio=pagas"
                  onClick={() => setDropMenuOneText('Cobranças')}
                  className={`drop_down-${
                    query === 'pagas' ? 'active' : 'not'
                  }`}
                >
                  Pagas
                </Link>
                <Link
                  to="/relatorios?relatorio=vencidas"
                  onClick={() => setDropMenuOneText('Cobranças')}
                  className={`drop_down-${
                    query === 'vencidas' ? 'active' : 'not'
                  }`}
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
