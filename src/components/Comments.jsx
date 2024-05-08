import { useEffect, useState } from "react";
import { getAllCommentFromId } from "../api";
import CommentCard from "./CommentCard";
import AddNewComment from "./AddNewComment";

import { useContext } from "react"
import { UserContext } from "../context/User"



const Comments = ({article_id}) => {
    const { user } = useContext(UserContext);

    const [comments, setComments] = useState([])
    const [commentsAreLoading, setCommentsAreLoading] = useState(true);
    const [voted, setVoted] = useState([])
    const [addingComment, setAddingComment] = useState(false)

    const [totalComments, setTotalComments] = useState(0)
    const [page, setPage] = useState(1)

    const [err, setErr] = useState('')
    

    useEffect(() => {
        setCommentsAreLoading(true)
        getAllCommentFromId(article_id, page).then(({comments, total_count}) => {
            setTotalComments(total_count)
            setComments(comments)
            setCommentsAreLoading(false)
            setVoted(comments.map(comment => ('')));
        })
    }, [addingComment, page])

    useEffect(() => {
        if (addingComment) {
            // Apply the overflow: hidden; style to the body when addingComment is true
            document.body.style.overflow = 'hidden';
        } else {
            // Remove the overflow: hidden; style when addingComment is false
            document.body.style.overflow = '';
        }
    
        // Cleanup function to remove the style when the component unmounts or when addingComment changes
        return () => {
            document.body.style.overflow = '';
        };
    }, [addingComment]);

    const createNewComment = () => {
        user !== '' ? setAddingComment(true) : setErr("Must be login to comment")
    }
    
    const handleClick = (e) => {
        e.target.innerText === 'Next Page' ? setPage((currentPage) => currentPage + 1) : setPage((currentPage) => currentPage - 1)
    }

    return (
        <div className='commments-container'>
            <h3>Comments</h3>
            {commentsAreLoading ? (
                <p>Loading</p> 
            ) : (
                <>
                    <p><span>{err}</span></p>
                    {addingComment ? 
                    <div className="new-comment-container">
                        <AddNewComment article_id={article_id} setAddingComment={setAddingComment} setErr={setErr}/>
                    </div>
                    : null }
                    <button onClick={createNewComment}>New comment</button>
                    {comments.map((comment, index) => (
                        <div className='comment-container' key={index}>
                            <CommentCard comments={comments} setComments={setComments} comment={comment} index={index} voted={voted} setVoted={setVoted} setErr={setErr}/>
                        </div>
                    ))}
                    <div className='pages'> 
                        <button disabled={page === 1} onClick={handleClick}>Previous Page</button>
                            <p>{page}</p>
                        <button disabled={(page * 10) > totalComments} onClick={handleClick}>Next Page</button>
                    </div>
                </> 
            )}
        </div>
    )
}

export default Comments