import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FormOutlined, HomeOutlined, InboxOutlined, MenuFoldOutlined, MenuUnfoldOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Layout, Menu, Input, Form, Upload, Select, message } from 'antd';

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
    if (key === '2') {
      history.push('/tickets');
      window.location.reload();
    }
  };

  const onFinish = async (values) => {
    try {
      values.status = 'Новая';

      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((file) => {
            formData.append(key, file);
          });
        } else {
          formData.append(key, value);
        }
      });

      const response = await fetch('http://localhost:3001/api/tickets', {
        method: 'POST',
        body: formData,
      });
      

      if (response.ok) {
        const data = await response.json();
        console.log('Ticket created:', data);
        message.success('Заявка отправлена');
        
      } else {
        console.error('Failed to create ticket');
        message.error('Ошибка при отправке. Повторите попытку позже');
      }
    } catch (error) {
      console.error('Error creating ticket:', error);
      message.error('Ошибка при отправке. Повторите попытку позже', error);
    }
  };

  const handleCreateTicket = () => {
   
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
            {/* Form fields */}
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
              <Upload multiple>
                <Button icon={<UploadOutlined />}>Выбрать файлы</Button>
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
