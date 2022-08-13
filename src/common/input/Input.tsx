import React, {
  ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, KeyboardEvent,
} from 'react';
import s from './Input.module.css';

// тип пропсов обычного инпута
type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

// здесь мы говорим что у нашего инпута будут такие же пропсы как у обычного инпута
// (чтоб не писать value: string, onChange: ...; они уже все описаны в DefaultInputPropsType)
type SuperInputTextPropsType = DefaultInputPropsType & { // и + ещё пропсы которых нет в стандартном инпуте
    onChangeText?: (value: string) => void
    onEnter?: () => void
    error?: boolean
    spanClassName?: string
}

const Input: React.FC<SuperInputTextPropsType> = (
  {
    type, // достаём и игнорируем чтоб нельзя было задать другой тип инпута
    onChange, onChangeText,
    onKeyPress, onEnter,
    error,
    className, spanClassName,

    ...restProps// все остальные пропсы попадут в объект restProps
  },
) => {
  const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
    // если есть пропс onChange
    if (onChange) {
      onChange(e); // то передать ему е (поскольку onChange не обязателен)
    }
    if (onChangeText) {
      onChangeText(e.currentTarget.value);
    }
  };
  const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
    if (onKeyPress) {
      onKeyPress(e);
    }
    if (onEnter && e.key === 'Enter') { // если есть пропс onEnter, // и если нажата кнопка Enter
      onEnter(); // то вызвать его
    }
  };

  const finalSpanClassName = `${s.error} ${spanClassName || ''}`;
  const finalInputClassName = `${s.input} ${error ? s.errorInput : s.superInput} ${className}`;

  return (
    <>
      <input
        type="text"
        onChange={onChangeCallback}
        onKeyPress={onKeyPressCallback}
        className={finalInputClassName}
        {...restProps}
      />
      {error && <span className={finalSpanClassName}>{error}</span>}
    </>
  );
};

export default Input;
