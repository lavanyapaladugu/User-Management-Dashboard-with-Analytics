import { createContext, useEffect, useState } from "react";
import { fetchUsers } from "./services/api";
export const UserContext = createContext();
export function UserProvider({ children }) {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetchUsers().then((data) => setUsers(data));
  }, []);
  return (
    <UserContext.Provider value={{ users, setUsers }}>
      {" "}
      {children}{" "}
    </UserContext.Provider>
  );
}
export default UserContext;
