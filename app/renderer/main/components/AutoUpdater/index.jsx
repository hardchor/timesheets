import React, { PropTypes } from 'react';
import { Snackbar, Spinner, Icon } from 'react-mdl';
import styles from './autoUpdater.css';

function AutoUpdater({ system }) {
  const noop = () => {};
  return (
    <div>
      <Snackbar active={system.checkingForUpdate} onTimeout={noop} timeout={10000}>
        <div className={styles.snackbarIconContainer}>
          <Spinner />
          <span className={styles.snackbarIconText}>
            Checking for updates...
          </span>
        </div>
      </Snackbar>

      <Snackbar active={system.updateAvailable} onTimeout={noop} timeout={10000}>
        <div className={styles.snackbarIconContainer}>
          <Spinner />
          <span className={styles.snackbarIconText}>
            There's an update available. Downloading...
          </span>
        </div>
      </Snackbar>

      <Snackbar active={system.updateDownloaded} onTimeout={noop} timeout={50000}>
        Update <strong>{system.release.releaseName}</strong> downloaded.
        Restart to apply.
      </Snackbar>

      <Snackbar active={system.updateError} onTimeout={noop} timeout={10000}>
        <div className={styles.snackbarIconContainer}>
          <Icon name="sentiment_very_dissatisfied" />
          <span className={styles.snackbarIconText}>
            An error occurred downloading updates
          </span>
        </div>
      </Snackbar>

      <Snackbar active={system.updateNotAvailable} onTimeout={noop} timeout={2000}>
        <div className={styles.snackbarIconContainer}>
          <Icon name="sentiment_very_satisfied" />
          <span className={styles.snackbarIconText}>
            Timesheets is up-to-date
          </span>
        </div>
      </Snackbar>
    </div>
  );
}

AutoUpdater.propTypes = {
  system: PropTypes.object.isRequired,
};

export default AutoUpdater;
