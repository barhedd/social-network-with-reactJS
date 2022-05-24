const AuthHelper = {};

const authUrl = "https://posts-pw2021.herokuapp.com/api/v1/auth/signin";

const whoamiUrl = "https://posts-pw2021.herokuapp.com/api/v1/auth/whoami";

AuthHelper.login = async (e) => {
  e.preventDefault();
  let loginStatus = {};
  let loginForm = new FormData(document.querySelector("#loginForm"));
  let request = await fetch(authUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `username=${loginForm.get("username")}&password=${loginForm.get(
      "password"
    )}`,
  });
  let response = await request.json();
  if (request.ok) {
    loginStatus = { logged: true, token: response.token };
    localStorage.setItem("login", JSON.stringify(loginStatus));
  } else {
    loginStatus.logged = false;
    loginStatus.body = response;
  }

  return loginStatus;
};

AuthHelper.whoami = async (token) => {
  let userInfo = { found: false, username: "", role: "" };
  let request = await fetch(
    whoamiUrl,
    {
      method: "GET",
      withCredentials: true,
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  let response = await request.json();
  //if request is not ok the token probably expired
  if (request.ok) {
    userInfo = { found: true, ...response };
  } else {
    userInfo = { found: false };
  }

  return userInfo;
};

export default AuthHelper;
