import React, { ChangeEvent, useRef } from 'react';

import { ReturnComponentType } from 'types';
import Button from '../../common/button/Button';

export function InputTypeFiles():ReturnComponentType {
  const inputRef = useRef<HTMLInputElement>(null);
  const selectFileHandler = () => {
    if (inputRef) {
      inputRef.current?.click();
    }
  };
  const convertFileToBase64 = (file: File, callback:(value:string)=>void) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const file64 = reader.result as string;
      console.log(file64, 'file64');
      callback(file64);
    };
    reader.readAsDataURL(file);
  };
  const onChangeFileHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0];
      if (file.size < 3000000) {
        convertFileToBase64(file, (file64:string) => {
          console.log(file64);
        });
      }
    }
  };

  return (
    <div>

      <Button onClick={selectFileHandler}>Upload File</Button>

      <input
        type="file"
        style={{ display: 'none' }}
        ref={inputRef}
        onChange={onChangeFileHandler}
      />
    </div>
  );
}
