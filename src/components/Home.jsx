import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'; // Import useHistory from react-router-dom
import {
  FormOutlined,
  HomeOutlined,
  InboxOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';

import './Home.css';

import RequestsChart from './RequestsChart';
import Notifications from './Notifications';
import Profile from './Profile';


const { Header, Sider, Content } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { colorBgContainer, borderRadiusLG } = theme.useToken(); 
  const history = useHistory(); // Get the history object from react-router-dom

  const handleMenuClick = (key) => {
    if (key === '3') {
      // Handle menu item 'Создать заявку' click
      history.push('/new'); 
      window.location.reload();
      // Use history.push to navigate to '/new'
    }
    if (key === '2'){
        history.push('/tickets');
        window.location.reload();
    }
  };

  return (
    <Layout style={{ height: '100vh' }}>
      
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          onClick={({ key }) => handleMenuClick(key)} // Pass the key to the click handler
          items={[
            {
              key: '1',
              icon: <HomeOutlined />,
              label: 'Главная страница',
            },
            {
              key: '2',
              icon: <InboxOutlined />,
              label: 'Заявки',
            },
            {
              key: '3',
              icon: <FormOutlined />,
              label: 'Создать заявку',
            },
          ]}
        />
      </Sider>
      
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              color: 'white',
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <Notifications 
            type="text"
            
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              color: 'white',
              fontSize: '16px',
              width: 64,
              height: 64,
            }}/>
            <Profile/>
        </Header>
        
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
        <RequestsChart />
        
        </Content>
      </Layout>
      
    </Layout>
  );
};

export default App;
