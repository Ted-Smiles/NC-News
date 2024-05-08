import { useEffect, useState } from "react";
import { getAllUSers, postNewComment } from "../api";
import { useContext } from "react"
import { UserContext } from "../context/User"

const AddNewComment = ({article_id, setAddingComment, setErr}) => {
    const { user } = useContext(UserContext);
    const [commentToAdd, setCommentToAdd] = useState({author: user});
  
  
    const handleSubmit = (e) => {
      e.preventDefault();
      postNewComment(article_id, commentToAdd).catch((err) =>{
        setErr('Comment failed to post')
      })
      setAddingComment(false)
    };

    const handleClose = () => {
      setAddingComment(false);
    };
  
    return (
      <>
        <form
          className="comment-form"
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <button className="close-btn" type="button" onClick={handleClose}>
            X
          </button>
          <div>
            <label htmlFor="comment">Comment:</label>
            <input
              type="text"
              id="comment"
              value={commentToAdd.comment}
              onChange={(e) => {
                setCommentToAdd({ ...commentToAdd, body: e.target.value });
              }}
            />
          </div>
          <button>Submit</button>
        </form>
      </>
    );
};

export default AddNewComment


