import { useState } from "react"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"

function MainLayout({ children }) {
  const [search, setSearch] = useState("")

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1">
        <Navbar setSearch={setSearch} />

        <div className="p-6">
          {typeof children === "function" ? children(search) : children}
        </div>
      </div>
    </div>
  )
}

export default MainLayout