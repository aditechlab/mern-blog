import axios from 'axios'
import React, { useEffect, useState } from 'react'

import PostItem from './PostItem'
import Loader from './Loader'


const Posts = () => {
    const [posts, setPosts] = useState([])
    const [isLoading, setIsLoading] = useState(false);

    useEffect(()=> {
      const fetchPosts = async () => {
        setIsLoading(true);
        try {
          const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/`);
          setPosts(response?.data)
          
        } catch (error) {
          console.log(error);
          
        }
        setIsLoading(false)
      }

      fetchPosts();
    }, []);

    if(isLoading){
      return <Loader />
    }

  return (
    <section className='posts'>
        {posts.length > 0 ? <div className="container posts__container">
            {
                posts.map(({_id:id, image, category,title,description, creator, createdAt}) => 
                <PostItem key={id} 
                  postID={id} 
                  thumbnail={image} 
                  title={title} 
                  category={category} 
                  description={description} 
                  authorID={creator} 
                  createdAt={createdAt} 
                />)
            }
        </div> : <h2 className='center'>No posts found</h2>}
    </section>
  )
}

export default Posts
