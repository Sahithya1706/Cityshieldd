export const loginUser = (user) => {
  localStorage.setItem("cityshield_user", JSON.stringify(user));
};

export const logoutUser = () => {
  localStorage.removeItem("cityshield_user");
};

export const getUser = () => {
  const user = localStorage.getItem("cityshield_user");
  return user ? JSON.parse(user) : null;
};
