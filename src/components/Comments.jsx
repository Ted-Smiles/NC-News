import { useEffect, useState } from "react";
import { changeCommentVote, convertTime, getAllCommentFromId } from "../api";

const Comments = ({article_id, setErr}) => {

    const [comments, setComments] = useState([])
    const [commentsAreLoading, setCommentsAreLoading] = useState(true);
    const [voted, setVoted] = useState([])
    

    useEffect(() => {
        setCommentsAreLoading(true)
        getAllCommentFromId(article_id).then(({comments}) => {
            setComments(comments)
            setCommentsAreLoading(false)
            setVoted(comments.map(comment => ('')));
        })
    }, [])

    const handleClick = (e, id) => {
        const index = comments.findIndex(comment => comment.comment_id === id);

        if (voted[index] === e.target.innerText) {
            changeCommentVote(id, e.target.innerText === '+' ? '-' : '+')
            const updatedComments = [...comments];
            if (e.target.innerText === '+') {
                updatedComments[index].votes--;
            }
            if (e.target.innerText === '-') {
                updatedComments[index].votes++;
            }
            setComments(updatedComments);
            const updatedVoted = [...voted];
            updatedVoted[index] = ''
            setVoted(updatedVoted);
        }
        else if (voted[index] === ""){
            const updatedComments = [...comments];
            if (e.target.innerText === '+') {
                updatedComments[index].votes++;
            }
            if (e.target.innerText === '-') {
                updatedComments[index].votes--;
            }
            setComments(updatedComments);
            changeCommentVote(id, e.target.innerText).catch(() => {
                setErr(true)
                changeCommentVote(id, e.target.innerText === '+' ? '-' : '+')
                const updatedComments = [...comments];
                if (e.target.innerText === '+') {
                    updatedComments[index].votes--;
                }
                if (e.target.innerText === '-') {
                    updatedComments[index].votes++;
                }
                setComments(updatedComments);
                const updatedVoted = [...voted];
                updatedVoted[index] = ''
                setVoted(updatedVoted);
            })
    
            const updatedVoted = [...voted];
            updatedVoted[index] = e.target.innerText
            setVoted(updatedVoted);

        }
    }
    

    return (
        <div className='commments-container'>
            <h3>Comments</h3>
            {commentsAreLoading ? <p>Loading</p> : comments.map((comment, index) => {
                return(
                    <div className='comment-container' key={index}>
                        <div className='comment-author'>
                            <p>{comment.author}</p>
                            <p>{convertTime(comment.created_at)}</p>
                        </div>
                        <p>{comment.body}</p>
                        <div className='votes'> 
                            <button className={voted[index] === '+' ? 'active' : ''} onClick={(e) => handleClick(e, comment.comment_id)}>+</button>
                            <p>{comment.votes}</p>
                            <button className={voted[index] === '-' ? 'active' : ''} onClick={(e) => handleClick(e, comment.comment_id)}>-</button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Comments