import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

export default function GoalDonut({ done, goal }) {
  const remaining = Math.max(0, goal - done);
  const data = [
    { name: "done", value: done },
    { name: "remaining", value: remaining },
  ];

  return (
    <div style={{ width: "100%", height: 260, position: "relative" }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            innerRadius={65}
            outerRadius={100}
            startAngle={120}
            endAngle={-240}
            paddingAngle={2}
          >
            <Cell fill="#0B2BFF" />
            <Cell fill="#A7B2FF" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 28, fontWeight: 800 }}>
            x{done}{" "}
            <span style={{ fontSize: 16, fontWeight: 600, opacity: 0.65 }}>
              sur objectif de {goal}
            </span>
          </div>
          <div style={{ opacity: 0.7, marginTop: 6 }}>
            Courses hebdomadaire réalisées
          </div>
        </div>
      </div>
    </div>
  );
}