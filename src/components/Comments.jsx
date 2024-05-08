import { useEffect, useState } from "react";
import { getAllCommentFromId } from "../api";
import CommentCard from "./CommentCard";
import AddNewComment from "./AddNewComment";

import { useContext } from "react"
import { UserContext } from "../context/User"



const Comments = ({singleArticle, article_id}) => {
    const { user } = useContext(UserContext);

    const [comments, setComments] = useState([])
    const [commentsAreLoading, setCommentsAreLoading] = useState(true);
    const [voted, setVoted] = useState([])
    const [addingComment, setAddingComment] = useState(false)
    const [deleted, setDeleted] = useState(false)

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
            setDeleted(false)
        })
    }, [addingComment, page, deleted])

    useEffect(() => {
        if (addingComment) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
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
                    {deleted ? <p>Successfully deleted</p> : null}
                    {addingComment ? 
                    <div className="new-comment-container">
                        <AddNewComment article_id={article_id} setAddingComment={setAddingComment} setErr={setErr} setPage={setPage}/>
                    </div>
                    : null }
                    <button onClick={createNewComment}>New comment</button>
                    {comments.map((comment, index) => (
                        <div className='comment-container' key={index}>
                            <CommentCard singleArticle={singleArticle} comments={comments} setComments={setComments} comment={comment} index={index} voted={voted} setVoted={setVoted} setErr={setErr} setDeleted={setDeleted} setPage={setPage}/>
                        </div>
                    ))}
                    <div className='pages'> 
                        <button disabled={page === 1} onClick={handleClick}>Previous Page</button>
                            <p>{page}</p>
                        <button disabled={(page * 10) >= totalComments} onClick={handleClick}>Next Page</button>
                    </div>
                </> 
            )}
        </div>
    )
}

export default Comments