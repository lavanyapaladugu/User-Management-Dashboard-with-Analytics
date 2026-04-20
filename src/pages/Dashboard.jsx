import { useEffect, useState } from "react"
import { fetchUsers } from "../services/api"
import Chart from "../components/Chart"

function Dashboard() {
  const [users, setUsers] = useState([])

  //  Auth check
  useEffect(() => {
    if (!localStorage.getItem("auth")) {
      window.location.href = "/login"
    }
  }, [])

  //  Fetch users
  useEffect(() => {
    fetchUsers()
      .then(data => setUsers(data))
      .catch(err => console.error(err))
  }, [])

  //  Stats
  const total = users.length

  const active = users.filter(
    (u) => u.status === "active"
  ).length

  const inactive = users.filter(
    (u) => u.status === "inactive"
  ).length

  //  New users (last 7 days)
  const newUsers = users.filter((user) => {
    const diff =
      (new Date() - new Date(user.createdAt)) /
      (1000 * 60 * 60 * 24)
    return diff <= 7
  }).length

  //  Chart data
  const chartData = [
    { name: "Total", users: total },
    { name: "Active", users: active },
    { name: "Inactive", users: inactive }
  ]

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

        <div className="bg-purple-500 text-white p-4 rounded shadow">
          <p>Total Users</p>
          <h2 className="text-2xl font-bold">{total}</h2>
        </div>

        <div className="bg-blue-500 text-white p-4 rounded shadow">
          <p>Active Users</p>
          <h2 className="text-2xl font-bold">{active}</h2>
        </div>

        <div className="bg-green-500 text-white p-4 rounded shadow">
          <p>New Users</p>
          <h2 className="text-2xl font-bold">{newUsers}</h2>
        </div>

      </div>

      {/* Chart */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="font-semibold mb-2">User Overview</h2>
        <Chart data={chartData} />
      </div>

      {/* Top Users */}
      <div className="bg-white p-5 rounded shadow mt-6">
        <h2 className="font-semibold mb-3">Top Users</h2>

        {users.length === 0 ? (
          <p>No users found</p>
        ) : (
          <ul className="space-y-2">
            {users.slice(0, 5).map((user) => (
              <li key={user.id} className="flex justify-between">
                <span>{user.name}</span>
                <span className="text-gray-500">{user.email}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-5 rounded shadow mt-6">
        <h2 className="font-semibold mb-3">Recent Activity</h2>

        <ul>
          <li>
            Last user added:{" "}
            {users[users.length - 1]?.name || "None"}
          </li>
          <li>Total users: {total}</li>
        </ul>
      </div>

    </div>
  )
}

export default Dashboard