import React, { ChangeEvent, DetailedHTMLProps, InputHTMLAttributes } from 'react';
import s from './Checkbox.module.css';

// тип пропсов обычного инпута
type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type SuperCheckboxPropsType = DefaultInputPropsType & {
    onChangeChecked?: (checked: boolean) => void
    spanClassName?: string
}

const Checkbox: React.FC<SuperCheckboxPropsType> = (
  {
    type, // достаём и игнорируем чтоб нельзя было задать другой тип инпута
    onChange, onChangeChecked,
    className, spanClassName,
    children, // в эту переменную попадёт текст, типизировать не нужно так как он затипизирован в React.FC

    ...restProps// все остальные пропсы попадут в объект restProps
  },
) => {
  const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
    if (onChangeChecked) {
      onChangeChecked(e.currentTarget.checked);
    }
    if (onChange) {
      onChange(e);
    }
  };

  const finalInputClassName = `${s.checkbox} ${className || ''}`;

  return (
    <label className={s.label}>
      <input
        type="checkbox"
        onChange={onChangeCallback}
        className={finalInputClassName}
        {...restProps}
      />
      {children && <span className={s.spanClassName}>{children}</span>}
    </label> // благодаря label нажатие на спан передастся в инпут
  );
};

export default Checkbox;
