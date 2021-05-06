import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { POST_LOADING_REQUEST } from "../../redux/types";
// 내 알아서 만들라
import { Helmet } from "react-helmet";
import { Alert, Row } from "reactstrap";

import { GrowingSpinner } from "../../components/spinner/Spinner";

import PostCardOne from "../../components/post/PostCardOne";

import Category from "../../components/post/Category";

function PostList({ theme }) {
  const style = {
    categoryBox: {
      width: "96%",
      marginLeft: "2%",
      backgroundColor: `${theme === "dark" ? "white" : "#212529"}`,
      color: `${theme === "dark" ? "#212529" : "white"}`,
      borderLeft: "4px solid gray",
      borderRight: "4px solid gray",
      transition: "all 0.50s linear",
    },
  };

  const { posts, categoryFindResult } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: POST_LOADING_REQUEST,
    });
  }, [dispatch]);

  return (
    <>
      <br />
      <br />
      <Helmet title="DC.LOG - POST" />
      <Row
        className="d-flex justify-content-center mt-5 py-2 mb-5 sticky-top rounded"
        style={style.categoryBox}
      >
        <Category posts={categoryFindResult} />
      </Row>
      <Row>
        {posts ? <PostCardOne posts={posts} theme={theme} /> : GrowingSpinner}
      </Row>
    </>
  );
}
export default PostList;
