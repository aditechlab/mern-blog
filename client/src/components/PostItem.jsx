import React from 'react'
import {Link} from 'react-router-dom'
import PostAuthor from './PostAuthor'

const PostItem = ({postID, thumbnail, title, category,  description, authorID, createdAt}) => {
  const shortDescription = description.length > 145 ? description.substring(0, 145) + '...' : description
  const postTitle = title.length > 30 ? title.substring(0, 30) + '...' : title

  return (
    <article className='post'>
        <div className="post__thumbnail">
            <img src={`${process.env.REACT_APP_ASSETS_BASE_URL}/uploads/${thumbnail}`} alt={title} />
        </div>
        <div className="post__content">
            <Link to={`/posts/${postID}`}>
            <h3>{postTitle}</h3>
            </Link>
        </div>
        <p>{shortDescription}</p>
        <div className="post__footer">
            <PostAuthor authorID={authorID} createdAt={createdAt}/>
            <Link to={`/posts/categories/${category}`} className='btn category'>{category}</Link>
        </div>
      
    </article>
  )
}

export default PostItem
