import React, { Component, PropTypes } from 'react';
import App from '../components/App';

export default class AppContainer extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
  };

  render() {
    return (
      <div>
        <App children={this.props.children} />
        {
          (() => {
            if (process.env.NODE_ENV !== 'production') {
              const DevTools = require('./DevTools'); // eslint-disable-line global-require
              return <DevTools />;
            }

            return null;
          })()
        }
      </div>
    );
  }
}
