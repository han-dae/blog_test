import React from "react";
import { Button } from "reactstrap";

function Category({ posts }) {
  return (
    <>
      {Array.isArray(posts)
        ? posts.map(({ _id, categoryName }) => (
            <div key={_id} className="mr-3">
              {" "}
              // map 함수는 무조건 key값을 줘야 합니다
              <a href={`/post/category/${categoryName}`}>
                <span>
                  <Button>{categoryName}</Button>
                </span>
              </a>
            </div>
          ))
        : ""}
    </>
  );
}

export default Category;
