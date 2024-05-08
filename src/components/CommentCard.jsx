import { changeCommentVote, convertTime } from "../api"

const CommentCard = ({comments, setComments, comment, index, voted, setVoted, setErr}) => {

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

    return (
        <>
            <div className='comment-author'>
                <p>{comment.author}</p>
                <p>{convertTime(comment.created_at)}</p>
            </div>
            <p>{comment.body}</p>
            <div className='votes'> 
                <button className={voted[index] === '-' ? 'active' : ''} onClick={(e) => handleClick(e, comment.comment_id)}>-</button>
                    <p>{comment.votes}</p>
                <button className={voted[index] === '+' ? 'active' : ''} onClick={(e) => handleClick(e, comment.comment_id)}>+</button>
            </div>
        </>
    )
}

export default CommentCard