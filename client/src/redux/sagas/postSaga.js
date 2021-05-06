import axios from "axios";
import { all, call, put, takeEvery, fork } from "redux-saga/effects";
import { push } from "connected-react-router";
import {
  POST_LOADING_FAILURE,
  POST_LOADING_REQUEST,
  POST_LOADING_SUCCESS,
  POST_UPLOAD_FAILURE,
  POST_UPLOAD_REQUEST,
  POST_UPLOAD_SUCCESS,
  POST_DELETE_REQUEST,
  POST_DELETE_FAILURE,
  POST_DELETE_SUCCESS,
  POST_DETAIL_LOADING_REQUEST,
  POST_DETAIL_LOADING_FAILURE,
  POST_DETAIL_LOADING_SUCCESS,
} from "../types";

// All Posts Load
const loadPostAPI = () => {
  return axios.get("/api/post/");
};

function* loadPosts() {
  try {
    const result = yield call(loadPostAPI);

    yield put({
      type: POST_LOADING_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: POST_LOADING_FAILURE,
      payload: e,
    });
  }
}
//POST DETAIL??
const loadPostDetailAPI = (payload) => {
  return axios.get(`/api/post/${payload}`);
};

function* loadPostDetail(action) {
  try {
    const result = yield call(loadPostDetailAPI, action.payload);

    yield put({
      type: POST_DETAIL_LOADING_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: POST_DETAIL_LOADING_FAILURE,
      payload: e,
    });

    // 포스트 로딩에 실패하면 홈으로 돌아갑니다.
    yield put(push("/"));
  }
}

function* watchloadPostDetail() {
  yield takeEvery(POST_DETAIL_LOADING_REQUEST, loadPostDetail);
}

// Post Delete
const deletePostAPI = (payload) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const token = payload.token;
  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return axios.delete(`/api/post/${payload.id}`, config);
};

function* deletePost(action) {
  try {
    const result = yield call(deletePostAPI, action.payload);

    yield put({
      type: POST_DELETE_SUCCESS,
      payload: result.data,
    });

    yield put(push("/postlist"));
  } catch (e) {
    yield put({
      type: POST_DELETE_FAILURE,
      payload: e,
    });
  }
}

function* watchdeletePost() {
  yield takeEvery(POST_DELETE_REQUEST, deletePost);
}

function* watchloadPosts() {
  yield takeEvery(POST_LOADING_REQUEST, loadPosts);
}

const uploadPostAPI = (payload) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const token = payload.token;

  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return axios.post("/api/post/write", payload, config);
};
function* uploadPost(action) {
  try {
    const result = yield call(uploadPostAPI, action.payload);

    console.log(result);

    yield put({
      type: POST_UPLOAD_SUCCESS,
      payload: result.data,
    });

    yield put(push(`/post/${result.data._id}`));
  } catch (e) {
    yield put({
      type: POST_UPLOAD_FAILURE,
      payload: e,
    });
  }
}
function* watchuploadPost() {
  yield takeEvery(POST_UPLOAD_REQUEST, uploadPost);
}

export default function* postSaga() {
  yield all([
    fork(watchloadPosts),
    fork(watchloadPostDetail),
    fork(watchdeletePost),
  ]);
}
