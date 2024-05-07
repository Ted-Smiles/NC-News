import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { convertTime, getArticleById } from '../api';

const SingleArticle = () => {
    
    const [isLoading, setIsLoading] = useState(true);
    const [singleArticle, setSingleArticle] = useState({})

    let { article_id } = useParams();

    useEffect(() => {
        setIsLoading(true);
        getArticleById(article_id).then(({article}) => {
            setSingleArticle(article)
            setIsLoading(false)
        });
    }, [])

    if (isLoading) {
        return <p>Loading</p>;
    }

    console.log(singleArticle)
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
            </div>
        </div>
    )
}

export default SingleArticle