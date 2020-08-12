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

export const removeUser = (userId, token) => {
  return fetch(`${process.env.REACT_APP_API_URL}/api/user/${userId}`, {
    method: "DELETE",
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

export const updateUser = (userId, token, user) => {
  console.log("USER DATA", user);
  return fetch(`${process.env.REACT_APP_API_URL}/api/user/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      //"Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    // body: JSON.stringify(user), antes de implementar el form
    body: user,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
