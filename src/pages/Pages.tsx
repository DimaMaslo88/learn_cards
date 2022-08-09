import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Path } from 'enum';
import { ReturnComponentType } from 'types';
import Profile from './p3-profile/Profile';
import Login from './p1-login/Login';
import Signup from './p2-signup/Signup';
import NewPassword from './p4-new-password/NewPassword';
import RestorePassword from './p5-reset/RestorePassword';
import Error404 from './p6-error/404';
import s from './Pages.module.css';
import PackListContainer from './packListContainer/PackListContainer';
import CardsListContainer from './cardsListContainer/CardsListContainer';

function Pages():ReturnComponentType {
  return (
    <div className={s.pagesContainer}>

      <Routes>
        <Route path="/" element={<Profile />} />
        <Route path={Path.login} element={<Login />} />
        <Route path={Path.signup} element={<Signup />} />
        <Route path={Path.profile} element={<Profile />} />
        <Route path={Path.newPassword} element={<NewPassword />} />
        <Route path={Path.packList} element={<PackListContainer />} />
        <Route path={`${Path.packList}/:pack_id`} element={<CardsListContainer />} />
        <Route path={`${Path.restorePassword}/:token`} element={<RestorePassword />} />
        <Route path={Path.error} element={<Error404 />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </div>
  );
}

export default Pages;
