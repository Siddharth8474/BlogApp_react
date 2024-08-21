import React,{useState,useEffect} from 'react';
import axios from 'axios';
import './style/Postlist.css';
import { useNavigate } from 'react-router-dom';

const PostList = ({userId}) => {

    const [posts,setPosts]=useState([]);

    const navigate = useNavigate();

    useEffect(()=>{
        axios.get('http://localhost:5000/posts')
        .then(response=>setPosts(response.data))  
        .catch(error=>alert(error.message))
    }, []);


    const handleCreatePostClick=()=>{
     if(userId){
        navigate('/create-post')
     }
     else{
        navigate('/login')
     }
    }


  return (
    <div className='post-list-container'>

        {/* <h2>Posts</h2> */}
        <button className='create-post-button' onClick={handleCreatePostClick}>create post</button>
        {
            posts.map(post=>(
                <div key={post._id} className='post-card'>
                  {post.image && (
                  <img
                  src={typeof post.image === 'string' && post.image.startsWith('http') ? post.image : `http://localhost:5000${post.image}`}
                  alt='post'
                  className='post-image'
                />
                  )}
                  <div className='post-content'>
                  <p>{post.content}</p>
                  <p><strong>Posted By:</strong> { post.userId.username }</p>
                  </div>
                </div>
            ))
        }

    </div>
  )
}

export default PostList