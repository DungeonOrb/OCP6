import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

function KmTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "white", padding: 8, fontSize: 12 }}>
      {payload[0].value} km
    </div>
  );
}

export default function WeeklyDistanceChart({ data }) {
  return (
    <div style={{ width: "100%", height: 260 }}>
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{ top: 10, right: 10, left: -10, bottom: 10 }}
          barCategoryGap="25%"
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="week" tickLine={false} axisLine={false} />
          <YAxis tickLine={false} axisLine={false} />
          <Tooltip content={<KmTooltip />} />

          <Bar
            dataKey="km"
            fill="#A7B2FF"
            radius={[12, 12, 12, 12]}
            barSize={22}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}