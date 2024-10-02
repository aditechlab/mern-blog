import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {

  const POST_CATEGORIES = ["Agriculture","Business","Education","Entertainment","Art","Investment","Weather"];

  return (
    <footer>
      <ul className="footer__categories">
        {POST_CATEGORIES.map(cat => 
          <li><Link to={`/posts/categories/${cat}`}>{cat}</Link></li>
        )}
      </ul>
      <div className="footer__copyright">
        <small>All Rights Reserved &copy; Copyright, Mern Blog</small>
      </div>
    </footer>
  )
}

export default Footer
