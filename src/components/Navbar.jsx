import { useLocation } from "react-router-dom";

function Navbar({ setSearch }) {
  const location = useLocation(); 

  return (
    <div className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Dashboard</h1>

      {/*  Search Users page */}
      {location.pathname === "/users" && (
        <input
          type="text"
          placeholder="Search users..."
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded"
        />
      )}

      {/* Logout */}
      <button
        onClick={() => {
          localStorage.removeItem("auth");
          window.location.href = "/login";
        }}
        className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer"
      >
        Logout
      </button>
    </div>
  );
}

export default Navbar;
