import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { addPost } from './postSlice'
import {addNewPost} from '../posts/postSlice'
import { selectAllUsers } from '../users/userSlice'
import { STATUS } from './postSlice'
import { useNavigate } from 'react-router-dom'

const AddPostForm = () => {
    const navigate = useNavigate();

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [userId, setUserId] = useState('')
    const [requestStatus, setRequestStatus]= useState(STATUS.IDLE)

    const users = useSelector(selectAllUsers)

    const dispatch = useDispatch();

    const onAuthorChanged = e => setUserId(e.target.value)

    const canSave = Boolean(title) && Boolean(content) && Boolean(userId) && (requestStatus === STATUS.IDLE)

    const savePostClickHandler = () =>{
        if (canSave) {
            try {
                setRequestStatus(STATUS.LOADING)
                dispatch(addNewPost({ title, body: content, userId })).unwrap()

                setTitle('')
                setContent('')
                setUserId('')
                navigate('/')
            } catch (err) {
                console.error('Failed to save the post', err)
            } finally {
                setRequestStatus(STATUS.IDLE)
            }
        } 
    }



    const usersOptions = users.map(user => (
        <option key={user.id} value={user.id}>
            {user.name}
        </option>
    ))


  return (
    <section>
            <h2>Add a New Post</h2>
            <form>
                <label htmlFor="postTitle">Post Title:</label>
                <input
                    type="text"
                    id="postTitle"
                    name="postTitle"
                    value={title}
                    onChange={(e)=> setTitle(e.target.value)}
                />
                <label htmlFor="postAuthor">Author:</label>
                <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
                    <option value=""></option>
                    {usersOptions}
                </select>
                <label htmlFor="postContent">Content:</label>
                <textarea
                    id="postContent"
                    name="postContent"
                    value={content}
                    onChange={(e)=> setContent(e.target.value)}
                />
                <button
                    type="button"
                    onClick={savePostClickHandler}
                    disabled={!canSave}
                >Save Post</button>
            </form>
        </section>
  )
}

export default AddPostForm
