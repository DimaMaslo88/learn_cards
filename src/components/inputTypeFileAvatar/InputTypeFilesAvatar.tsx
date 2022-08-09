import React, { ChangeEvent, useRef, useState } from 'react';
import { Avatar, Stack } from '@mui/material';
import { Folder } from '@material-ui/icons';
import { useSelector } from 'react-redux';
import { AppStateType, useAppDispatch } from 'reducers/store';
import { UpdateUserTC } from 'reducers/auth-reducer';
import { setErrorAppAC } from 'reducers/app-reducer';
import style from './InputTypeFilesAvatar.module.scss';

const defaultAva = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoKS48ilmDRBg8dQUfQLAuHJolMtiVxpnzVT8tRbTxdUuSQDmVMr5NRrn_pV0kgyqr7cU&usqp=CAU';

export function InputTypeFilesAvatar():React.ReactElement {
  const dispatch = useAppDispatch();
  const ava = useSelector<AppStateType, string>((state) => state.auth.profile.avatar);
  const [brokenAva, setBrokenAva] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const selectFileHandler = ():void => {
    inputRef && inputRef.current?.click();
  };
  const onChangeFileHandler = (e: ChangeEvent<HTMLInputElement>):void => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0];
      if (file.size < 3000000) {
        convertFileToBase64(file, (file64: string) => {
          // setAva(file64)
          dispatch(UpdateUserTC({ avatar: file64 }));
        });
      } else {
        dispatch(setErrorAppAC('Avatar TOO BIG...))'));
      }
    }
  };

  const convertFileToBase64 = (file: File, callback: (value: string) => void):void => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const file64 = reader.result as string;
      console.log(file64, 'file64');
      callback(file64);
    };
    reader.readAsDataURL(file);
  };
  const errorHandler = ():void => {
    setBrokenAva(true);
    alert('invalid image');
  };
  return (
    <div>
      <div>
        <img
          src={brokenAva || ava === null ? defaultAva : ava}
          className={style.img}
          onError={errorHandler}
        />
      </div>
      <div className={style.addAva}>
        <Stack direction="row" spacing={2}>
          <Avatar style={{ color: 'blue' }}>
            <Folder onClick={selectFileHandler} />
          </Avatar>
        </Stack>
      </div>

      <input
        type="file"
        style={{ display: 'none' }}
        ref={inputRef}
        onChange={onChangeFileHandler}
      />
    </div>
  );
}
