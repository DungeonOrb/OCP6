import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import "./BpmChart.css";

export default function BpmChart({ data }) {
  return (
    <div className="bpm-chart" style={{ width: "100%", height: 260 }}>
      <ResponsiveContainer>
        <ComposedChart
          data={data}
          margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
          barCategoryGap="35%"
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="day" tickLine={false} axisLine={false} />
          <YAxis tickLine={false} axisLine={false} domain={["dataMin-5", "dataMax+5"]} />

          {/* no tooltip, no grey cursor */}
          <Tooltip cursor={false} content={() => null} />

          {/* Min */}
          <Bar
            dataKey="min"
            fill="#F7A9A3"
            radius={[10, 10, 10, 10]}
            barSize={14}
          />

          {/* Max */}
          <Bar
            dataKey="max"
            fill="#FF2D17"
            radius={[10, 10, 10, 10]}
            barSize={14}
          />

          {/* Line = light blue by default, blue on hover via CSS */}
          <Line
            className="bpm-chart__line"
            type="monotone"
            dataKey="lastMax"
            stroke="#A7B2FF"
            strokeWidth={2}
            activeDot={false}
            dot={{
              r: 3,
              fill: "#0B2BFF",
              stroke: "#0B2BFF",
              strokeWidth: 0,
            }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}