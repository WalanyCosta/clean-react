import React, { useContext, useRef } from 'react';
import { Context } from '@/presentation/context/form/form-context';
import Styles from './input-styles.scss';

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const Input: React.FC<Props> = (props: Props) => {
  const { state, setState } = useContext(Context);
  const error = state[`${props.name}Error`];
  const inputRef = useRef<HTMLInputElement>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>):void => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  return (
    <div
      data-testid={`${props.name}-wrap`}
      className={Styles.inputWrap}
      data-status={error ? 'invalid' : 'valid'}
    >
      <input
        {...props}
        title={error}
        ref={inputRef}
        placeholder=" "
        data-testid={props.name}
        onChange={handleChange}
      />
      <label
        data-testid={`${props.name}-label`}
        onClick={() => { inputRef.current.focus(); }}
        title={error}
        >
        {props.placeholder}
      </label>
    </div>
  );
};

export default Input;
