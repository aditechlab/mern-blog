import React, { useContext, useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import AccessControl from '../components/AccessControl';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import axios from 'axios';

const EditPost = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Uncategorized');
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [error, setError] = useState('')

  const navigate = useNavigate()
  const {id} = useParams()


  const {currentUser} = useContext(UserContext);
  const token = currentUser?.token

  const modules = {
    toolbar: [
      [{'header':[1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'ident': '-1'}, {'ident': '+1'}],
      ['link', 'image'],
      ['clean']
    ]
  }

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike','blockquote',
    'list', 'bullet', 'indent', 'link', 'image'
  ];

  const POST_CATEGORIES = ["Agriculture","Business","Education","Entertainment","Art","Investment","Uncategorized","Weather"];


  useEffect(()=> {
    const getPost = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/${id}`);
        setTitle(response.data.title)
        setCategory(response.data.category)
        setDescription(response.data.description)
        
      } catch (err) {
        setError(err.response.data.message);
      }
    }
    getPost();
  }, [])

  return (
    <section className="create-post">
      <AccessControl />
      <div className="container">
        <h2>Edit Post</h2>
        {error && <p className="form__error-message">{error}</p>}
        <form action="" className="form create-post__form">
          <input type="text" name="title" placeholder='Title' id="title" value={title} onChange={e => setTitle(e.target.value)} autoFocus />
          <select name='category' value={category} onChange={e=>setCategory(e.target.value)}>
            {
              POST_CATEGORIES.map(category => <option value={category}>{category}</option>)
            }
          </select>
          <ReactQuill modules={modules} formats={formats} value={description} onChange={setDescription}/>
          <input type="file" name="file" id="file" onChange={e=>setThumbnail(e.target.files[0])} accept='png, jpg, jpeg' />
          <button type="submit" className='btn primary'>Update</button>
        </form>
      </div>
    </section>
  )
}

export default EditPost
