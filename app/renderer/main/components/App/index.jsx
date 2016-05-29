import React, { PropTypes } from 'react';
import { Layout, Content } from 'react-mdl';
import AutoUpdater from '../AutoUpdater';
import Header from '../Header';
import Drawer from '../Drawer';

function App({ children, system, job, settings }) {
  return (
    <Layout fixedDrawer fixedHeader>
      <Header />
      <Drawer job={job} settings={settings} />
      <Content component="main" className="mdl-color--grey-100">
        <AutoUpdater system={system} />
        {children}
      </Content>
      {
        (() => {
          if (process.env.NODE_ENV !== 'production') {
            const DevTools = require('../DevTools'); // eslint-disable-line global-require
            return <DevTools />;
          }

          return null;
        })()
      }
    </Layout>
  );
}

App.propTypes = {
  children: PropTypes.element.isRequired,
  system: PropTypes.object.isRequired,
  job: PropTypes.object.isRequired,
};

export default App;
