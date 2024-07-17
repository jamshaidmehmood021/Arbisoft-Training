import { useSelector } from 'react-redux';
import React from 'react'
import { selectAllPosts } from './postSlice';
import Author from './Author';
import TimeAgo from './Timeago';
import ReactionsButtons from './ReactionsButtons';

const PostList = () => {

    const posts = useSelector(selectAllPosts);
    const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))

    const renderedPosts = orderedPosts.map( (post) => (
        <article key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content.substring(0, 100)}</p>
            <p className='postCredit'>
                <Author userId={post.userId}/>
                <TimeAgo timestamp={post.date}/>
            </p>
            <ReactionsButtons post={post}/>
        </article>
    ));



    return (
        <section>
            <h2>Posts</h2>
            {renderedPosts}
        </section>
    )
}

export default PostList