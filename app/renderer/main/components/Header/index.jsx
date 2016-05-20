import React from 'react';
import { Header as MdlHeader, HeaderRow, Textfield } from 'react-mdl';
import classnames from 'classnames';
import styles from './header.css';

function Header() {
  const headerClassNames = classnames(
    'mdl-color--grey-100',
    'mdl-color-text--grey-600',
    styles.header
  );

  return (
    <MdlHeader className={headerClassNames}>
      <HeaderRow title="Timesheets">
        <Textfield
          className={styles.textfield}
          value=""
          onChange={() => {}}
          label="Search"
          expandable
          expandableIcon="search"
        />
      </HeaderRow>
    </MdlHeader>
  );
}

export default Header;
