import { convertTime } from "../api"
import { Link } from "react-router-dom"

const ArticleCard = ({articles}) => {

    return (
        <>
            {articles
            .map((article) => (
                <Link to={`/articles/${article.article_id}`} key={article.article_id} article={article}>
                    <div className="article" >
                        <img src={article.article_img_url}></img>
                        <h4>{article.title}</h4>
                        <p>Created by {article.author}</p>
                        <p>{article.comment_count} comments</p>
                        <p>{convertTime(article.created_at)}</p>
                    </div>
                </Link>
            ))}
        </>
    )
}

export default ArticleCard