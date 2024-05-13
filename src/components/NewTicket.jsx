import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FormOutlined, HomeOutlined, InboxOutlined, MenuFoldOutlined, MenuUnfoldOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Layout, Menu, Input, Form, Upload, Select, Row, Col, message } from 'antd';

const { Header, Sider, Content } = Layout;
const { Option } = Select;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const history = useHistory();
  const handleMenuClick = (key) => {
    if (key === '3') {
      history.push('/new');
      window.location.reload();
    }
    if (key === '2'){
        history.push('/tickets');
        window.location.reload();
    }
  };


  const onFinish = async (values) => {
    console.log('Received values:', values);

    try {
        // Добавляем новые поля к значениям перед отправкой
        const newValues = {
          ...values,
          status: 'Новая',  // Устанавливаем статус по умолчанию
        };
    
        const response = await fetch('http://localhost:3001/api/tickets', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newValues),
        });
      if (response.ok) {
        const data = await response.json();
        console.log('Ticket created:', data);
        message.success("Заявка отправлена")
        // Добавьте здесь логику для перехода на другую страницу или вывода сообщения об успешном создании заявки
        history.push('/success'); // Например, переход на страницу успешного создания заявки
      } else {
        console.error('Failed to create ticket');
        message.error("Ошибка при отправке. Повторите попытку позже")
        // Добавьте здесь логику для вывода сообщения об ошибке
      }
    } catch (error) {
      console.error('Error creating ticket:', error);
      message.error("Ошибка при отправке. Повторите попытку позже", error)
      // Добавьте здесь логику для вывода сообщения об ошибке
    }
  };

  const handleCreateTicket = () => {
    history.push('/new');
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          onClick={({ key }) => handleMenuClick(key)}
          defaultSelectedKeys={['3']}
          items={[
            { key: '1', icon: <HomeOutlined />, label: 'Главная страница' },
            { key: '2', icon: <InboxOutlined />, label: 'Заявки' },
            {
              key: '3',
              icon: <FormOutlined />,
              label: 'Создать заявку',
              onClick: handleCreateTicket,
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
          />
        </Header>
        <Content style={{ margin: '16px', padding: '16px', background: '#fff', minHeight: 280 }}>
          <h1>Создать заявку</h1>
          <Form
            name="ticketForm"
            onFinish={onFinish}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 14 }}
          >
            {/* Форма заявки */}
            <Form.Item label="Тема" name="subject" rules={[{ required: true, message: 'Введите тему заявки' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Описание" name="description" rules={[{ required: true, message: 'Введите описание заявки' }]}>
              <Input.TextArea />
            </Form.Item>
            <Form.Item label="Заказчик" name="customer" rules={[{ required: true, message: 'Введите имя заказчика' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Объект обслуживания" name="serviceObject" rules={[{ required: true, message: 'Выберите объект обслуживания' }]}>
              <Select>
                <Option value="object1">Объект 1</Option>
                <Option value="object2">Объект 2</Option>
                <Option value="object3">Объект 3</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Загрузить файлы" name="files">
              <Upload>
                <Button icon={<UploadOutlined />}>Загрузить файлы</Button>
              </Upload>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 6, span: 14 }}>
              <Button type="primary" htmlType="submit">
                Создать заявку
              </Button>
            </Form.Item>
          </Form>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
