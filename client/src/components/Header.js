import React, { useCallback, useState, useEffect } from "react";
import { Button, Col, Row, Form } from "reactstrap";
import Fade from "react-reveal/Fade";
import LoginModal from "./auth/LoginModal";
import { useDispatch, useSelector } from "react-redux";
import { LOGOUT_REQUEST } from "../redux/types";
import Dropdown from "react-bootstrap/Dropdown";
import { CgProfile } from "react-icons/cg";

import { Link } from "react-router-dom";

function Header({ theme }) {
  const style = {
    logo: { fontSize: "2.3rem", transition: "all 0.50s linear" },
    container: {
      marginRight: "5rem",
      paddingTop: "2.7rem",
    },
    dropdownToggle: {
      backgroundColor: `${theme === "dark" ? "#212529" : "white"}`,
      color: `${theme === "dark" ? "white" : "#212529"}`,
      border: "0",
      fontSize: "1.2rem",
      paddingTop: "0",
      transition: "all 0.50s linear",
    },
    dropdownItem: {
      padding: "0",
    },
    logoutButton: { backgroundColor: "white", color: "#212529" },
    contactButton: { fontSize: "1.2rem", transition: "all 0.50s linear" },
  };

  const { isAuthenticated, userRole } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const onLogout = useCallback(() => {
    dispatch({
      type: LOGOUT_REQUEST,
    });
  }, [dispatch]);
  return (
    <>
      <Fade top>
        <Row>
          <Col xs="0" sm="4"></Col>
          <Col xs="6" sm="4">
            <a
              href="/"
              className={
                theme === "dark"
                  ? "d-flex justify-content-center pt-4 text-white text-decoration-none"
                  : "d-flex justify-content-center pt-4 text-dark text-decoration-none"
              }
              style={style.logo}
            >
              <b>DC.LOG</b>
            </a>
          </Col>
          <Col xs="6" sm="4">
            <div
              className="d-flex justify-content-center"
              style={style.container}
            >
              <span>
                {userRole === "Master" ? (
                  <Form>
                    <a
                      href="/postwrite"
                      className="btn btn-success block text-white text-decoration-none"
                    >
                      Add Post
                    </a>
                  </Form>
                ) : (
                  ""
                )}
              </span>

              <span className="mr-5">
                {isAuthenticated ? (
                  <Dropdown>
                    <Dropdown.Toggle
                      id="dropdown-basic"
                      style={
                        theme === "dark"
                          ? style.darkDropdownToggle
                          : style.lightDropdownToggle
                      }
                    >
                      <CgProfile />
                    </Dropdown.Toggle>
                    <Dropdown.Menu style={{ padding: "0" }}>
                      <Dropdown.Item style={style.dropdownItem}>
                        <Button
                          onClick={onLogout}
                          block
                          style={style.logoutButton}
                        >
                          LOGOUT
                        </Button>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                ) : (
                  <LoginModal theme={theme} />
                )}
              </span>
              <a
                href="/contact"
                className={
                  theme === "dark"
                    ? "text-decoration-none text-white"
                    : "text-decoration-none text-dark"
                }
                style={style.contactButton}
              >
                CONTACT
              </a>
            </div>
          </Col>
        </Row>
      </Fade>
    </>
  );
}

export default Header;
