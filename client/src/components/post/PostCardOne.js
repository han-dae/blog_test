import React from "react";

function PostCardOne({ posts, theme }) {
  return (
    <>
      {Array.isArray(posts) // posts가 배열이라면!
        ? posts.map(({ _id, title, contents, category, date }) => {
            // map!
            return (
              <div key={_id} className="mb-3" style={style.container}>
                <a
                  href={`/post/${_id}`}
                  className="text-light text-decoration-none"
                >
                  <div
                    className={theme === "dark" ? "text-white" : "text-dark"}
                  >
                    <div style={style.title}>
                      <b>{title}</b>
                    </div>
                    <div className="mt-3" style={style.contents}>
                      // 여긴 게시글 내용의 미리보기이기 때문에 // 70글자가
                      넘는다면 자르고 뒤에 ...을 붙여줍니다 // 예를 들어 "다음
                      내용은 리액트와 노드의 관계에 대..." // 이렇게 보여줍니다
                      // 또한 replace 안에 js의 정규식이 사용되는데 // 이게
                      없다면 태그까지 내용에 보이게 될 것입니다 // 정규식은
                      추가로 공부하시면 좋습니다!
                      {contents.length >= 70
                        ? contents.replace(/(<([^>]+)>)/gi, "").slice(0, 70) +
                          "..."
                        : contents.replace(/(<([^>]+)>)/gi, "")}
                    </div>
                  </div>
                  <div
                    className="d-flex justify-content-end mt-4"
                    style={style.date}
                  >
                    <span>
                      // date.split(" ")[0]은 date를 띄어쓰기를 기준으로 자르고
                      // 잘린 내용 중 0번째 인덱스의 내용이란 의미입니다. Posted
                      on {date.split(" ")[0]}&nbsp;{date.split(" ")[1]}{" "}
                      {date.split(" ")[2]}
                    </span>
                  </div>
                </a>
              </div>
            );
          })
        : ""}
    </>
  );
}

const style = {
  container: {
    width: "90%",
    marginLeft: "5%",
  },
  title: {
    fontSize: "2.2rem",
    transition: "all 0.50s linear",
  },
  contents: {
    fontSize: "1.3rem",
    transition: "all 0.50s linear",
  },
  date: { color: "gray", fontSize: "1.2rem" },
};

export default PostCardOne;
