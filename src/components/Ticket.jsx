import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Layout, Typography, Divider, Button, Tag, List, Empty, Modal } from 'antd';
import { LeftOutlined, FileTextOutlined } from '@ant-design/icons';

const { Header, Content } = Layout;
const { Title, Text } = Typography;
const { confirm } = Modal;

const TicketDetails = () => {
  const [ticket, setTicket] = useState(null);
  const history = useHistory();
  const { number } = useParams();

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/tickets/${number}`);
        if (response.ok) {
          const data = await response.json();
          setTicket(data);
        } else {
          console.error('Ошибка при загрузке информации о заявке:', response.statusText);
        }
      } catch (error) {
        console.error('Ошибка при загрузке информации о заявке:', error);
      }
    };

    fetchTicket();
  }, [number]);

  const handleBack = () => {
    history.push('/tickets');
    window.location.reload();
    };

  const handleAssign = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/tickets/${number}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'В работе' }),
      });
      if (response.ok) {
        // Обновляем данные заявки после изменения статуса
        const updatedTicket = await response.json();
        setTicket(updatedTicket);
      } else {
        console.error('Ошибка при изменении статуса заявки:', response.statusText);
      }
    } catch (error) {
      console.error('Ошибка при изменении статуса заявки:', error);
    }
  };

  const handlePostpone = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/tickets/${number}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'Отложена' }),
      });
      if (response.ok) {
        // Обновляем данные заявки после изменения статуса
        const updatedTicket = await response.json();
        setTicket(updatedTicket);
      } else {
        console.error('Ошибка при изменении статуса заявки:', response.statusText);
      }
    } catch (error) {
      console.error('Ошибка при изменении статуса заявки:', error);
    }
  };

  const renderFiles = () => {
    if (ticket.files && ticket.files.length > 0) {
      return (
        <List
          header={<Text strong>Файлы:</Text>}
          bordered
          dataSource={ticket.files}
          renderItem={(file, index) => (
            <List.Item>
              <FileTextOutlined style={{ marginRight: '8px' }} />
              {file}
            </List.Item>
          )}
        />
      );
    } else {
      return (
        <Empty
          image={<FileTextOutlined style={{ fontSize: '64px', color: '#ccc' }} />}
          description={<Text type="secondary">Нет прикрепленных файлов</Text>}
        />
      );
    }
  };

  const showConfirm = (action) => {
    confirm({
      title: 'Подтверждение',
      content: `Вы уверены, что хотите ${action} заявку?`,
      onOk() {
        if (action === 'в работу') {
          handleAssign();
        } else if (action === 'отложить') {
          handlePostpone();
        }
      },
      onCancel() {},
    });
  };

  if (!ticket) {
    return null;
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ backgroundColor: '#001529', padding: '0 16px', color: '#fff' }}>
        <Button icon={<LeftOutlined />} onClick={handleBack} type="text" style={{ color: '#fff' }}>
          Назад
        </Button>
        <Button
          type="primary"
          onClick={() => showConfirm('в работу')}
          style={{ marginLeft: '16px', backgroundColor: '#52c41a', borderColor: '#52c41a' }}
        >
          В работу
        </Button>
        <Button type="primary" onClick={() => showConfirm('отложить')} style={{ marginLeft: '16px' }}>
          Отложить
        </Button>
      </Header>
      <Content style={{ padding: '24px' }}>
        <Title level={2}>Заявка номер № {ticket.number}. Тема: {ticket.subject}: </Title>
        <Divider />
       
        <Divider />
        <Text strong>Описание: </Text>
        <div style={{ border: '1px solid #d9d9d9', padding: '16px', borderRadius: '4px', marginBottom: '16px' }}>
          <Text>{ticket.description}</Text>
        </div>
        <Divider />
        <Text strong>Статус: </Text>
        <Tag color={getStatusColor(ticket.status)}>{ticket.status}</Tag>
        <Divider />
        <Text strong>Заказчик: </Text>
        <Text>{ticket.customer}</Text>
        <Divider />
        <Text strong>Ответственный: </Text>
        <Text>{ticket.employee ? ticket.employee : 'Не назначен'}</Text>
        <Divider />
        {renderFiles()}
      </Content>
    </Layout>
  );
};

const getStatusColor = (status) => {
  switch (status) {
    case 'Новая':
      return 'red';
    case 'В работе':
      return 'gold';
    case 'В ожидании ответа':
      return 'blue';
    case 'Решена':
      return 'green';
    case 'Закрыта':
      return 'black';
    case 'Отложена':
        return 'purple';
    default:
      return 'default';
  }
};

export default TicketDetails;
