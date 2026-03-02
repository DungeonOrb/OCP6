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

function BpmTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;

  const byKey = Object.fromEntries(payload.map((p) => [p.dataKey, p.value]));

  return (
    <div style={{ background: "white", padding: 10, fontSize: 12 }}>
      <div style={{ marginBottom: 6, opacity: 0.75 }}>{label}</div>
      <div>Min: {byKey.min ?? "-"} bpm</div>
      <div>Max: {byKey.max ?? "-"} bpm</div>
      <div>Last Max: {byKey.lastMax ?? "-"} bpm</div>
    </div>
  );
}

export default function BpmChart({ data }) {
  return (
    <div style={{ width: "100%", height: 260 }}>
      <ResponsiveContainer>
        <ComposedChart
          data={data}
          margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
          barCategoryGap="35%"
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="day" tickLine={false} axisLine={false} />
          <YAxis tickLine={false} axisLine={false} domain={["dataMin-5", "dataMax+5"]} />
          <Tooltip content={<BpmTooltip />} />

          <Bar
            dataKey="min"
            fill="#F7A9A3"
            radius={[10, 10, 10, 10]}
            barSize={14}
          />

          <Bar
            dataKey="max"
            fill="#FF2D17"
            radius={[10, 10, 10, 10]}
            barSize={14}
          />

          <Line
            type="monotone"
            dataKey="lastMax"
            stroke="#0B2BFF"
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
            strokeWidth={2}
            isAnimationActive
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}