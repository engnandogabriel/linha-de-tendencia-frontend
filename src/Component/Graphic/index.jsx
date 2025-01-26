import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Dot } from 'recharts';
import { classificationColor } from '../../data/desgastes';
import LegendComponent from '../LegendComponent/index'
const DeteriorationChart = ({ data }) => {
    const dataChart = data.deteriorations.map((deterioration) => ({
    date: deterioration.date,
    value: deterioration.value,
    classification: deterioration.classification,
    }));
    console.log(dataChart)
      const lastDeterioraition = dataChart.slice(-3);
  return (
    <>
    <LineChart
      width={800}
      height={400}
      data={dataChart}
      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis domain={[1500, 1700]} />
      <Tooltip
        content={({ payload }) => {
          if (payload && payload.length > 0) {
            const { classification, value, date } = payload[0].payload;
              return (
              <div>
                <p>{`Data: ${date}`}</p>
                <p>{`Valor: ${value}`}</p>
                <p>{`Classificação: ${classification}`}</p>
              </div>
            );
          }
          return null;
        }}
      />
      <Legend dx="XXXXXXXX"/>
      <Line
        type="monotone"
        dataKey="value"
        // stroke="#8884d8"
        stroke='#000'
        dot={({ cx, cy, payload }) => (
          <g>            
            {classificationColor.map((e, index) => {
              if(payload.date === lastDeterioraition.date){
                return <Dot cx={cx} cy={cy} r={5} fill="black" />
              }
              if(e.classification === payload.classification){
                return <Dot cx={cx} cy={cy} r={5} fill={e.color} />
              }
              return null;
            })}
          </g>
        )}
        connectNulls
      />
    </LineChart>
    <LegendComponent/>
    </>
  );
};

export default DeteriorationChart;
