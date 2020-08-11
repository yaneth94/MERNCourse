export const readUser = (userId, token) => {
  return fetch(`${process.env.REACT_APP_API_URL}/api/user/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const listUser = () => {
  return fetch(`${process.env.REACT_APP_API_URL}/api/user`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
