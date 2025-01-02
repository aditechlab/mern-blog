import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import AccessControl from '../components/AccessControl'
import Loader from '../components/Loader'
import { UserContext } from '../context/userContext'
import axios from 'axios'
import DeletePost from './DeletePost'

const Dashboard = () => {
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(false);

  const {id} = useParams(); //user id


  //login user
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true)
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/users/${id}`, {
          withCredentials:true, headers: {Authorization: `Bearer ${currentUser?.token}`}
        });
        setPosts(response.data)
      } catch (error) {
        console.log(error);
        
      }
      setIsLoading(false)
    }
    fetchPosts();
  }, [id])

  if(isLoading){
    return <Loader />
  }
  return (
    <section className='dashboard'>
      <AccessControl />
      {
        posts.length ? <div className="container dashboard__container">
          {
            posts.map(post => {
              return <article key={post._id} className='dashboard__post'>
                <div className="dashboard__post-info">
                  <div className="dashboard__post-thumbnail">
                    <img src={`${process.env.REACT_APP_ASSETS_BASE_URL}/uploads/${post.image}`} alt="" />
                  </div>
                  <h5>{post.title}</h5>
                </div>
                <div className="dashboard__post-actions">
                  <Link to={`/posts/${post._id}`} className='btn sm'>View</Link>
                  <Link to={`/posts/${post._id}/edit`} className='btn sm primary'>Edit</Link>
                  <DeletePost postID={post._id} />
                  {/* <Link to={`/posts/${post._id}/delete`} className='btn sm danger'>Delete</Link> */}
                </div>
              </article>
            })
          }
        </div> : <h2 className='center'>You have not posts yet</h2>
      }
    </section>
  )
}

export default Dashboard
