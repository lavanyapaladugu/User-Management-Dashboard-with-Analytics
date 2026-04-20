import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar
} from "recharts"

function Chart({ data }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

      {/* 📈 Line Chart */}
      <div className="bg-white p-5 rounded shadow">
        <h2 className="font-semibold mb-3">User Growth</h2>

        <LineChart width={400} height={250} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="users" stroke="#3b82f6" />
        </LineChart>
      </div>

      {/* 📊 Bar Chart */}
      <div className="bg-white p-5 rounded shadow">
        <h2 className="font-semibold mb-3">Users Comparison</h2>

        <BarChart width={400} height={250} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="users" fill="#10b981" />
        </BarChart>
      </div>

    </div>
  )
}

export default Chart