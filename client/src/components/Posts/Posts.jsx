import React from 'react'
import './Posts.css'
import Post from '../Post/Post'
import {useDispatch,useSelector} from 'react-redux'    
import { useEffect } from 'react'
import { getTimelinePosts } from '../../actions/postAction'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

const Posts = () => {


  const dispatch=useDispatch()
  const params=useParams()
  
  const {user}=useSelector((state)=>state.authReducer.authData)               
  let {posts,loading}=useSelector((state)=>state.postReducer)      
  
  useEffect(()=>{
    dispatch(getTimelinePosts(user._id))   
  },[])
  
  
  console.log(params.id,"params//////");               
    if(!posts) return "no posts available"  
    if(params.id){
      posts=posts.filter((post)=>post.userId===params.id)
    } 
  return (
    <div className="Posts">
      {loading?"Fetching posts...":                                
      posts.map((post,id)=>{
    return <Post data={post} key={id}/>
      })}
    </div>
  )
}

export default Posts