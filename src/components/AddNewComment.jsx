import { useEffect, useState } from "react";
import { getAllUSers, postNewComment } from "../api";
import { useContext } from "react";
import { UserContext } from "../context/User";

const AddNewComment = ({
  article_id,
  setAddingComment,
  setErr,
  setComments,
}) => {
  const { user } = useContext(UserContext);
  const [commentToAdd, setCommentToAdd] = useState({ author: user });

  const [commentErr, setCommentErr] = useState('')
  const [fade, setFade] = useState(false)

  useEffect(() => {
      setFade(true)
      const fadeTimeOut = setTimeout(() => {
          setFade(false)
        }, 4000);
      if (commentErr && commentErr !== '') {
        const timeout = setTimeout(() => {
          commentErr('');
        }, 6000); 
        return () => clearTimeout(timeout);
      }
      return () => clearTimeout(fadeTimeOut);
  }, [commentErr]);



  const handleSubmit = (e) => {
    e.preventDefault();
    if(commentToAdd.body === undefined || commentToAdd.body.length === 0) {
      setCommentErr("Comment can't be empty")
    }
    else {
      postNewComment(article_id, commentToAdd).catch(() => {
        setErr("Comment failed to post");
      });
      setAddingComment(false);
    }
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
          <textarea
            type="text"
            id="comment"
            value={commentToAdd.comment}
            onChange={(e) => {
              setCommentToAdd({ ...commentToAdd, body: e.target.value });
            }}
          />
        <p><span className={!fade ? 'fade-out' : ''}>{commentErr}</span></p>
        </div>
        <button>Submit</button>
      </form>
    </>
  );
};

export default AddNewComment;
