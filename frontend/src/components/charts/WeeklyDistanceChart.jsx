import { useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import "./WeeklyDistanceChart.css";

export default function WeeklyDistanceChart({ data, averageKm }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="weekly-chart"
      style={{
        width: "100%",
        height: 260,
        position: "relative",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{ top: 10, right: 10, left: -10, bottom: 10 }}
          barCategoryGap="25%"
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="week" tickLine={false} axisLine={false} />
          <YAxis tickLine={false} axisLine={false} />

          <Bar
            dataKey="km"
            fill="#A7B2FF"
            radius={[10, 10, 10, 10]}
            barSize={14}
          />
        </BarChart>
      </ResponsiveContainer>

      <div className={`weekly-chart__tooltip ${isHovered ? "weekly-chart__tooltip--visible" : ""}`}>
        <div style={{ fontSize: 14, opacity: 0.85 }}>01.06 au 07.06</div>
        <div style={{ fontSize: 18, fontWeight: 700 }}>{averageKm} km</div>
      </div>
    </div>
  );
}