import React from 'react'
import Author from './Author';
import TimeAgo from './Timeago';
import ReactionsButtons from './ReactionsButtons';
import { Link } from 'react-router-dom';


const PostExercpt = ({ post }) => {
    return (
        <article >
            <h2>{post.title}</h2>
            <p className="excerpt">{post.body.substring(0, 75)}</p>
            <p className='postCredit'>
                <Link to={`post/${post.id}`}>View Post</Link>
                <Author userId={post.userId} />
                <TimeAgo timestamp={post.date} />
            </p>
            <ReactionsButtons post={post} />
        </article>

    )
}

export default PostExercpt
