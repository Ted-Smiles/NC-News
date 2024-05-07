import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { convertTime, getAllCommentFromId, getArticleById } from '../api';

const SingleArticle = () => {
    
    const [articleIsLoading, setArticleIsLoading] = useState(true);
    const [commentsAreLoading, setCommentsAreLoading] = useState(true);
    const [singleArticle, setSingleArticle] = useState({})
    const [comments, setComments] = useState([])

    let { article_id } = useParams();

    useEffect(() => {
        setArticleIsLoading(true);
        setCommentsAreLoading(true)
        getAllCommentFromId(article_id).then(({comments}) => {
            setComments(comments)
            setCommentsAreLoading(false)
        })
        getArticleById(article_id).then(({article}) => {
            setSingleArticle(article)
            setArticleIsLoading(false)
        });
    }, [])


    if (articleIsLoading) {
        return <p>Loading</p>;
    }

    return (
        <div className='single-article-container'>
            <h2>{singleArticle.title}</h2>
            <img src={singleArticle.article_img_url}></img>
            <div className='info'>
                <div className='details'>
                    <p>Created by {singleArticle.author}</p>
                    <p>{convertTime(singleArticle.created_at)}</p>
                </div>
                <p>{singleArticle.body}</p>

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
                                    <button>+</button>
                                    <p>{comment.votes}</p>
                                    <button>-</button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default SingleArticle