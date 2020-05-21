import React, { useContext } from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import axios from "axios";
import { UserContext } from "../userContext";
import IconButton from "./iconButton"
import LoginIcon from "../png/001-password.png";
import LogoutIcon from "../png/002-exit.png";

function Login() {
  const context = useContext(UserContext);

  const notLoggedIn = () => {
    return (
      <div>
        <GoogleLogin
          clientId="687641367817-phvujd6f7h6cs69sobr0hbjkme4kodt1.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
          render={(renderProps) => (
            <IconButton
              icon={LoginIcon}
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
            >
              Login
            </IconButton>
          )}
        />
      </div>
    );
  };

  const loggedIn = () => {
    return (
      <div>
        <GoogleLogout
          clientId="687641367817-phvujd6f7h6cs69sobr0hbjkme4kodt1.apps.googleusercontent.com"
          buttonText="Logout"
          onLogoutSuccess={logout}
          render={(renderProps) => (
            <IconButton
              icon={LogoutIcon}
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
            >
              Logout
            </IconButton>
          )}
        ></GoogleLogout>
      </div>
    );
  };

  const checkLogin = () => {
    if (context.loggedIn) {
      return loggedIn();
    }
    return notLoggedIn();
  };

  const responseGoogle = (response) => {
    //  console.log(response);
    const email = response.profileObj.email;
    const name = response.profileObj.name;
    var userID = "";
    //console.log(context);
    // check if the user is in the database if not then add a new user
    const baseURL = process.env.REACT_APP_USERS;
    const queryURL = baseURL + email;
    //  console.log(queryURL);
    //first check if user is in the database
    axios
      .get(queryURL)
      .then((res) => {
        //  console.log(res);
        //console.log(res.data.length);
        // if user is not in the database
        if (res.data.length === 0) {
          //save user to database
          console.log("saving user to database");
          const postURL = baseURL + email + "&name=" + name;
          //    console.log(postURL);
          axios
            .post(postURL)
            .then((res) => {
              //      console.log(res);
              console.log("saved user to database");
              userID = res.data._id;
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          console.log("already in database");
          userID = res.data[0]._id;
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        context.setUser({
          email: email,
          name: name,
          userID: userID,
          loggedIn: true,
        });

        context.setLoggedIn(true);
      });
  };

  const logout = (response) => {
    //console.log(response);
    context.setUser({});
    context.setLoggedIn(false);
  };

  return <div>{checkLogin()}</div>;
}

export default Login;
