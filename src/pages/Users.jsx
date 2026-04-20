import { useEffect, useState } from "react";

const API = "https://69df2623d6de26e119289e3d.mockapi.io/users";

function Users({ search }) {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editingUser, setEditingUser] = useState(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [error, setError] = useState("");

  const [sortOrder, setSortOrder] = useState("");
  const [loading, setLoading] = useState(true);

  //  FETCH USERS
  useEffect(() => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  //  FILTER
  const filteredUsers = users.filter((user) =>
    user.name?.toLowerCase().includes(search.toLowerCase()),
  );

  //  SORT
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (sortOrder === "asc") return a.name.localeCompare(b.name);
    if (sortOrder === "desc") return b.name.localeCompare(a.name);
    return 0;
  });

  //  DELETE
  const handleDelete = async (id) => {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    setUsers(users.filter((user) => user.id !== id));
    alert("User deleted ❌");
  };

  //  ADD / UPDATE
  const handleUpdate = async () => {
    if (!name || !email || !city) {
      setError("All fields are required");
      return;
    }

    setError("");

    if (editingUser === "new") {
      //  ADD
      const res = await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          city,
          status: "active",
          createdAt: new Date(),
        }),
      });

      const data = await res.json();

      setUsers([data, ...users]);
      alert("User added ✅");
    } else {
      //  UPDATE
      const res = await fetch(`${API}/${editingUser.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, city }),
      });

      const updatedUser = await res.json();

      setUsers(users.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
      alert("User updated ✏️");
    }

    setEditingUser(null);
    setName("");
    setEmail("");
    setCity("");
  };

  // LOADING
  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Users</h1>

      {/*  ADD + SORT */}
      <div className="flex gap-4 mb-4">
        <button
          onClick={() => setEditingUser("new")}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          + Add User
        </button>

        <select
          onChange={(e) => setSortOrder(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Sort</option>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>
      </div>

      {/* USERS GRID */}
      {sortedUsers.length === 0 ? (
        <p className="text-gray-500 text-center mt-10">No users found 😢</p>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {sortedUsers.map((user) => (
            <div
              key={user.id}
              className="bg-white p-4 rounded shadow hover:shadow-lg cursor-pointer relative"
              onClick={() => setSelectedUser(user)}
            >
              {/*  DELETE */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(user.id);
                }}
                className="absolute top-2 right-2 text-red-500"
              >
                ❌
              </button>

              {/* NAME + STATUS */}
              <div className="flex justify-between items-center">
                <h2 className="font-bold text-lg">{user.name}</h2>

                <span
                  className={`text-xs px-2 py-1 rounded ${
                    user.status === "active"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {user.status}
                </span>
              </div>

              <p className="text-gray-500">{user.email}</p>
              <p className="text-sm">{user.city || "No city"}</p>

              {/* EDIT */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setEditingUser(user);
                  setName(user.name);
                  setEmail(user.email);
                  setCity(user.city || "");
                }}
                className="mt-2 bg-yellow-400 px-2 py-1 rounded"
              >
                Edit
              </button>
            </div>
          ))}
        </div>
      )}

      {/* VIEW MODAL */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded w-80">
            <h2 className="font-bold mb-4">User Details</h2>

            <p>
              <b>Name:</b> {selectedUser.name}
            </p>
            <p>
              <b>Email:</b> {selectedUser.email}
            </p>
            <p>
              <b>City:</b> {selectedUser.city || "No city"}
            </p>

            <button
              onClick={() => setSelectedUser(null)}
              className="mt-4 bg-gray-300 px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* ➕ ADD / EDIT */}
      {editingUser && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded w-80">
            <h2 className="font-bold mb-4">
              {editingUser === "new" ? "Add User" : "Edit User"}
            </h2>

            {error && <p className="text-red-500 mb-2">{error}</p>}

            <input
              className="border p-2 mb-2 w-full"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              className="border p-2 mb-2 w-full"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              className="border p-2 mb-4 w-full"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />

            <div className="flex justify-between">
              <button
                onClick={handleUpdate}
                className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
              >
                Save
              </button>

              <button
                onClick={() => setEditingUser(null)}
                className="bg-gray-300 px-4 py-2 rounded cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Users;
