import React from "react";
import { Container } from "reactstrap";
import { Route, Switch } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Main from "./normalRoute/Main";

import Register from "./normalRoute/Register";

import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "../assets/theme";
import { GlobalStyles } from "../assets/global";
import { useDarkMode } from "../assets/useDarkMode";
import Toggle from "../assets/Toggle";
import Fade from "react-reveal/Fade";

import PostList from "./normalRoute/PostList";

import PostWrite from "./normalRoute/PostWrite";
function Router() {
  const [theme, themeToggler, mountedComponent] = useDarkMode();
  const themeMode = theme === "light" ? lightTheme : darkTheme;

  let HideHeader =
    window.location.pathname === "/register" ? null : window.location
        .pathname === "/findpassword" ? null : (
      <Header theme={theme} />
    );
  if (!mountedComponent) return <div />;

  return (
    <ThemeProvider theme={themeMode}>
      <GlobalStyles />
      {HideHeader}
      <Fade right>
        <Toggle theme={theme} toggleTheme={themeToggler} />
      </Fade>
      <Container>
        <Switch>
          <Route
            path="/postlist"
            exact
            render={() => <PostList theme={theme} />}
          />
          <Route path="/postwrite" exact component={PostWrite} />
          <Route path="/" exact render={() => <Main theme={theme} />} />
          <Route path="/register" exact component={Register} />
        </Switch>
      </Container>
      <Footer theme={theme} />
    </ThemeProvider>
  );
}

export default Router;
