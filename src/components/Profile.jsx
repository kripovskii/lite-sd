import React, { useState } from 'react';
import { Button, Dropdown } from 'antd';
import './Profile.css';

const userData = {
  name: "Смородин И.И.",
  initials: "И.И."
};

const Profile = () => {
  const [visible, setVisible] = useState(false);

  const handleVisibleChange = (flag) => {
    setVisible(flag);
  };

  const profileContent = (
    <div className="profile-dropdown">
      <div className="profile-name">{userData.name}</div>
      <div className="profile-initials">({userData.initials})</div>
      <Button type="primary" className="profile-button">
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
        <Button>{userData.name}</Button>
      </Dropdown>
    </div>
  );
};

export default Profile;
