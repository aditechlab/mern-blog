import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';

const PostAuthor = ({authorID, createdAt}) => {
  const [author, setAuthor] = useState({});


  useEffect(()=> {
    const getAuthor = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/users/${authorID}`);
        setAuthor(response?.data);
      } catch (error) {
        console.log(error);
        
      }
    }
    getAuthor();
  },[]);

  return (
    <Link to={`posts/users/${authorID}`} className='post__author'>
        <div className="post__author-avatar">
            <img src={`${process.env.REACT_APP_ASSETS_BASE_URL}/uploads/${author?.avatar}`} alt="" />
        </div>
        <div className="post__author-details">
            <h5>By {author.name}</h5>
            <small>{createdAt}</small>
        </div>
    </Link>
  )
}

export default PostAuthor
