import React, { useState, useEffect } from 'react';
import { Button, Dropdown } from 'antd';
import { decodeJwt } from 'jose';
import './Profile.css';
import { useHistory } from 'react-router-dom';

function Profile() {
  const [visible, setVisible] = useState(false);
  const [username, setUsername] = useState('');
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = decodeJwt(token);
        setUsername(decodedToken.name);
      } catch (error) {
        console.error('Ошибка декодирования токена:', error);
      }
    }
  }, []);

  const handleVisibleChange = (flag) => {
    setVisible(flag);
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Удаляем токен из локального хранилища
    history.push('/');
    window.location.reload() // Перенаправляем пользователя на страницу входа
  };

  const profileContent = (
    <div className="profile-dropdown">
      <div className="profile-name">{username}</div>
      <Button type="primary" className="profile-button" onClick={handleLogout}>
        Выйти
      </Button>
    </div>
  );

  return (
    <div className="profile-container">
      <Dropdown
        overlay={profileContent}
        trigger={['click']}
        visible={visible}
        onVisibleChange={handleVisibleChange}
      >
        <Button>{username}</Button>
      </Dropdown>
    </div>
  );
}

export default Profile;
