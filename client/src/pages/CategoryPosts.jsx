import React, { useEffect, useState } from 'react'

import PostItem from '../components/PostItem'
import Loader from '../components/Loader';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CategoryPosts = () => {
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(false);

  const {category} = useParams()
  
  useEffect(()=> {
    const getAuthorPosts = async () => {
      setIsLoading(true);
      try {
        
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/categories/${category}`);
        setPosts(response?.data);

      } catch (error) {
        console.log(error);
        
      }
      setIsLoading(false);
    }
    getAuthorPosts()
  }, [category])

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

export default CategoryPosts
