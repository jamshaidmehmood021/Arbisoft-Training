import React from 'react'
import Author from './Author';
import TimeAgo from './Timeago';
import ReactionsButtons from './ReactionsButtons';


const PostExercpt = ({ post }) => {
    return (
        <article >
            <h3>{post.title}</h3>
            <p>{post.body.substring(0, 100)}</p>
            <p className='postCredit'>
                <Author userId={post.userId} />
                <TimeAgo timestamp={post.date} />
            </p>
            <ReactionsButtons post={post} />
        </article>

    )
}

export default PostExercpt
