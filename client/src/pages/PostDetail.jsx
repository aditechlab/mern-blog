import React from "react";
import PostAuthor from "../components/PostAuthor";
import { Link } from "react-router-dom";
import Thumbnail from "../images/blog22.jpg";

const PostDetail = () => {
  return (
    <section className="post-detail">
      <div className="container post-detail__container">
        <div className="post-detail__header">
          <PostAuthor />
          <div className="post-detail__buttons">
            <Link to={`/posts/name/edit`} className="btn sm primary">
              Edit
            </Link>
            <Link to={`/posts/name/delete`} className="btn sm danger">
              Delete
            </Link>
          </div>
        </div>
        <h1>this is the post title!</h1>
        <div className="post-detail__thumbnail">
          <img src={Thumbnail} alt="" />
        </div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id cumque
          natus totam nostrum? Id sunt magni inventore eaque a praesentium
          nostrum, reprehenderit impedit, sequi, repellendus aspernatur tempore
          animi voluptatum assumenda ex temporibus? Pariatur repudiandae dolor
          excepturi voluptates ab sapiente sint!
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id cumque
          natus totam nostrum? Id sunt magni inventore eaque a praesentium
          nostrum, reprehenderit impedit, sequi, repellendus aspernatur tempore
          animi voluptatum assumenda ex temporibus? Pariatur repudiandae dolor
          excepturi voluptates ab sapiente sint!
        </p>
      </div>
    </section>
  );
};

export default PostDetail;
