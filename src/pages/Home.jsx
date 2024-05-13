import React from 'react';
import { Layout } from 'antd';
import Navbar from '../components/Sidebar';


const { Content } = Layout;

const Home = () => {
  return (

      <Layout>
        <Navbar />
        <Layout style={{ padding: '0 16px', marginTop: 64 }}>
          <Content
            className="site-layout-background"
            style={{
              padding: 16,
              margin: 0,
              minHeight: 280,
            }}
          >
            <Dashboard />
          </Content>
        </Layout>
      </Layout>
        );
};

export default Home;
