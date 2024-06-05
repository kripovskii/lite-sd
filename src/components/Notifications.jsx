import React, { useState } from 'react';
import { Badge, Dropdown, List, Avatar } from 'antd';
import { BellOutlined } from '@ant-design/icons';

const notificationsData = [
  {
    id: 1,
    title: "New Message",
    sender: "John Doe",
    description: "You have a new message from John Doe."
  },
  {
    id: 2,
    title: "System Update",
    sender: "System Admin",
    description: "Your system will be updated tonight."
  },
  {
    id: 3,
    title: "Reminder",
    sender: "Calendar",
    description: "Don't forget your meeting tomorrow."
  }
];

const Notifications = () => {
  const [visible, setVisible] = useState(false);

  const handleVisibleChange = (flag) => {
    setVisible(flag);
  };

  const notificationList = (
    <List
      itemLayout="horizontal"
      dataSource={notificationsData}
      renderItem={item => (
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar icon={<BellOutlined />} />}
            title={item.title}
            description={`${item.sender}: ${item.description}`}
          />
        </List.Item>
      )}
    />
  );

  return (
    <Dropdown
      overlay={notificationList}
      trigger={['click']}
      visible={visible}
      onVisibleChange={handleVisibleChange}
    >
      <Badge count={notificationsData.length} overflowCount={99}>
        <BellOutlined style={{ fontSize: '24px', cursor: 'pointer' }} />
      </Badge>
    </Dropdown>
  );
};

export default Notifications;
