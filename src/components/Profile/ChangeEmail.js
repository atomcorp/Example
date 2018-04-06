// @flow
import React from 'react';
import type {Node} from 'react';
import defaultStyles from '../../styles/default.module.css';
import formStyles from '../../styles/form.module.css';
import styles from './Profile.module.css';
import type {KeyType} from './Profile';
type PropsType = {
  email: string,
  editValue: () => Node,
  handleEmailChange: () => void,
  userEditIsVisible: boolean,
  handleUserEditIsVisible: (
    KeyType
  ) => void,
};

const ChangeEmail = (props: PropsType): Node => (
  <div className={styles.field}>
    <div className={styles.header}>
      Email
      <button
        className={`${defaultStyles.link} ${styles.edit}`}
        onClick={(): void => props.handleUserEditIsVisible('email')}
      >
          edit
      </button>
    </div>
    <div className={styles.value}>
      {props.email}
    </div>
    {
      props.userEditIsVisible
      && <form onSubmit={(e: Event) => {
        e.preventDefault();
        props.handleEmailChange();
      }}>
        <div className={formStyles.inline}>
          {props.editValue()}
          <input
            className={formStyles.button}
            type="submit"
            value={'Confirm'}
          />
        </div>
      </form>
    }
  </div>
);

export default ChangeEmail;
