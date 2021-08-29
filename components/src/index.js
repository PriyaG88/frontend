import React from "react";
import ReactDOM from "react-dom";
import faker from "faker";
import CommentDetail from "./CommentDetail";
import ApprovalCard from "./ApprovalCard";

const App = () => {
  return (
    <div className="ui container comments">
      <ApprovalCard>
        <h4>Warning!</h4>
        Are you sure you want to do this?
      </ApprovalCard>
      <ApprovalCard>
        <CommentDetail
          author="Sam"
          avatar={faker.image.avatar()}
          timeAgo="Today at 4:45PM"
          comment="Nice blog post!"
        />
      </ApprovalCard>
      <ApprovalCard>
        <CommentDetail
          author="Alex"
          avatar={faker.image.avatar()}
          timeAgo="Today at 2:00AM"
          comment="Could be better..."
        />
      </ApprovalCard>
      <ApprovalCard>
        <CommentDetail
          author="Jane"
          avatar={faker.image.avatar()}
          timeAgo="Yesterday at 5:00PM"
          comment="Cool"
        />
      </ApprovalCard>
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
