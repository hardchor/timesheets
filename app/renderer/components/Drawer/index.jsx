import React from 'react';
import { Drawer as MdlDrawer, Navigation, Spacer } from 'react-mdl';
import { Link, IndexLink } from 'react-router';
import classnames from 'classnames';
import styles from './drawer.css';

function Drawer() {
  const drawerClassName = classnames(
    'mdl-color--blue-grey-900',
    'mdl-color-text--blue-grey-50',
    styles.drawer
  );
  const navigationLinkIconClassName = classnames(
    'mdl-color-text--blue-grey-400',
    'material-icons',
    styles.navigationLinkIcon
  );

  return (
    <MdlDrawer className={drawerClassName}>
      <Navigation className={classnames('mdl-color--blue-grey-800', styles.navigation)}>
        <IndexLink to="/" className={styles.navigationLink} activeClassName={styles.active}>
          <i className={navigationLinkIconClassName} role="presentation">home</i>
          Home
        </IndexLink>
        <Link to="/jobs" className={styles.navigationLink} activeClassName={styles.active}>
          <i className={navigationLinkIconClassName} role="presentation">inbox</i>
          Jobs
        </Link>
        <Link to="/projects" className={styles.navigationLink} activeClassName={styles.active}>
          <i className={navigationLinkIconClassName} role="presentation">inbox</i>
          Projects
        </Link>
        <Link to="/github" className={styles.navigationLink} activeClassName={styles.active}>
          <i className={navigationLinkIconClassName} role="presentation">inbox</i>
          Github
        </Link>
        <Spacer />
      </Navigation>
    </MdlDrawer>
  );
}

export default Drawer;
