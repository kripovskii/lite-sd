import React, { useState } from 'react';
import { FormOutlined, HomeOutlined, InboxOutlined, MenuFoldOutlined, MenuUnfoldOutlined, UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Button, Layout, Menu, Input, Form, Upload, Select, Row, Col, theme } from 'antd';

const { Header, Sider, Content } = Layout;
const { Option } = Select;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const onFinish = (values) => {
    console.log('Received values:', values);
    // Здесь вы можете отправить данные (например, вызвать API для создания заявки)
  };

  return (
    <Layout style={{ height:'100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
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
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
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
          {/* Форма создания заявки */}
          <Form
            name="ticketForm"
            onFinish={onFinish}
            initialValues={{ number: 'AUTO_GENERATED' }} // Пример установки значения по умолчанию для номера заявки
            labelCol={{ span: 8 }} // Установка количества колонок для меток полей
            wrapperCol={{ span: 16 }} // Установка количества колонок для элементов ввода
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="number"
                  label="Номер заявки"
                >
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="subject"
                  label="Тема"
                  rules={[
                    {
                      required: true,
                      message: 'Пожалуйста, введите тему заявки!',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="description"
                  label="Описание"
                  rules={[
                    {
                      required: true,
                      message: 'Пожалуйста, введите описание заявки!',
                    },
                  ]}
                >
                  <Input.TextArea />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="files"
                  label="Файлы"
                >
                  <Upload>
                    <Button icon={<UploadOutlined />}>Загрузить файлы</Button>
                  </Upload>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="customer"
                  label="Заказчик"
                  rules={[
                    {
                      required: true,
                      message: 'Пожалуйста, введите имя заказчика!',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="serviceObject"
                  label="Объект обслуживания"
                  rules={[
                    {
                      required: true,
                      message: 'Пожалуйста, выберите объект обслуживания!',
                    },
                  ]}
                >
                  <Select>
                    <Option value="object1">Объект 1</Option>
                    <Option value="object2">Объект 2</Option>
                    <Option value="object3">Объект 3</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row justify="end" gutter={16}>
              <Col>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Создать заявку
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
