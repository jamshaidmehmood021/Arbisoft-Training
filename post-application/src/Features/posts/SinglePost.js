import React from 'react'
import { useSelector } from 'react-redux'
import { selectPostById } from './postSlice'

import TimeAgo from './Timeago'
import Author from './Author'
import ReactionsButtons from './ReactionsButtons'
import { Link } from 'react-router-dom'

import { useParams } from 'react-router-dom';



const SinglePost = () => {
    const  {postId} = useParams()

    const post = useSelector((state) => selectPostById(state, Number(postId)))

    if (!post) {
        return (
            <section>
                <h2>Post not found!</h2>
            </section>
        )
    }

  return (
    <div>
    <article >
            <h3>{post.title}</h3>
            <p>{post.body.substring(0, 100)}</p>
            <p className='postCredit'>
                <Link to={`/post/edit/${post.id}`}>Edit Post</Link>
                <Author userId={post.userId} />
                <TimeAgo timestamp={post.date} />
            </p>
            <ReactionsButtons post={post} />
        </article>
      
    </div>
  )
}

export default SinglePost
