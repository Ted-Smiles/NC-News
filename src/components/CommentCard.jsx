import { changeCommentVote, convertTime, deleteComment } from "../api"

import { useContext, useState } from "react"
import { UserContext } from "../context/User"

const CommentCard = ({singleArticle, comments, setComments, comment, index, voted, setVoted, err, setErr, setPage}) => {
    const { user } = useContext(UserContext);
    const [deleted, setDeleted] = useState(false)
    const [confirm, setConfirm] = useState(false)

    const handleVote = (e, id) => {
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
            changeCommentVote(id, e.target.innerText).catch((err) => {
                setErr('Error with your vote')
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

    const handleDelete = (id) => {
        if (!confirm) {
            setConfirm(true)
        } else {
            setPage(1)
            deleteComment(id).then(()=>{
                setDeleted(true)
                setConfirm(false)
            }).catch(() => {
                setConfirm(false)
                setDeleted(false)
                setErr('Error deleting comment')
            })

        }
    }

    if (deleted) {
        return ( 
            <h4>Successfully deleted comment</h4>
        )
    }

    return (
        <>
            <div className='comment-author'>
                <p>{comment.author}</p>
                <p>{convertTime(comment.created_at)}</p>
            </div>
            <p>{comment.body}</p>
            <div className='votes'> 
                <button disabled={err !== ''} className={voted[index] === '-' ? 'active' : ''} onClick={(e) => handleVote(e, comment.comment_id)}>-</button>
                    <p>{comment.votes}</p>
                <button disabled={err !== ''} className={voted[index] === '+' ? 'active' : ''} onClick={(e) => handleVote(e, comment.comment_id)}>+</button>
            </div>
            { (comment.author === user || singleArticle.author === user) ?
                <button disabled={err !== ''} onClick={()=> {handleDelete(comment.comment_id)}}>{!confirm ? 'Delete' : 'Are you sure?'}</button>
             : null }

        </>
    )
}

export default CommentCard