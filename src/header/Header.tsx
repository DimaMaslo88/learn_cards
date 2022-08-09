import React from 'react';
import { NavLink } from 'react-router-dom';
import { Path } from 'enum';
import s from './Header.module.scss';

function Header():React.ReactElement {
  return (
    <div className={s.container}>
      <div className={s.pages}>
        <NavLink to={Path.login} className={({ isActive }) => (isActive ? s.active : s.item)}>Log in</NavLink>
        {/* <NavLink to={PATH.signup} className={({isActive}) => (isActive ? s.active : s.item)}>Sign up</NavLink> */}
        <NavLink to={Path.profile} className={({ isActive }) => (isActive ? s.active : s.item)}>Profile</NavLink>

        <NavLink
          to={Path.packList}
          className={({ isActive }) => (isActive ? s.active : s.item)}
        >
          PackList
        </NavLink>

      </div>
    </div>
  );
}

export default Header;
