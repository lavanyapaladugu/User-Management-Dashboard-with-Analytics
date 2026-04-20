import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const API = "https://69df2623d6de26e119289e3d.mockapi.io/users"

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill all fields")
      return
    }

    try {
      const res = await fetch(API)
      const users = await res.json()

      const user = users.find(
        (u) => u.email === email && u.password === password
      )

      if (user) {
        localStorage.setItem("auth", "true")
        localStorage.setItem("user", JSON.stringify(user))
        alert("Login successful ✅")
        navigate("/")
      } else {
        alert("Invalid credentials ❌")
      }

    } catch (err) {
      console.error(err)
      alert("Login failed ❌")
    }
  }

  return (
    <div className="flex h-screen">

      {/* Login Form */}
      <div className="w-1/2 flex items-center justify-center bg-gray-100">
        <div className="bg-white p-6 rounded shadow w-80">

          <h1 className="text-xl font-bold mb-4">Login</h1>

          <input
            type="email"
            placeholder="Email"
            className="border p-2 mb-3 w-full rounded"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="border p-2 mb-4 w-full rounded"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleLogin}
            className="bg-blue-500 hover:bg-blue-600 text-white w-full p-2 rounded"
          >
            Login
          </button>

        </div>
      </div>

      {/* Signup */}
      <div className="w-1/2 flex flex-col items-center justify-center bg-blue-500 text-white">

        <h1 className="text-2xl font-bold mb-4">
          New here?
        </h1>

        <p className="mb-4">
          Create an account to get started
        </p>

        <button
          onClick={() => navigate("/signup")}
          className="bg-white text-blue-500 px-6 py-2 rounded"
        >
          Signup
        </button>

      </div>

    </div>
  )
}

export default Login