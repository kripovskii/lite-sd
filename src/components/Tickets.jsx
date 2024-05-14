import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { FormOutlined, HomeOutlined, InboxOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button, Layout, Menu, Table, Tag } from 'antd';

const { Header, Sider, Content } = Layout;

const Tickets = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [tickets, setTickets] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/tickets');
        if (response.ok) {
          const data = await response.json();
          setTickets(data);
        } else {
          console.error('Ошибка при получении списка заявок:', response.statusText);
        }
      } catch (error) {
        console.error('Ошибка при получении списка заявок:', error);
      }
    };

    fetchData();
  }, []);

  const handleMenuClick = (key) => {
    if (key === '3') {
      history.push('/new');
    }
    if (key === '2') {
      history.push('/tickets');
    }
  };

  const renderEmployeeColumn = (employee) => {
    return employee ? employee : 'Не назначен';
  };

  const handleViewTicket = (number) => {
    history.push(`/ticket/${number}`);
    window.location.reload();
  };

  const columns = [
    {
      title: 'Номер заявки',
      dataIndex: 'number',
      key: 'number',
    },
    {
      title: 'Статус',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let color = '';

        switch (status) {
          case 'Новая':
            color = 'red';
            break;
          case 'В работе':
            color = 'gold';
            break;
          case 'В ожидании ответа':
            color = 'blue';
            break;
          case 'Решена':
            color = 'green';
            break;
          case 'Закрыта':
            color = 'black';
            break;
          default:
            color = 'default';
            break;
        }

        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: 'Тема',
      dataIndex: 'subject',
      key: 'subject',
    },
    {
      title: 'Заказчик',
      dataIndex: 'customer',
      key: 'customer',
    },
    {
      title: 'Ответственный',
      dataIndex: 'employee',
      key: 'employee',
      render: renderEmployeeColumn,
    },
    {
      title: 'Действие',
      key: 'action',
      render: (text, record) => (
        <Button type="primary" onClick={() => handleViewTicket(record.number)}>Посмотреть</Button>
      ),
    },
  ];

  return (
    <Layout style={{ height: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['2']}
          onClick={({ key }) => handleMenuClick(key)}
          items={[
            { key: '1', icon: <HomeOutlined />, label: 'Главная страница' },
            { key: '2', icon: <InboxOutlined />, label: 'Заявки' },
            { key: '3', icon: <FormOutlined />, label: 'Создать заявку' },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0 }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: '16px', width: 64, height: 64 }}
          />
        </Header>
        <Content style={{ margin: '24px 16px', padding: 24, minHeight: 280 }}>
          <h1>Список заявок</h1>
          <Table dataSource={tickets} columns={columns} rowKey="number" />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Tickets;
