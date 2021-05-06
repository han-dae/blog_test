//client7
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import {
  POST_DETAIL_LOADING_REQUEST,
  USER_LOADING_REQUEST,
  USER_LOADING_FAILURE,
  USER_LOADING_SUCCESS,
  POST_DELETE_REQUEST,
  COMMENT_DELETE_REQUEST,
} from "../../redux/types";
import { Row, Container, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { GrowingSpinner } from "../../components/spinner/Spinner";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import BalloonEditor from "@ckeditor/ckeditor5-editor-balloon/src/ballooneditor";
import { editorConfiguration } from "../../components/editor/EditorConfig";
import Comments from "../../components/comments/Comments";

function PostDetail(req) {
  const theme = localStorage.getItem("theme");

  const style = {
    container: {
      backgroundColor: `${theme === "dark" ? "#212529" : "white"}`,
      color: `${theme === "dark" ? "white" : "black"}`,
      minHeight: "70vh",
      transition: "all 0.50s linear",
    },
    editor: {
      width: "100%",
      height: "auto",
      minHeight: "20vh",
      wordBreak: "break-all",
    },
  };
  const dispatch = useDispatch();
  const { postDetail, creatorId, title, loading } = useSelector(
    (state) => state.post
  );

  const { userId, userName } = useSelector((state) => state.auth);

  const { comments } = useSelector((state) => state.comment);

  const { date, creator, category, contents } = postDetail;

  // React Hook 중 componentDidMount()를 대신하는 함수입니다.
  // componentDidMount는 컴포넌트가 렌더링 된 직후 실행되는 함수입니다.
  // lifecycleAPI중 하나이니 찾아보시면 정리가 잘 되어있습니다!
  useEffect(() => {
    dispatch({
      type: POST_DETAIL_LOADING_REQUEST,
      payload: req.match.params.id,
    });
    dispatch({
      type: USER_LOADING_REQUEST,
      payload: localStorage.getItem("token"),
    });
  }, [dispatch, req.match.params.id]);

  const onCommentDeleteClick = (commentId) => {
    dispatch({
      type: COMMENT_DELETE_REQUEST,
      payload: {
        userId: userId,
        commentId: commentId,
        postId: req.match.params.id,
        token: localStorage.getItem("token"),
      },
    });
  };
  const EditButton = (
    <>
      <div className="d-flex justify-content-end pb-3">
        <div className="mr-2">
          <Link
            to={`/post/${req.match.params.id}/edit`}
            className="btn btn-success btn-block"
          >
            EDIT
          </Link>
        </div>
        <div>
          <Button className="btn-danger btn-block" onClick={onDeleteClick}>
            DELETE
          </Button>
        </div>
      </div>
    </>
  );
  // if문은 못쓰냐 해서 써봤습니다.
  // 아래와 같이 작성해야 하며 엄청 복잡합니다.
  const Body = (
    <Container style={style.container} className="mb-4 p-3">
      <Row className="d-flex p-3 mb-1 justify-content-center mt-3 pt-5">
        {(() => {
          if (postDetail && creator) {
            return (
              <div className="font-weight-bold" style={{ fontSize: "2.5rem" }}>
                {postDetail.title}
              </div>
            );
          }
        })()}
      </Row>
      {postDetail && postDetail.comments ? (
        <>
          <div
            className="d-flex justify-content-between pb-4"
            style={{ borderBottom: "1px solid gray" }}
          >
            <span className="ml-2">
              <Button outline color="primary">
                {category.categoryName}
              </Button>
            </span>
            <span className="text-muted" style={{ fontSize: "1.2rem" }}>
              Posted on {date.split(" ")[0]}&nbsp;
              {date.split(" ")[1]} {date.split(" ")[2]}
            </span>
          </div>
          <div className="mb-3 mt-4 p-3" style={style.editor}>
            <CKEditor
              editor={BalloonEditor}
              data={contents}
              config={editorConfiguration}
              disabled="true"
            />
          </div>
          {userId === creatorId ? EditButton : ""}
          <Row>
            <Container>
              <div
                style={{
                  borderBottom: `1px solid ${
                    theme === "dark" ? "white" : "gray"
                  }`,
                }}
              >
                <b>{comments.length}&nbsp;Comments</b>
              </div>
              <Comments
                id={req.match.params.id}
                userId={userId}
                userName={userName}
              />
              {Array.isArray(comments)
                ? comments.map(
                    ({ contents, creator, date, _id, creatorName }) => (
                      <div key={_id} className="mb-2">
                        <Row className="d-flex justify-content-between p-2">
                          <div style={{ fontSize: "1.1rem" }}>
                            <b>{creatorName ? creatorName : creator}</b>&nbsp;•
                            <span
                              className="font-weight-light"
                              style={{ color: "gray", fontSize: "0.8em" }}
                            >
                              &nbsp;{date}
                            </span>
                          </div>
                        </Row>
                        <Row className="p-2">
                          <div>{contents}</div>
                        </Row>
                        {creator === userId && userId ? (
                          <div className="d-flex justify-content-end">
                            <span
                              style={{ cursor: "pointer" }}
                              onClick={() => onCommentDeleteClick(_id)}
                            >
                              삭제
                            </span>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    )
                  )
                : "Creator"}
            </Container>
          </Row>
          <hr />
        </>
      ) : (
        ""
      )}
    </Container>
  );

  return (
    <div>
      <Helmet title={title} />
      {loading === true ? GrowingSpinner : Body}
    </div>
  );
}

export default PostDetail;
