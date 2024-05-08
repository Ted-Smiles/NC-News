import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { changeArticleVote, convertTime, getArticleById } from '../api';
import Comments from './Comments';

const SingleArticle = () => {
    
    const [articleIsLoading, setArticleIsLoading] = useState(true);
    const [singleArticle, setSingleArticle] = useState({})
    let [vote, setVote] = useState(0)
    const [voted, setVoted] = useState('')
    const [err, setErr] = useState('')


    let { article_id } = useParams();

    useEffect(() => {
        setArticleIsLoading(true);
        getArticleById(article_id).then(({article}) => {
            setSingleArticle(article)
            setArticleIsLoading(false)
            setVote(article.votes)
        });
    }, [])

    const handleClick = (e) => {
        if (voted === e.target.innerText) {
            changeArticleVote(article_id, e.target.innerText === '+' ? '-' : '+')
            setVote((currentVote) => e.target.innerText === '+' ? currentVote - 1 : currentVote + 1)
            setVoted('')
        } else if (voted === "") {
            changeArticleVote(article_id, e.target.innerText).catch(()=>{
                changeArticleVote(article_id, e.target.innerText === '+' ? '-' : '+')
                setVote((currentVote) => e.target.innerText === '+' ? currentVote - 1 : currentVote + 1)
                setVoted('')
                setErr('There was an error with your vote')
            })
            if (e.target.innerText === '+') {
                setVote((currentVote) => currentVote + 1)
            }
            if (e.target.innerText === '-') {
                setVote((currentVote) => currentVote - 1)
            }
            setVoted(e.target.innerText)
        } 
    }

    if (articleIsLoading) {
        return <p>Loading</p>;
    }

    return (
        <div className='single-article-container'>
            <p>{err}</p>
            <h2>{singleArticle.title}</h2>
            <img src={singleArticle.article_img_url}></img>
            <div className='info'>
                <div className='details'>
                    <p>Created by {singleArticle.author}</p>
                    <p>{convertTime(singleArticle.created_at)}</p>
                </div>
                <div className='votes'> 
                    <button className={voted === '-' ? 'active' : ''} onClick={handleClick}>-</button>
                        <p>{vote}</p>
                    <button className={voted === '+' ? 'active' : ''} onClick={handleClick}>+</button>
                </div>
                <p>{singleArticle.body}</p>

                <Comments singleArticle={singleArticle} article_id={article_id}/>

            </div>
        </div>
    )
}

export default SingleArticle