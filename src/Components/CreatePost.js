import React,{useState} from 'react'
import axios from 'axios';
import './style/Createpost.css'
import { useNavigate } from 'react-router-dom';

const CreatePost = ({userId}) => {

    const [content,setContent]=useState('')
    const [image,setImage]=useState('');
    const [imageFile,setImageFile]=useState('')

    const navigate = useNavigate()

    const handleChange=(event)=>{
        const {name,value,files}=event.target
        if(name === 'content'){
            setContent(value)
        }

        if(name === 'image'){
            setImage(value)
        }

        if(name === 'imagefile'){
          setImageFile(files[0])
        }
    }


    const handleClick=()=>{

     const formData = new FormData();

     formData.append('content' , content);
     formData.append('userId' , userId);

     if(image){
      formData.append('image' , image);
     }

     if(imageFile){ 
      formData.append('imageFile' , imageFile);
     }

      axios.post('http://localhost:5000/posts',formData)
      .then(response=>{
        alert(response.data.message)
      if(response.data.message){
        navigate('/posts')
      }
    })
      .catch(error=>alert(error.message))

    }


  return (
    <div className='create-post-container'>
     <div className='create-post-card'>
        <input type='text' onChange={handleChange} placeholder='Content' name='content' className='content-input' />
        <input type='text' onChange={handleChange} placeholder='Image (optional)' name='image' className='content-input' />
        <input type='file' onChange={handleChange} placeholder='Image' name='imagefile' className='content-input' />

        <button className='post-button' onClick={handleClick}>Post</button>
     </div>
    </div>
  )
}

export default CreatePost