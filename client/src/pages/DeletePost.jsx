import React, { useContext } from 'react'
import AccessControl from '../components/AccessControl'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { UserContext } from '../context/userContext';

const DeletePost = ({postID: id}) => {

  const navigate = useNavigate();
  const {currentUser} = useContext(UserContext);
  const token = currentUser?.token
  const location = useLocation();

  console.log(id);
  
  const removePost = async () => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/posts/${id}`, {
          withCredentials:true, headers: {Authorization: `Bearer ${token}`} 
        });
        console.log(response);
        
        if(response.status === 200){
          //check location where the post is deleted
          if(location.pathname === `myposts/${currentUser.id}`){
            navigate(0);
          }else{
            navigate('/');
          }
        }
    } catch (err) {
      console.log(err);
      
    }
  }

  return (
    <div>
        <AccessControl />
        <Link className="btn sm danger" onClick={removePost}>Delete</Link>
      </div>
  )
}

export default DeletePost
