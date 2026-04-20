import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  const menu = [
    { name: "Dashboard", path: "/" },
    { name: "Users", path: "/users" },
  ];

  return (
    <div className="w-60 bg-gray-900 text-white min-h-screen p-4">
      <h1 className="text-xl font-bold mb-6">Admin Panel</h1>

      <ul className="space-y-3">
        {menu.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className={`block p-2 rounded ${
                location.pathname === item.path
                  ? "bg-blue-500"
                  : "hover:bg-gray-700"
              }`}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
