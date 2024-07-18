import { useSelector } from 'react-redux';
import React from 'react'
import { selectAllPosts, getAllPostsStatusses } from './postSlice';
import PostExercpt from './PostExercpt';
import { Bars } from 'react-loading-icons'

// use effect is not needed if we are fetching the posts on the DOM load in the index.js
//import { useEffect } from 'react';
import { STATUS } from './postSlice';

const PostList = () => {
    //const dispatch = useDispatch();

    const posts = useSelector(selectAllPosts);
    const statuses = useSelector(getAllPostsStatusses);

    // useEffect(() =>{
    //     if(statuses === STATUS.IDLE ){
    //         dispatch(fetchPosts())
    //     }
    // }, [statuses, dispatch])


    let content;
    if (statuses === STATUS.LOADING) {
        content = <Bars stroke="#98ff98" />
    } else if (statuses === STATUS.SUCCESS) {
        const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))
        content = orderedPosts.map(post => <PostExercpt key={post.id} post={post} />)
    } else if (statuses === STATUS.ERROR) {
        content = <p>Something went wrong</p>;
    }
    return (
        <section>
            {content}
        </section>
    )
}

export default PostList