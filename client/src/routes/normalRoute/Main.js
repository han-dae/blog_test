import React from "react";
import { Container, Row } from "reactstrap";
import Fade from "react-reveal/Fade";

function MainBody() {
  return (
    <>
      <Fade bottom>
        <Container
          id="content"
          className="d-flex justify-content-center text-center align-items-center font-weight-bold"
          style={style.container}
        >
          <Row>
            I WANT TO MAKE
            <br />
            SOMETHING SPECIAL
            <br />
            AND USEFUL
          </Row>
        </Container>
      </Fade>
    </>
  );
}
// 스타일을 객체 형태로 전달
const style = {
  container: {
    marginTop: "5vh",
    height: "65vh",
  },
};
export default MainBody;
