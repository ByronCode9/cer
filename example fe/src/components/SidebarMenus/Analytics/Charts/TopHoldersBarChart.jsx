import React, { useState, useEffect } from 'react';
// import { BarChart, Bar, ResponsiveContainer, Tooltip } from 'recharts';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';



const TopHoldersBarChart = ({holdersData}) => {
    console.log(holdersData)
    const limitedRecord = holdersData?.slice(0,10)
    const data = [
      {
        name: limitedRecord[0]?.addressLabel?.label ? limitedRecord[0].addressLabel?.label : limitedRecord[0]?.address ,
        uv: limitedRecord[0]?.balance,
        pv: 2400,
        fill: "#8884d8",
      },
      {
        name: limitedRecord[1]?.addressLabel?.label ? limitedRecord[1]?.addressLabel?.label : limitedRecord[1]?.address ,
        uv: limitedRecord[1]?.balance,
        pv: 4567,
        fill: "#83a6ed",
      },
      {
        name: limitedRecord[2]?.addressLabel?.label ? limitedRecord[2]?.addressLabel?.label : limitedRecord[2]?.address ,
        uv: limitedRecord[2]?.balance,
        pv: 1398,
        fill: "#8dd1e1",
      },
      {
        name: limitedRecord[3]?.addressLabel?.label ? limitedRecord[3]?.addressLabel?.label : limitedRecord[3]?.address ,
        uv: limitedRecord[3]?.balance,
        pv: 9800,
        fill: "#82ca9d",
      },
      {
        name: limitedRecord[4]?.addressLabel?.label ? limitedRecord[4].addressLabel?.label : limitedRecord[4]?.address ,
        uv: limitedRecord[4]?.balance,
        pv: 2400,
        fill: "#8884d8",
      },
      {
        name: limitedRecord[5]?.addressLabel?.label ? limitedRecord[5]?.addressLabel?.label : limitedRecord[5]?.address ,
        uv: limitedRecord[5]?.balance,
        pv: 4567,
        fill: "#83a6ed",
      },
      {
        name: limitedRecord[6]?.addressLabel?.label ? limitedRecord[6]?.addressLabel?.label : limitedRecord[6]?.address ,
        uv: limitedRecord[6]?.balance,
        pv: 1398,
        fill: "#8dd1e1",
      },
      {
        name: limitedRecord[7]?.addressLabel?.label ? limitedRecord[7]?.addressLabel?.label : limitedRecord[7]?.address ,
        uv: limitedRecord[7]?.balance,
        pv: 9800,
        fill: "#82ca9d",
      },
      {
        name: limitedRecord[8]?.addressLabel?.label ? limitedRecord[8]?.addressLabel?.label : limitedRecord[8]?.address ,
        uv: limitedRecord[8]?.balance,
        pv: 1398,
        fill: "#8dd1e1",
      },
      {
        name: limitedRecord[9]?.addressLabel?.label ? limitedRecord[9]?.addressLabel?.label : limitedRecord[9]?.address ,
        uv: limitedRecord[9]?.balance,
        pv: 9800,
        fill: "#82ca9d",
      },
     
    ];
    console.log(data, "dataaaaa")
  return (
    // <ResponsiveContainer width="100%" height="100%">
    //   <BarChart barSize={10} width={150} height={40} data={data}>
    //     <Bar dataKey="uv" fill="#8884d8" />
    //   </BarChart>
    //   <Tooltip/>
    // </ResponsiveContainer>
    <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={150}
          height={40}
          barSize={10}
          data={data}
        //   margin={{
        //     top: 20,
        //     right: 30,
        //     left: 20,
        //     bottom: 5,
        //   }}
        >
          {/* // <CartesianGrid strokeDasharray="3 3" />
          // <XAxis dataKey="name" />
          // <YAxis /> */}
          <Tooltip />
          {/* <Legend /> */}
          {/* // <Bar dataKey="pv" stackId="a" fill="#8884d8" /> */}
          <Bar dataKey="uv" stackId="a" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
  );
};

export default TopHoldersBarChart;
