import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";



export default class VolumeChart extends PureComponent {
  static demoUrl = "https://codesandbox.io/s/tiny-bar-chart-35meb";
  render() {
    const {volumeData} = this.props;
    let data = [{ name: "", uv: 0 }];

    if (volumeData && volumeData?.length > 0) {
      data = volumeData.map((value, index) => ({ name: `Item ${index}`, uv: value }));
    }


    return (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          width={250}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <Bar dataKey="uv" fill="#8884d8" barSize={20} color="blue" /> {/* Adjust the barSize value */}
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
