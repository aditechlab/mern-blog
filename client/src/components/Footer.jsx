import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer>
      <ul className="footer__categories">
        <li><Link to="/posts/categores/Agriculture">Agriculture</Link></li>
        <li><Link to="/posts/categores/Business">Business</Link></li>
        <li><Link to="/posts/categores/Education">Education</Link></li>
        <li><Link to="/posts/categores/Entertainment">Entertainment</Link></li>
        <li><Link to="/posts/categores/Culture">Culture</Link></li>
        <li><Link to="/posts/categores/Politics">Politics</Link></li>
        <li><Link to="/posts/categores/Art">Art</Link></li>
        <li><Link to="/posts/categores/Economy">Economy</Link></li>
        <li><Link to="/posts/categores/Wealther">Wealther</Link></li>
      </ul>
      <div className="footer__copyright">
        <small>All Rights Reserved &copy; Copyright, Mern Blog</small>
      </div>
    </footer>
  )
}

export default Footer
