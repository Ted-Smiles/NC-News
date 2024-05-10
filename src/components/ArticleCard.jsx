import { convertTime } from "../api";
import { Link } from "react-router-dom";

const ArticleCard = ({ article }) => {
  return (
    <Link
        to={`/article/${article.article_id}`}
        article={article}
    >
         <div className="article">
            <img src={article.article_img_url}></img>
            <h4>{article.title}</h4>
            <p>Created by {article.author}</p>
            <p>{article.comment_count} comments</p>
            <p>{article.votes} votes</p>
            <p>{convertTime(article.created_at)}</p>
        </div>
    </Link>
  );
};

export default ArticleCard;
