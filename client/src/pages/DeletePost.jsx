import React from 'react'
import AccessControl from '../components/AccessControl'
import { Link } from 'react-router-dom'

const DeletePost = () => {
  return (
    <div>
        <AccessControl />
        <Link className="btn sm danger">Delete</Link>
      </div>
  )
}

export default DeletePost
