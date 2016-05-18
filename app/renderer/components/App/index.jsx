import React, { PropTypes } from 'react';
import { Layout, Content } from 'react-mdl';
import classnames from 'classnames';
import styles from './app.css';
import Header from '../Header';
import Drawer from '../Drawer';

function App({ children, job }) {
  const contentClassnames = classnames('mdl-color--grey-100', styles.content);

  return (
    <Layout fixedDrawer fixedHeader>
      <Header />
      <Drawer job={job} />
      <Content component="main" className={contentClassnames}>
        {children}
      </Content>
      {
        (() => {
          if (process.env.NODE_ENV !== 'production') {
            const DevTools = require('../DevTools');
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
  job: PropTypes.object.isRequired,
};

export default App;
