import { convertTime } from "../api"

const ArticleCard = ({articles}) => {

    return (
        <>
            {articles
            .map((article, index) => (
                <div className="article" key={index}>
                    <img src={article.article_img_url}></img>
                    <h4>{article.title}</h4>
                    <p>Created by {article.author}</p>
                    <p>{article.comment_count} comments</p>
                    <p>{convertTime(article.created_at)}</p>
                </div>
            ))}
        </>
    )
}

export default ArticleCard