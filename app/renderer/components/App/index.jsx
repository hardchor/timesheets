import React, { PropTypes } from 'react';
import { Layout, Content } from 'react-mdl';
import classnames from 'classnames';
import styles from './app.css';
import Header from '../Header';
import Drawer from '../Drawer';

function App({ children }) {
  const contentClassnames = classnames('mdl-color--grey-100', styles.content);

  return (
    <Layout fixedDrawer fixedHeader>
      <Header />
      <Drawer />
      <Content component="main" className={contentClassnames}>
        {children}
      </Content>
    </Layout>
  );
}

App.propTypes = {
  children: PropTypes.element.isRequired,
};

export default App;
