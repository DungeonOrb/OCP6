import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import "./GoalDonut.css";

export default function GoalDonut({ done, goal }) {
  const remaining = Math.max(0, goal - done);

  const data = [
    { name: "done", value: done },
    { name: "remaining", value: remaining },
  ];

  return (
    <div className="goal-donut">
      <div className="goal-donut__title">
        <span className="goal-donut__count">x{done}</span>{" "}
        <span className="goal-donut__goal">sur objectif de {goal}</span>
      </div>

      <div className="goal-donut__subtitle">
        Courses hebdomadaire réalisées
      </div>

      <div className="goal-donut__chartWrap">
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              innerRadius={42}
              outerRadius={82}
              startAngle={0}
              endAngle={360}
              cornerRadius={2}
              paddingAngle={0}
            >
              <Cell fill="#0B2BFF" />
              <Cell fill="#A7B2FF" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        <div className="goal-donut__legend goal-donut__legend--left">
          <span className="goal-donut__dot goal-donut__dot--done" />
          {done} réalisées
        </div>

        <div className="goal-donut__legend goal-donut__legend--right">
          <span className="goal-donut__dot goal-donut__dot--remaining" />
          {remaining} restants
        </div>
      </div>
    </div>
  );
}