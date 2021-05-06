import React from "react";
import { Container, Row } from "reactstrap";
import Fade from "react-reveal/Fade";
import { Helmet } from "react-helmet";

import { Link } from "react-router-dom";

function Main({ theme }) {
  const style = {
    container: {
      marginTop: "5vh",
      height: "65vh",
    },
    goPost: {
      width: "auto",
      backgroundColor: `${theme === "dark" ? "#212529" : "white"}`,
      color: `${theme === "dark" ? "white" : "#212529"}`,
      transition: "all 0.50s linear",
    },
  };

  return (
    <>
      <Helmet title="DC.LOG" />
      <Container
        id="content"
        className="d-flex justify-content-center text-center align-items-center font-weight-bold"
        style={style.container}
      >
        <Fade left>
          <Row>
            I WANT TO MAKE
            <br />
            SOMETHING SPECIAL
            <br />
            AND USEFUL
          </Row>
        </Fade>
      </Container>
      <Fade right>
        <a
          href="/postlist"
          className={`d-flex justify-content-end ${
            theme === "dark" ? "text-white" : "text-dark"
          } text-decoration-none`}
          style={style.goPost}
        >
          Go to Post&nbsp;&rarr;
        </a>
      </Fade>
    </>
  );
}

export default Main;
