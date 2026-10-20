import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';

function NajotTalim() {
  const location = useLocation();

  return (
    <div className="layout">
      <aside className="sidebar">
       
        <div className="logo">
          NAJOT <span>TA'LIM</span>
        </div>

     
        <nav className="menu">
          <Link to="/najot-talim/guruhlar">Guruhlarim</Link>
        </nav>

      </aside>

      <div className="main">
        <header className="header">
          <h1>Najot Talim</h1>
        </header>

        <div className="content">
          <Outlet />
        </div>

      </div>
    </div>
  );
}

export default NajotTalim;
