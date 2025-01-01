import React, { useEffect, useState } from 'react'
import PostItem from '../components/PostItem'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader';

const AuthorPosts = () => {
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(false);

  const {id} = useParams()
  
  useEffect(()=> {
    const getAuthorPosts = async () => {
      setIsLoading(true);
      try {
        
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/users/${id}`);
        setPosts(response?.data);

      } catch (error) {
        console.log(error);
        
      }
      setIsLoading(false);
    }
    getAuthorPosts()
  }, [id])

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

export default AuthorPosts
