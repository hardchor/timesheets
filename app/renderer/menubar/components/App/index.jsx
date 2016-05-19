import React, { PropTypes } from 'react';
import { Layout, Content } from 'react-mdl';

function App({ children }) {
  return (
    <Layout fixedDrawer fixedHeader>
      <Content component="main" className="mdl-color--grey-100">
        {children}
      </Content>
    </Layout>
  );
}

App.propTypes = {
  children: PropTypes.element.isRequired,
};

export default App;
