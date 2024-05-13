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
    const [commentsFailedToLoad, setCommentsFailedToLoad] = useState(false);
    const [voted, setVoted] = useState([])
    const [addingComment, setAddingComment] = useState(false)

    const [totalComments, setTotalComments] = useState(0)
    const [commentPage, setCommentPage] = useState(1)

    const [err, setErr] = useState('')
    const [fade, setFade] = useState(false)

    useEffect(() => {
        setFade(true)
        const fadeTimeOut = setTimeout(() => {
            setFade(false)
          }, 4000);
        if (err && err !== '') {
          const timeout = setTimeout(() => {
            setErr('');
          }, 6000); 
          return () => clearTimeout(timeout);
        }
        return () => clearTimeout(fadeTimeOut);
    }, [err]);
      
    

    useEffect(() => {
        setCommentsAreLoading(true)
        getAllCommentFromId(article_id, commentPage).then(({comments, total_count}) => {
            setTotalComments(total_count)
            setComments(comments)
            setCommentsAreLoading(false)
            setVoted(comments.map(comment => ('')));
        }).catch(()=> {
            setCommentsFailedToLoad(true)
        })
    }, [commentPage])

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
        e.target.innerText === 'Next Page' ? setCommentPage((currentPage) => currentPage + 1) : setCommentPage((currentPage) => currentPage - 1)
    }

    if (commentsFailedToLoad) {
        return (
            <h3>
                Comments failed to load. Try again later
            </h3>
        )
    }

    return (
        <div className='commments-container'>
            <h3>Comments</h3>
            {commentsAreLoading ? (
                <p>Loading</p> 
            ) : (
                <>
                    <p><span className={!fade ? 'fade-out' : ''}>{err}</span></p>
                    {addingComment ? 
                    <div className="new-comment-container">
                        <AddNewComment article_id={article_id} setAddingComment={setAddingComment} err={err} setErr={setErr} setCommentPage={setCommentPage} setComments={setComments}/>
                    </div>
                    : null }
                    <button disabled={err !== ''} onClick={createNewComment}>New comment</button>
                    {comments.map((comment, index) => (
                        <div className='comment-container' key={index}>
                            <CommentCard singleArticle={singleArticle} comments={comments} setComments={setComments} comment={comment} index={index} voted={voted} setVoted={setVoted} err={err} setErr={setErr} setCommentPage={setCommentPage}/>
                        </div>
                    ))}
                    <div className='pages'> 
                        <button disabled={commentPage === 1 || err !== ''} onClick={handleClick}>Previous Page</button>
                            <p>{commentPage}</p>
                        <button disabled={(commentPage * 10) >= totalComments || err !== ''} onClick={handleClick}>Next Page</button>
                    </div>
                </> 
            )}
        </div>
    )
}

export default Comments