import React, { useState, useEffect } from 'react';
import { Select, Card } from 'antd';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const { Option } = Select;

const RequestsChart = () => {
  const [timePeriod, setTimePeriod] = useState('week');
  const [requestData, setRequestData] = useState([]);

  useEffect(() => {
    fetchData();
  }, [timePeriod]);

  const fetchData = async () => {
    try {
      // Имитация данных
      let fakeData = [];
      if (timePeriod === 'week') {
        fakeData = [
          { name: 'Пн', requests: 200 },
          { name: 'Вт', requests: 300 },
          { name: 'Ср', requests: 400 },
          { name: 'Чт', requests: 350 },
          { name: 'Пт', requests: 500 },
          { name: 'Сб', requests: 600 },
          { name: 'Вс', requests: 700 },
        ];
      } else if (timePeriod === 'month') {
        fakeData = [
          { name: '1', requests: 1000 },
          { name: '2', requests: 1100 },
          { name: '3', requests: 1200 },
          { name: '4', requests: 1250 },
          { name: '5', requests: 1300 },
          { name: '6', requests: 1400 },
          { name: '7', requests: 1500 },
          { name: '8', requests: 1600 },
          { name: '9', requests: 1700 },
          { name: '10', requests: 1800 },
          { name: '11', requests: 1850 },
          { name: '12', requests: 1900 },
          { name: '13', requests: 2000 },
          { name: '14', requests: 2100 },
          { name: '15', requests: 2200 },
          { name: '16', requests: 2300 },
          { name: '17', requests: 2400 },
          { name: '18', requests: 2500 },
          { name: '19', requests: 2600 },
          { name: '20', requests: 2700 },
          { name: '21', requests: 2800 },
          { name: '22', requests: 2900 },
          { name: '23', requests: 3000 },
          { name: '24', requests: 3100 },
          { name: '25', requests: 3200 },
          { name: '26', requests: 3300 },
          { name: '27', requests: 3400 },
          { name: '28', requests: 3500 },
          { name: '29', requests: 3600 },
          { name: '30', requests: 3700 },
          { name: '31', requests: 3800 },
        ];
      } else if (timePeriod === 'year') {
        fakeData = [
          { name: 'Янв', requests: 10000 },
          { name: 'Фев', requests: 11000 },
          { name: 'Мар', requests: 12000 },
          { name: 'Апр', requests: 13000 },
          { name: 'Май', requests: 14000 },
          { name: 'Июн', requests: 15000 },
          { name: 'Июл', requests: 16000 },
          { name: 'Авг', requests: 17000 },
          { name: 'Сен', requests: 18000 },
          { name: 'Окт', requests: 19000 },
          { name: 'Ноя', requests: 20000 },
          { name: 'Дек', requests: 21000 },
        ];
      }
      setRequestData(fakeData);
    } catch (error) {
      console.error('Ошибка получения данных:', error);
    }
  };

  const handleChange = (value) => {
    setTimePeriod(value);
  };

  return (
    <Card title="Количество выполненных заявок">
      <Select defaultValue="week" style={{ width: 120, marginBottom: 20 }} onChange={handleChange}>
        <Option value="week">Неделя</Option>
        <Option value="month">Месяц</Option>
        <Option value="year">Год</Option>
      </Select>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={requestData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="requests" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default RequestsChart;
