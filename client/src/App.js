import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Navbar, Signout } from "./components";
import { UidContext } from "./components/UserIdConnect";
import { getUser } from "./actions/userAction";

import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import ProtectedRoute from "./Routes/ProtectedRoute";
import NavbarAdmin from "./components/Navbar/NavBarAdmin";

//pages
import Home from "./Pages/Home";
import MySpace from "./Pages/MySpace";
import Dashboard from "./Pages/Dashboard";
import Profil from "./Pages/Profil";

const theme = createTheme({
  typography: {
    fontFamily: "Dosis",
  },
});

function App() {
  const [uid, setUid] = useState(null);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer);

  useEffect(() => {
    const fetchToken = async () => {
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}jwtid`,
        withCredentials: true,
      })
        .then((res) => {
          setUid(res.data);
        })
        .catch((err) => console.log("No token"));
    };
    fetchToken();

    if (uid) dispatch(getUser(uid));
  }, [uid, dispatch]);

  return (
    <UidContext.Provider value={uid}>
      <ThemeProvider theme={theme}>
        <Router>
          {uid && userData.role === "admin" ? <NavbarAdmin /> : <Navbar />}
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/profil" component={Profil} />
            <Route exact path="/register" component={Signout} />

            <ProtectedRoute exact path="/myspace" component={MySpace} />
            <ProtectedRoute exact path="/dashboard" component={Dashboard} />
            <Route
              path="*"
              component={() => (
                <div
                  style={{
                    marginTop: "100px",
                    textAlign: "center",
                    fontSize: "3rem",
                  }}
                >
                  "404 PAGE NOT FOUND"
                </div>
              )}
            />
          </Switch>
        </Router>
      </ThemeProvider>
    </UidContext.Provider>
  );
}

export default App;
