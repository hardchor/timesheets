import React, { PropTypes } from 'react';
import { Drawer as MdlDrawer, Navigation, Spacer, Badge, Icon } from 'react-mdl';
import { Link, IndexLink } from 'react-router';
import classnames from 'classnames';
import styles from './drawer.css';

function Drawer({ job }) {
  const activeJobsCount = job.jobs.reduce(
    (previous, current) => (current.status === 'running' ? previous + 1 : previous),
    0
  );
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
          {!!activeJobsCount &&
            <Badge text={activeJobsCount} overlap>
              <Icon name="timer" className={navigationLinkIconClassName} />
            </Badge>
          }
          {!activeJobsCount &&
            <i className={navigationLinkIconClassName} role="presentation">timer</i>
          }
          Jobs
        </Link>
        <Link to="/projects" className={styles.navigationLink} activeClassName={styles.active}>
          <i className={navigationLinkIconClassName} role="presentation">group_work</i>
          Projects
        </Link>
        <Spacer />
        <Link to="/github" className={styles.navigationLink} activeClassName={styles.active}>
          <i className={navigationLinkIconClassName} role="presentation">code</i>
          Github
        </Link>
      </Navigation>
    </MdlDrawer>
  );
}

Drawer.propTypes = {
  job: PropTypes.object.isRequired,
};

export default Drawer;
