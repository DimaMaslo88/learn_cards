import React from 'react';
import PackList from '../packListPage/PackList';

import HeaderPack from './header/Header';

function PackListContainer():React.ReactElement {
  return (
    <div>
      <h2>CardPacks</h2>
      <div>
        <HeaderPack />

      </div>

      <div>
        <PackList />
      </div>

    </div>
  );
}

export default PackListContainer;
