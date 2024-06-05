// src/components/RequestsChart.js
import React, { useState } from 'react';
import { Select, Card } from 'antd';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const { Option } = Select;

const dataWeek = [
  { name: 'Пн', requests: 12 },
  { name: 'Вт', requests: 18 },
  { name: 'Ср', requests: 8 },
  { name: 'Чт', requests: 15 },
  { name: 'Пт', requests: 10 },
  { name: 'Сб', requests: 5 },
  { name: 'Вс', requests: 7 },
];

const dataMonth = [
  { name: 'Неделя 1', requests: 45 },
  { name: 'Неделя 2', requests: 32 },
  { name: 'Неделя 3', requests: 25 },
  { name: 'Неделя 4', requests: 50 },
];

const dataYear = [
  { name: 'Янв', requests: 120 },
  { name: 'Фев', requests: 110 },
  { name: 'Мар', requests: 130 },
  { name: 'Апр', requests: 150 },
  { name: 'Май', requests: 170 },
  { name: 'Июн', requests: 160 },
  { name: 'Июл', requests: 180 },
  { name: 'Авг', requests: 200 },
  { name: 'Сен', requests: 220 },
  { name: 'Окт', requests: 190 },
  { name: 'Ноя', requests: 230 },
  { name: 'Дек', requests: 240 },
];

const RequestsChart = () => {
  const [timePeriod, setTimePeriod] = useState('week');

  const handleChange = (value) => {
    setTimePeriod(value);
  };

  const getData = () => {
    switch (timePeriod) {
      case 'week':
        return dataWeek;
      case 'month':
        return dataMonth;
      case 'year':
        return dataYear;
      default:
        return dataWeek;
    }
  };

  return (
    <Card title="Количество выполненных заявок">
      <Select defaultValue="week" style={{ width: 120, marginBottom: 20 }} onChange={handleChange}>
        <Option value="week">Неделя</Option>
        <Option value="month">Месяц</Option>
        <Option value="year">Год</Option>
      </Select>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={getData()}>
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
