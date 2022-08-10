import React from 'react';

import { useSelector } from 'react-redux';
import { AppStateType, useAppDispatch } from 'reducers/store';
import { idFilterPackAC } from 'reducers/cards-reducer';

const FilterForId = () => {
  const dispatch = useAppDispatch();
  const userId = useSelector<AppStateType, string>((state) => state.auth.profile._id);

  const filterHandler = (value: string):void => {
    dispatch(idFilterPackAC(value));
  };

  return (
    <div>
      <button onClick={() => filterHandler(userId)}>My</button>
      <button onClick={() => filterHandler('')}>All</button>
    </div>
  );
};

export default FilterForId;
