// @flow
import React from 'react';
import type {Node} from 'react';
import styles from './Login.module.css';

type ResetPasswordType = {
  state: string,
  handleResetRequest: (string) => void,
  translate: string,
  handleInput: (Event, string) => void,
};

const ResetPassword = ({
  state,
  handleResetRequest,
  translate,
  handleInput,
}: ResetPasswordType): Node => (
  <form
    onSubmit={(e: Event) => {
      e.preventDefault();
      handleResetRequest(state.email);
    }}
    className={state.passReset ? styles.show : styles.hide}
  >
    <input
      onInput={(e: Event): void => handleInput('email', e)}
      type="text"
      value={state.email}
    />
    <input type="submit" value={'reset'}/>
  </form>
);

export default ResetPassword;
