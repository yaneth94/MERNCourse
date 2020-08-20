export const createPost = (userId, token, post) => {
  return fetch(`${process.env.REACT_APP_API_URL}/api/post/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: post,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const listPost = () => {
  return fetch(`${process.env.REACT_APP_API_URL}/api/post`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const singlePost = (postId) => {
  return fetch(`${process.env.REACT_APP_API_URL}/api/post/by/${postId}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const listPostUser = (userId, token) => {
  return fetch(`${process.env.REACT_APP_API_URL}/api/post/user/${userId}`, {
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

export const removePost = (postId, token) => {
  return fetch(`${process.env.REACT_APP_API_URL}/api/post/by/${postId}`, {
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

export const updatePost = (postId, token, post) => {
  return fetch(`${process.env.REACT_APP_API_URL}/api/post/by/${postId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      //"Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    // body: JSON.stringify(user), antes de implementar el form
    body: post,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
