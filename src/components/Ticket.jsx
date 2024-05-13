import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Layout, Typography, Divider, Button } from 'antd';
import { LeftOutlined } from '@ant-design/icons';

const { Header, Content } = Layout;
const { Title, Text } = Typography;

const TicketDetails = () => {
  const [ticket, setTicket] = useState(null);
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    // Получаем информацию о заявке с заданным идентификатором из API
    const fetchTicket = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/tickets/${id}`);
        if (response.ok) {
          const data = await response.json();
          setTicket(data); // Устанавливаем полученные данные в состояние
        } else {
          console.error('Ошибка при загрузке информации о заявке:', response.statusText);
        }
      } catch (error) {
        console.error('Ошибка при загрузке информации о заявке:', error);
      }
    };

    fetchTicket(); // Выполняем загрузку информации о заявке при монтировании компонента
  }, [id]); // Перезагружаем информацию при изменении идентификатора заявки

  const handleBack = () => {
    history.push('/tickets'); // Переход на страницу со списком заявок
  };

  if (!ticket) {
    return null; // Пока данные не загружены, ничего не отображаем
  }

  return (
    <Layout>
      <Header style={{ backgroundColor: '#001529', padding: '0 16px', color: '#fff' }}>
        <Button icon={<LeftOutlined />} onClick={handleBack} type="text" style={{ color: '#fff' }}>
          Назад
        </Button>
      </Header>
      <Content style={{ padding: '24px' }}>
        <Title level={2}>{ticket.subject}</Title>
        <Divider />
        <Text strong>Номер заявки: </Text>
        <Text>{ticket.number}</Text>
        <br />
        <Text strong>Статус: </Text>
        <Text>{ticket.status}</Text>
        <br />
        <Text strong>Описание: </Text>
        <Text>{ticket.description}</Text>
        <br />
        <Text strong>Заказчик: </Text>
        <Text>{ticket.customer}</Text>
        <br />
        <Text strong>Ответственный: </Text>
        <Text>{ticket.employee ? ticket.employee : 'Не назначен'}</Text>
      </Content>
    </Layout>
  );
};

export default TicketDetails;
