import React from 'react'
import { Link } from 'react-router-dom'
import { POST_CATEGORIES } from '../data';

const Footer = () => {

  return (
    <footer>
      <ul className="footer__categories">
        {POST_CATEGORIES.map(cat => 
          <li key={cat}><Link to={`/posts/categories/${cat}`}>{cat}</Link></li>
        )}
      </ul>
      <div className="footer__copyright">
        <small>All Rights Reserved &copy; Copyright, Mern Blog</small>
      </div>
    </footer>
  )
}

export default Footer
