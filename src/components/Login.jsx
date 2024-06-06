import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, Typography, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './Login.css';
import { useHistory } from 'react-router-dom';

const { Title, Text } = Typography;

const Login = ({ onLogin }) => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const onFinish = async (values) => {
    setLoading(true);

    try {
      const { username, password } = values;

      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      if (response.ok) {
        const { token } = await response.json();
        onLogin(token, history);
        window.location.reload() // Передаем history в onLogin
      } else {
        throw new Error('Authentication error');
      }
    } catch (error) {
      console.error('Authentication error:', error);
      setLoading(false);
      message.error('Ошибка авторизации. Проверьте логин и пароль.');
    }
  };

  return (
    <div className="login-container">
      <Title level={3} className="login-title">
        MedMate
      </Title>
      <Form
        name="login_form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        className="login-form"
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Введите логин!' }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Логин"
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Введите пароль!' }]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Пароль"
          />
        </Form.Item>

        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Запомнить меня</Checkbox>
          </Form.Item>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Войти
          </Button>
        </Form.Item>

        <Text type="secondary" style={{ textAlign: 'center' }}>
          Medmate v 0.0.1_dev
        </Text>
      </Form>
    </div>
  );
};

export default Login;
