const API = "https://69df2623d6de26e119289e3d.mockapi.io/users";

export const fetchUsers = async () => {
  const res = await fetch(API);
  return res.json();
};
